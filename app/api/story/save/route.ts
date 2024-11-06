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
    const { title, content, images } = body;

    console.log("Received body:", body);

    const story = await prisma.story.create({
      data: {
        userId: session.user.id,
        title,
        content,
        images,
      },
    });

    console.log("Story created:", story);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
