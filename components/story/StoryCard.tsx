import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { CopyButton } from "./CopyButton";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import Image from "next/image";
import { parseMediaUrls } from "@/utils";
import { ImageComponent, VideoPlayer } from "../common/FileWrapper";

export function StoryCard({ story }: { story: any }) {
  const { videos, images } = parseMediaUrls(story.image);
  const hasMedia = videos.length > 0 || images.length > 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">{story.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={story.createdAt}>
              {new Date(story.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        {hasMedia && (
          <div className="space-y-4">
            {/* 视频展示区域 */}
            {videos.length > 0 && (
              <div className="space-y-2">
                {videos.map((video, index) => (
                  <VideoPlayer key={`video-${index}`} src={video} />
                ))}
              </div>
            )}

            {/* 图片展示区域 */}
            {images.length > 0 && (
              <div
                className={`grid gap-2 ${
                  images.length === 1
                    ? "grid-cols-1"
                    : images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                }`}>
                {images.slice(0, 6).map((image, index) => (
                  <ImageComponent
                    key={`image-${index}`}
                    src={image}
                    alt={story.title}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {story.content}
            <CopyButton content={story.content} />
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <ShareButton story={story} />
      </CardFooter>
    </Card>
  );
}
