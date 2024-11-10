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

export async function getStory(slug: string) {
  try {
    const story = await prisma.story.findUnique({
      where: {
        storyId: slug,
      },
    });
    const author = await prisma.user.findUnique({
      where: {
        id: story?.userId,
      },
    });
    return { ...story, author: { name: author?.name, avatar: author?.image } };
  } catch (error) {
    console.error("Error getting story:", error);
    return null;
  }
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
