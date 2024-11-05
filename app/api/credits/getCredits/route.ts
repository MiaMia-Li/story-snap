import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  // 检查用户会话是否存在
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 从数据库中查找用户
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true },
  });

  // 检查用户是否存在
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 返回用户的积分
  return NextResponse.json({ credits: user.credits });
}
