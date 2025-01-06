import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { storyId, image } = body;

    const updatedStory = await prisma.story.update({
      where: { storyId },
      data: { image },
    });

    return NextResponse.json(
      { message: "OK", story: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
