import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollingId, status } = body;

    if (!pollingId || !status) {
      return Response.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const updatedQueue = await prisma.generationQueue.update({
      where: { pollingId },
      data: {
        status,
        ...(status === "completed" && { updatedAt: new Date() }),
      },
    });
    console.log("-updatedQueue", updatedQueue);

    return Response.json({ updatedQueue });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
