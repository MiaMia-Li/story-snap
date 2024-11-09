import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.APP_HOST
  ? `https://${process.env.APP_HOST}`
  : process.env.NGROK_HOST;

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
      width: 768,
      height: 768,
      prompt: prompt,
      refine: "expert_ensemble_refiner",
      apply_watermark: false,
      num_inference_steps: 25,
      image: image,
    };

    const options: any = {
      model: "stability-ai/stable-diffusion-3.5-large",
      // version:
      //   "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      input: input,
    };

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks/replicate`;
    }

    // Run the prediction
    const prediction = await replicate.predictions.create(options);

    if (prediction.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    // Save the output images if prediction succeeded
    // if (prediction.output) {
    //   for (const [index, item] of prediction.output.entries()) {
    //     await writeFile(`output_${index}.png`, item, { encoding: "base64" });
    //   }
    // }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Error during prediction:", error);
    return NextResponse.json(
      { error: "Failed to process the prediction request." },
      { status: 500 }
    );
  }
}
