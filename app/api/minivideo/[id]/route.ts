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

const uploadVideoFromUrl = async (videoUrl: string) => {
  try {
    // 1. 下载视频
    const videoResponse = await axios.get(videoUrl, {
      responseType: "arraybuffer",
      headers: {
        Accept: "video/mp4,video/*;q=0.8,*/*;q=0.5",
      },
    });

    const safeFileName = `${Date.now()}_output.mp4`;

    // 2. 分片处理下载的视频数据
    const videoBuffer = videoResponse.data;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil(videoBuffer.length / CHUNK_SIZE);

    // 3. 创建用于分片上传的函数
    const uploadChunk = async (
      chunk: ArrayBuffer,
      chunkIndex: number,
      totalChunks: number
    ) => {
      const headers = new Headers({
        "X-CF-Secret": AUTH_KEY_SECRET ?? "",
        "Content-Type": "video/mp4",
        "X-Chunk-Index": chunkIndex.toString(),
        "X-Total-Chunks": totalChunks.toString(),
        "X-File-Name": safeFileName,
      });

      const workerResponse = await fetch(
        `${WORKER_URL}/video/${safeFileName}`,
        {
          method: "PUT",
          headers: headers,
          body: chunk,
        }
      );

      if (!workerResponse.ok) {
        throw new Error(`Chunk upload failed: ${workerResponse.statusText}`);
      }

      return workerResponse;
    };

    // 4. 将视频数据分片并上传
    console.log(`Starting upload of ${totalChunks} chunks...`);

    const chunkPromises = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, videoBuffer.length);
      const chunk = videoBuffer.slice(start, end);

      chunkPromises.push(uploadChunk(chunk, i, totalChunks));
    }

    // 5. 等待所有分片上传完成
    const chunkResponses = await Promise.all(chunkPromises);

    // 6. 验证所有分片是否上传成功
    const allSuccessful = chunkResponses.every((response) => response.ok);

    if (!allSuccessful) {
      throw new Error("Some chunks failed to upload");
    }

    // 7. 返回最终的视频URL
    return `${WORKER_URL}/video/${safeFileName}`;
  } catch (error) {
    console.error("Error processing video:", error);
    throw error;
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const prediction = await replicate.predictions.get(id);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  if (prediction.output) {
    const uploadResponses = uploadVideoFromUrl(prediction.output);

    return NextResponse.json({
      ...prediction,
      video: uploadResponses,
    });
  }

  return NextResponse.json(prediction);
}
