import { getExampleStories } from "@/actions";
import { auth } from "@/auth";
import { testimonials } from "@/config/home";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const stories = await prisma.story.findMany({
      where: {
        storyId: {
          in: [
            "N4fIZnNHrc",
            "hcHptmVNpr",
            "wEoqZABQ32",
            "uXyfNIVTuc",
            "Q1f4DJI5G2",
            "EyY1m9J3hG",
          ],
        },
      },
    });

    const data = stories.map((story, ind) => {
      return {
        ...story,
        date: story.createdAt.toISOString(),
        authorName: testimonials[ind].author,
        authorAvatar: testimonials[ind].avatar,
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
