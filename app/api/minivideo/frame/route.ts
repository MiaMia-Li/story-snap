import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.credits || session.user.credits <= 0) {
    return NextResponse.json({ message: "No credits left" }, { status: 400 });
  }

  const context = await req.json();
  const { images, keyword } = context;
  const images_message = images.map((url: string) => {
    return {
      type: "image",
      image: url,
    };
  });

  const prompt = `You are an expert at analyzing and describing images for video generation. Please provide a detailed and vivid description of the uploaded image that will be used to generate a video.

Focus on the following aspects:
- Main subject and its key characteristics
- Actions, movements, or poses
- Important visual details and textures
- Lighting, colors, and atmosphere
- Spatial relationships and composition
- Any notable emotions or expressions
- Background elements and environment

Please include the keyword "${keyword}" naturally in your description if relevant.

Guidelines:
- Keep the description clear, specific and objective
- Use precise and descriptive language
- Focus on visual elements that would be important for video generation
- Maintain a professional and technical tone
- Keep the description between 100-200 words
- Write in complete sentences
- Use present tense
- Avoid subjective interpretations

Please provide the description in a single paragraph format in English.`;

  // Create a new StreamData object
  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    system: "You analyze and describe images for video generation.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          ...images_message,
        ],
      },
    ],
    schema: z.object({
      description: z
        .string()
        .describe("detailed image description for video generation"),
    }),
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
