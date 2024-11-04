import { streamObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Schema 定义
export const resumeAnalysisSchema = z.object({
  totalScore: z.number().min(0).max(100),
  scoreCategories: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
    })
  ),
  sections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      suggestions: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          priority: z.enum(["high", "medium", "low"]),
        })
      ),
    })
  ),
  basicInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    education: z.string(),
    summary: z.string().optional(),
  }),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.array(z.string()),
      achievements: z.array(z.string()).optional(),
    })
  ),
  skills: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const context = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const systemPrompt = `You are a professional resume analyst. Please analyze the resume content in detail and provide the following:
1. A total score between 0-100
2. Score categories for content quality, keyword optimization, and structure format
3. Detailed suggestions for each section
4. Extract and organize the basic information, work experience, and skills

The resume content is: ${JSON.stringify(context)}

Please ensure your response follows this exact structure:
- totalScore: number between 0-100
- scoreCategories: array of categories with scores
- sections: array of sections with suggestions
- basicInfo: structured basic information
- workExperience: array of work experiences
- skills: array of skills`;

    const result = await streamObject({
      model: openai("gpt-4o-mini"),
      schema: resumeAnalysisSchema,
      prompt: systemPrompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toTextStreamResponse();
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
