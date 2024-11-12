import { put } from "@vercel/blob";
import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Prevent Next.js / Vercel from caching responses
// See https://github.com/replicate/replicate-javascript/issues/136#issuecomment-1728053102
replicate.fetch = (url, options) => {
  return fetch(url, { cache: "no-store", ...options });
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
    // Loop through each output with async handling
    const uploadResponses = await Promise.all(
      prediction.output.map(async (imageUrl: string, index: number) => {
        try {
          // 1. Download the image as an array buffer
          const imageResponse = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

          // Convert the array buffer to a Buffer (Node.js environment)
          const fileBuffer = Buffer.from(imageResponse.data);
          const filename = `output_${index}.png`;

          // 2. Upload to Vercel Blob Storage using Buffer directly
          const uploadResponse = await put(`download/${filename}`, fileBuffer, {
            access: "public",
          });

          return uploadResponse.url; // Collect upload response data
        } catch (error) {
          console.error(`Error uploading image at index ${index}:`, error);
          return null; // Or handle error accordingly
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
