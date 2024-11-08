import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
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
      version:
        "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      input: input,
    };

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
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
