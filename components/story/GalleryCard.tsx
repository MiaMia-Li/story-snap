import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function GalleryCard({ story }: { story: any }) {
  return (
    <Card
      key={story.id}
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* 图片区域和浮层 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* 滚动浮层 */}
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 p-6">
            {/* 渐变遮罩 - 顶部 */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/50 to-transparent z-10" />

            {/* 可滚动内容 */}
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="text-white space-y-4">
                <h3 className="font-semibold text-lg">{story.title}</h3>
                <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">
                  {story.content}
                </p>
              </div>
            </div>

            {/* 渐变遮罩 - 底部 */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent z-10" />
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* 标题和作者信息 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg leading-tight tracking-tight line-clamp-2">
            {story.title}
          </h4>
          <div className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={story.authorAvatar} alt={story.authorName} />
              <AvatarFallback>
                {story.authorName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
              <span className="font-medium">{story.authorName}</span>
              <time
                dateTime={story.date}
                className="text-muted-foreground text-xs">
                {new Date(story.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
