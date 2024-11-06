// app/dashboard/stories/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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

      <div className="space-y-6">
        {stories.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No stories created yet
          </div>
        ) : (
          stories.map((story: any) => (
            <Card key={story.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{story.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex gap-4">
                {/* Images Grid */}
                <div className="">
                  {story.images && JSON.parse(story.images).length > 0 && (
                    <div className="relative">
                      <div className="relative aspect-square rounded-lg overflow-hidden w-[150px]">
                        <Image
                          src={JSON.parse(story.images)[0]}
                          alt="Story image"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      {JSON.parse(story.images).length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                          +{JSON.parse(story.images).length - 1}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Story Content */}
                <ScrollArea className="h-[120px] w-full rounded-md border">
                  <p className="text-sm leading-relaxed">{story.content}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
