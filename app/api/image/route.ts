import { streamText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generatePrompt } from "@/utils/promot";

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
      image: z.string(),
      storyType: z.string(),
      storyLength: z.string(),
      storyStyle: z.string(),
      language: z.string(),
    }),
  ]),
});

export async function POST(request: Request) {
  try {
    // 解析并验证请求数据
    const rawBody = await request.json();
    console.log("Raw body received:", JSON.stringify(rawBody, null, 2));

    // 验证和解析数据
    const validatedData = requestSchema.parse(rawBody);
    const promptData =
      typeof validatedData.prompt === "string"
        ? JSON.parse(validatedData.prompt)
        : validatedData.prompt;

    const { image, storyType, storyLength, storyStyle, storyTone, language } =
      promptData;

    // 获取base64图片数据
    const base64Image = image.split(",")[1];

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
              text: promptText,
            },
            {
              type: "image",
              image: base64Image,
            },
          ],
        },
      ],
      temperature: 0.7,
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
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
