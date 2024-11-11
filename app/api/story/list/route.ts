import { getStories } from "@/app/actions";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const stories = await prisma.story.findMany(
      {
        where: {
          userId: session?.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      {
        cache: "no-store",
      }
    );
    return NextResponse.json({ data: stories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
