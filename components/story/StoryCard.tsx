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

export function StoryCard({ story }: { story: any }) {
  // 将图片字符串分割成数组，最多取4张图片
  const images = story.image
    ? story.image.split(",").filter(Boolean).slice(0, 4)
    : [];

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
        {images.length > 0 && (
          <div className="relative">
            {images.length === 1 ? (
              // 单张图片展示
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={images[0]}
                  alt={`Image for ${story.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute bottom-0 right-0 z-10">
                  <DownloadButton imageUrl={images[0]} />
                </div>
              </div>
            ) : (
              // 多张图片网格展示
              <div
                className={`grid gap-2 ${
                  images.length === 2 ? "grid-cols-2" : "grid-cols-2"
                }`}>
                {images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Image ${index + 1} for ${story.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                    <div className="absolute bottom-0 right-0 z-10">
                      <DownloadButton imageUrl={image} />
                    </div>
                  </div>
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
