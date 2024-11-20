import { BotIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStories } from "@/actions";
import { StoryCard } from "@/components/story/StoryCard";
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
