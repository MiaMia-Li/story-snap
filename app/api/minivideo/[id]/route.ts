import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Worker 配置
const WORKER_URL = "https://storysnap.support-0bf.workers.dev";
const AUTH_KEY_SECRET = process.env.AUTH_KEY_SECRET;

export const runtime = "edge";

// 防止 Next.js / Vercel 缓存响应
replicate.fetch = (url, options) => {
  return fetch(url, { cache: "no-store", ...options });
};

/**
 * 从URL下载并上传视频到Worker
 */
const uploadVideoFromUrl = async (videoUrl: string) => {
  try {
    console.log("Starting video download from:", videoUrl);

    // 1. 下载视频
    const videoResponse = await axios.get(videoUrl, {
      responseType: "arraybuffer",
      headers: {
        Accept: "video/mp4,video/*;q=0.8,*/*;q=0.5",
      },
    });

    const safeFileName = `${Date.now()}_output.mp4`;
    const videoBuffer = videoResponse.data;

    // 2. 直接上传完整视频，不进行分片
    const headers = new Headers({
      "X-CF-Secret": AUTH_KEY_SECRET ?? "",
      "Content-Type": "video/mp4",
    });

    // 3. 执行上传
    const uploadResponse = await fetch(`${WORKER_URL}/upload/${safeFileName}`, {
      method: "PUT",
      headers: headers,
      body: videoBuffer,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    // 4. 返回视频URL
    console.log("Video upload completed successfully");
    return `${WORKER_URL}/upload/${safeFileName}`;
  } catch (error) {
    console.error("Error in uploadVideoFromUrl:", error);
    // throw new Error(`Video upload failed: ${error.message}`);
  }
};

/**
 * 处理GET请求
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("Processing prediction:", id);

    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      console.error("Prediction error:", prediction.error);
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    if (prediction.output) {
      console.log("Starting video processing");

      // 处理视频上传
      const videoUrl = await uploadVideoFromUrl(prediction.output);

      return NextResponse.json({
        ...prediction,
        video: videoUrl,
        status: "success",
      });
    }

    // 如果还没有输出，返回当前状态
    return NextResponse.json({
      ...prediction,
      status: "processing",
    });
  } catch (error) {
    console.error("Request handling error:", error);
    return NextResponse.json({ status: 500 });
  }
}
