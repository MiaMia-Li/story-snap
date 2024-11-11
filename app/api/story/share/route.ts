import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { sleep } from "openai/core.mjs";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { storyId } = await request.json();
    await prisma.story.update({
      where: { storyId },
      data: { isPublic: true },
    });
    await sleep(100);
    await revalidatePath("/dashboard/stories", "page");

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
