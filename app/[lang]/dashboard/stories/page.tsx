// pages/stories.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BotIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/story/ShareButton";
import { CopyButton } from "@/components/story/CopyButton";
import DownloadButton from "@/components/story/DownloadButton";
import { getStories } from "@/actions";
export const revalidate = false;

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Stories</h1>
        <Link href="/generate-story">
          <Button className="hover:scale-105 transition-transform">
            <BotIcon className="mr-2 h-4 w-4" />
            Create Story
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground mb-4">
              No stories created yet
            </div>
            <Link href="/generate-story">
              <Button variant="outline">
                <BotIcon className="mr-2 h-4 w-4" />
                Create Your First Story
              </Button>
            </Link>
          </div>
        ) : (
          stories.map((story) => <StoryCard key={story.id} story={story} />)
        )}
      </div>
    </div>
  );
}

// components/StoryCard.tsx
function StoryCard({ story }: { story: any }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            {/* <Link
              href={`/story/${story.storyId}`}
              className="text-primary hover:underline decoration-2 underline-offset-2 transition-colors">
              {story.title}
            </Link> */}
            {story.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={story.createdAt}>
              {new Date(story.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        {story.image && (
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src={story.image}
              alt={`Image for ${story.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {story.content}
            <CopyButton content={story.content} />
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <ShareButton story={story} />
        <DownloadButton imageUrl={story.image} />
      </CardFooter>
    </Card>
  );
}
