import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "@/utils/uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, image = "", count } = body;

    const story = await prisma.story.create({
      data: {
        userId: session.user.id,
        title,
        content,
        image,
        storyId: randomUUID(),
      },
    });

    // 扣除积分
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: count } },
    });

    console.log("Story created:", story);

    return NextResponse.json({ message: "OK", story: story }, { status: 200 });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
