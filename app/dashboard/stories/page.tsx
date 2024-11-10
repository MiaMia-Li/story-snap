import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BotIcon, CalendarIcon, LinkIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getStories, shareStory } from "@/app/actions";
import ShareButton from "@/components/story/ShareButton";

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
            <Card className="break-inside-avoid mb-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {story.isPublic ? (
                        <Link
                          href={`/story/${story.storyId}`}
                          className="text-primary hover:underline">
                          {story.title}
                        </Link>
                      ) : (
                        story.title
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Link Button */}

                  {/* Share/Public Badge */}
                  {story.isPublic ? (
                    <>
                      <Badge
                        variant="default"
                        className="bg-blue-500 text-white border-none font-medium shadow-sm shadow-blue-200">
                        Public
                      </Badge>
                    </>
                  ) : (
                    <ShareButton story={story} size="sm" />
                  )}
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
                      className="object-cover"
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
