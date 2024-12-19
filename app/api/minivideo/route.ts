import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { writeFile } from "node:fs/promises";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      {
        error:
          "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
      },
      { status: 500 }
    );
  }

  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prompt, image } = await request.json();

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Missing required 'prompt' or 'image' in request body." },
        { status: 400 }
      );
    }

    const input = {
      prompt: prompt,
      first_frame_image: image,
    };

    const options: any = {
      model: "minimax/video-01",
      input: input,
    };

    // Run the prediction
    // const prediction = await replicate.run("minimax/video-01", { input });
    const prediction = await replicate.predictions.create(options);
    console.log("--prediction", prediction);
    if (prediction.error) {
      return NextResponse.json({ detail: prediction?.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Error during prediction:", error);
    return NextResponse.json(
      { error: "Failed to process the prediction request." },
      { status: 500 }
    );
  }
}
