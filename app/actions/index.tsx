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
