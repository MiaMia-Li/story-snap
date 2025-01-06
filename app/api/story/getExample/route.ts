import { getExampleStories } from "@/actions";
import { auth } from "@/auth";
import { testimonials } from "@/config/home";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 从查询参数中获取 storyIds
    const { searchParams } = new URL(request.url);
    const storyIdsParam = searchParams.get("storyIds");

    // 如果没有传入 storyIds，返回错误
    if (!storyIdsParam) {
      return NextResponse.json(
        { error: "No story IDs provided" },
        { status: 400 }
      );
    }

    // 解析 storyIds
    const storyIds = storyIdsParam.split(",");

    const stories = await prisma.story.findMany({
      where: {
        storyId: {
          in: storyIds,
        },
      },
    });

    const data = stories.map((story, ind) => {
      return {
        ...story,
        date: story.createdAt.toISOString(),
        authorName: testimonials[ind]?.author || "",
        authorAvatar: testimonials[ind]?.avatar || "",
        likes: Math.floor(Math.random() * 8 + Math.random() * 10),
      };
    });

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
