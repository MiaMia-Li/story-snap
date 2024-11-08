import { generateText, streamText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generatePrompt } from "@/utils/promot";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { prompt, image, language } = await request.json();

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Missing required 'prompt' or 'image' in request body." },
        { status: 400 }
      );
    }

    // Generate text based on the provided prompt and image
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `prompt: ${prompt},you should generate the text in ${language}`,
            },
            { type: "image", image: image },
          ],
        },
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "An error occurred while generating text." },
      { status: 500 }
    );
  }
}
