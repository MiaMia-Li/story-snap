import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { testimonials } from "@/config/home";

export async function getStories() {
  const session = await auth();
  const stories = await prisma.story.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return stories;
}

export async function getExampleStories() {
  const stories = await prisma.story.findMany({
    where: {
      storyId: {
        in: [
          "N4fIZnNHrc",
          "hcHptmVNpr",
          "wEoqZABQ32",
          // "uXyfNIVTuc",
          // "Q1f4DJI5G2",
        ],
      },
    },
  });

  const data = stories.map((story, ind) => {
    return {
      ...story,
      date: story.createdAt.toISOString(),
      authorName: testimonials[ind].author,
      authorAvatar: testimonials[ind].avatar,
      likes: Math.floor(Math.random() * 8 + Math.random() * 10),
    };
  });
  return data;
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
    if (!story || !author) {
      throw new Error("Story not found");
    }
    return {
      id: story.id,
      storyId: story.storyId,
      title: story.title,
      content: story.content || "",
      image: story.image,
      isPublic: story.isPublic,
      createdAt: story.createdAt.toISOString(),
      author: {
        name: author?.name || "Anonymous",
        avatar: author?.image || "",
      },
    };
  } catch (error) {
    console.error("Error getting story:", error);
    return {
      id: "",
      storyId: "",
      title: "",
      content: "",
      image: "",
      isPublic: false,
      createdAt: "",
      author: {
        name: "",
        avatar: "",
      },
    };
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

export async function shareStory(storyId: string) {
  await prisma.story.update({
    where: { storyId },
    data: { isPublic: true },
  });
}
