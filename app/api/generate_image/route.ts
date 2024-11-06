import { Attachment, streamText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generatePrompt } from "@/utils/promot";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const requestSchema = z.object({
  prompt: z.union([
    z.string().transform((str) => {
      try {
        return JSON.parse(str);
      } catch {
        throw new Error("Invalid JSON string in prompt");
      }
    }),
    z.object({
      image: z.array(z.string()), // Ensure image is always an array
      storyType: z.string(),
      storyLength: z.string(),
      storyStyle: z.string(),
      storyTone: z.string().optional(), // Make storyTone optional
      language: z.string(),
    }),
  ]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log("--session", session);

  try {
    // 解析并验证请求数据
    const rawBody = await request.json();

    // 验证和解析数据
    const validatedData = requestSchema.parse(rawBody);
    const promptData =
      typeof validatedData.prompt === "string"
        ? JSON.parse(validatedData.prompt)
        : validatedData.prompt;

    const { image, storyType, storyLength, storyStyle, storyTone, language } =
      promptData;

    const image_content = image.map((img: string, index: number) => {
      return {
        type: "image",
        image: img,
      };
    });
    console.log("--image_content", image_content);
    // 构建提示文本
    const promptText = generatePrompt({
      type: storyType,
      length: storyLength,
      style: storyStyle,
      tone: storyTone,
      language: language,
    });

    // 生成文本
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an imaginative storyteller with a focus on creating engaging and vivid narratives. Given a series of images and a descriptive prompt, your task is to generate a coherent story and a captivating title based on the provided content.

Prompt: ${promptText} Your return language is ${language}`,
            },
            ...image_content,
          ],
        },
      ],
      temperature: 0.7,
    });
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { credits: { decrement: 1 } },
    });

    // 返回生成的文本
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Validation Error",
          details: error.errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        // message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
