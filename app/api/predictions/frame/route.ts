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
  console.log("--context", context);
  const { stype, images, language } = context;
  const images_message = images.map((url: string) => {
    return {
      type: "image",
      image: url,
    };
  });
  const prompt = `You are a creator who generates vivid, detailed stories based on images, following the unique story style of ${stype}. Using the specified story style and provided images, create a captivating, well-developed story with an engaging title and comprehensive descriptions of four storyboard frames for stable-diffusion-3.5-large to render as a storyboard sequence.
  Tell a story that feels deeply personal and genuine, as if someone is sharing their experience directly with the listener. The tone should feel human and spontaneous, capturing emotions, thoughts, and small details that bring the story to life. Avoid a robotic, formulaic approach; instead, let the story unfold naturally, with a conversational flow and realistic pauses or reflections. This is about creating a vivid, relatable experience, not just recounting events—focus on immersing the listener in the storyteller's world

Please return the output in the following format:

Story Title: [Generated story title]
Story Content: [Detailed, engaging story description with rich narrative depth]
Storyboard Frame Descriptions:
Frame 1: [Detailed and imaginative description of the first storyboard frame]
Frame 2: [Detailed and imaginative description of the second storyboard frame]
Frame 3: [Detailed and imaginative description of the third storyboard frame]
Frame 4: [Detailed and imaginative description of the fourth storyboard frame]

- The title and content should be in ${language}, with frames described in English. Ensure the title is short yet captivating. The story content should be highly descriptive, setting a strong tone, and ranging between 300-700 characters to provide more narrative richness and context.
- You need to return the json format in the following format,the frames should be string and no space between them:
{
  "title": "Generated story title",
  "content": "Detailed, engaging story description with rich narrative depth",
  "frames": "Detailed and imaginative description of the first storyboard frame", "Detailed and imaginative description of the second storyboard frame", "Detailed and imaginative description of the third storyboard frame", "Detailed and imaginative description of the fourth storyboard frame"
}
`;

  // Create a new StreamData object
  const result = await streamObject({
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
          ...images_message,
        ],
      },
    ],
    schema: z.object({
      frames: z.string().describe("story board frame description in json"),
      title: z.string().describe("story title"),
      content: z.string().describe("story content"),
    }),
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
