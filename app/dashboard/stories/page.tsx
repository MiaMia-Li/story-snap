import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BotIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStories } from "@/app/actions";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Stories</h1>
        <Link href="/generate-story">
          <Button>
            <BotIcon className="mr-2 h-4 w-4" />
            Create Story
          </Button>
        </Link>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-2 gap-6">
        {stories.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No stories created yet
          </div>
        ) : (
          stories.map((story: any) => (
            <Card
              key={story.id}
              className="break-inside-avoid mb-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Image Section */}
                {story.image && (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
                    <Image
                      src={story.image}
                      alt="Story image"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}

                {/* Story Content */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {story.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
