import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getStories() {
  const session = await auth();
  const stories = await prisma.story.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return stories;
}

export async function getCredits() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return user?.credits;
}
