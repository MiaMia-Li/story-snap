import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, pollingId, id } = body;

    const queue = await prisma.generationQueue.create({
      data: {
        id,
        userId,
        type,
        pollingId,
        status: "pending",
      },
    });

    return Response.json({ queue }, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
