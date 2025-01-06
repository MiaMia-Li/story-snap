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
  const { images, language, keyword, tone } = context;

  let prompt = "";
  let images_message: any[] = [];

  if (images && images.length > 0) {
    images_message = images.map((url: string) => ({
      type: "image",
      image: url,
    }));

    prompt = `You are an expert at analyzing and describing images for video generation.
${tone}
Using the provided images, create:
1. A captivating story title
2. An engaging story description
3. Four detailed frame descriptions optimized for video generation`;
  } else {
    prompt = `You are an expert storyteller and video scene designer.
${tone}
Using the keyword '${keyword}', create:
1. A captivating story title
2. An engaging story description
3. Four detailed frame descriptions optimized for video generation`;
  }

  prompt += `
Focus on these aspects for frame descriptions:
- Main subject and key characteristics
- Actions, movements, and poses
- Visual details and textures
- Lighting, colors, and atmosphere
- Spatial relationships and composition
- Emotions and expressions
- Background elements and environment

Guidelines:
- Keep descriptions clear, specific and objective
- Use precise and descriptive language
- Focus on visual elements suitable for video generation
- Each frame description should be 50-100 words
- Use present tense
- Avoid subjective interpretations

The title and content should be in ${language}, with frames described in English.
The story content should be 300-700 characters long.

Important: Return the frames as a single string with frame descriptions separated by quotes and commas.

Please return the output in this exact JSON format:
{
  "title": "Generated story title",
  "content": "Detailed story description",
  "frames": "Detailed description of frame 1", "Detailed description of frame 2", "Detailed description of frame 3", "Detailed description of frame 4"
}`;

  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    system:
      "You are an expert at creating engaging stories and detailed video scene descriptions.",
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
      title: z.string().describe("Story title in specified language"),
      content: z
        .string()
        .describe(
          "Story description in specified language (300-700 characters)"
        ),
      frames: z
        .string()
        .describe(
          "Four frame descriptions as a single string, separated by quotes and commas"
        ),
    }),
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
