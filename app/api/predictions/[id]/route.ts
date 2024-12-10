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

function generateSafeFileName(index: number): string {
  const timestamp = Date.now();
  return `${timestamp}_output_${index}.png`;
}

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
    // 处理每个输出图片
    const uploadResponses = await Promise.all(
      prediction.output.map(async (imageUrl: string, index: number) => {
        try {
          const imageResponse = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

          const safeFileName = generateSafeFileName(index);

          const headers = new Headers({
            "X-CF-Secret": AUTH_KEY_SECRET ?? "",
            "Content-Type": "image/png",
          });

          // 4. 上传到 Cloudflare Worker
          const workerResponse = await fetch(
            `${WORKER_URL}/download/${safeFileName}`,
            {
              method: "PUT",
              headers: headers,
              body: imageResponse.data,
            }
          );

          if (!workerResponse.ok) {
            throw new Error(`Upload failed: ${workerResponse.statusText}`);
          }

          return `${WORKER_URL}/download/${safeFileName}`;
        } catch (error) {
          console.error(`Error uploading image at index ${index}:`, error);
          return null;
        }
      })
    );

    return NextResponse.json({
      ...prediction,
      output: uploadResponses,
    });
  }

  return NextResponse.json(prediction);
}
