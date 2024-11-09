import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const context = await req.json();
  console.log(context, "context");
  const { stype, image, language } = context;
  const prompt = `You are a creator who generates vivid, detailed stories based on images, following the unique story style of ${stype}. Using the specified story style and provided images, create a captivating, well-developed story with an engaging title and comprehensive descriptions of four storyboard frames for stable-diffusion-3.5-large to render as a storyboard sequence.
  You need to tell the story in the first person, not describe it, to have the feeling of a real person telling the story, to have an immersive feeling.

Please return the output in the following format:

Story Title: [Generated story title]
Story Content: [Detailed, engaging story description with rich narrative depth]
Storyboard Frame Descriptions:
Frame 1: [Detailed and imaginative description of the first storyboard frame]
Frame 2: [Detailed and imaginative description of the second storyboard frame]
Frame 3: [Detailed and imaginative description of the third storyboard frame]
Frame 4: [Detailed and imaginative description of the fourth storyboard frame]

- The title and content should be in ${language}, with frames described in English. Ensure the title is short yet captivating. The story content should be highly descriptive, setting a strong tone, and ranging between 300-700 characters to provide more narrative richness and context.`;

  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    system: "You generate the story frame for a image.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          { type: "image", image: image },
        ],
      },
    ],
    schema: z.object({
      frames: z.string().describe("story board frame description in json"),
      title: z.string().describe("story title"),
      content: z.string().describe("story content"),
    }),
  });

  return result.toJsonResponse();
}
