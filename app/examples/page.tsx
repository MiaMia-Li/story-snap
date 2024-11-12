// app/example/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getExampleStories } from "../actions";
import {
  ArrowRight,
  ArrowRightIcon,
  Heart,
  HeartIcon,
  MessageCircle,
  MessageCircleIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ExamplePage() {
  const stories = await getExampleStories();
  console.log("--stories", stories);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-12">
        {/* 头部标题区 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">AI Story Gallery</h1>
          <p className="text-muted-foreground">
            Where images and words come together to create magical stories
          </p>
        </div>
        {/* 特色故事区域 */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* 图片区域 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {/* <Badge
                  variant="secondary"
                  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                  {story.category}
                </Badge> */}
              </div>

              <CardContent className="p-6 space-y-4">
                {/* 标题和作者信息 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg leading-tight tracking-tight line-clamp-2">
                    {story.title}
                  </h4>
                  <div className="flex items-center gap-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={story.authorAvatar}
                        alt={story.authorName}
                      />
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

                {/* 故事预览 */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {story.content}
                </p>

                {/* 互动数据和按钮 */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes}</span>
                    </button>
                    {/* <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{story.comments}</span>
                    </button> */}
                  </div>
                  {/* <Link href={`/story/${story.storyId}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 hover:bg-primary hover:text-primary-foreground">
                      Read more
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 创作工具区 */}
        {/* <section className="bg-secondary/20 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Create Your Own Story</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="p-4 text-center">
                <h3 className="font-semibold mb-2">Choose Style</h3>
                <p className="text-sm text-muted-foreground">
                  Select from comic, realistic, or artistic styles
                </p>
              </Card>
              <Card className="p-4 text-center">
                <h3 className="font-semibold mb-2">Write Story</h3>
                <p className="text-sm text-muted-foreground">
                  Craft your narrative with our AI assistance
                </p>
              </Card>
              <Card className="p-4 text-center">
                <h3 className="font-semibold mb-2">Generate Art</h3>
                <p className="text-sm text-muted-foreground">
                  Bring your story to life with AI-generated images
                </p>
              </Card>
            </div>
            <Button size="lg" className="mt-6">
              Start Creating
            </Button>
          </div>
        </section> */}
        <section className="bg-secondary/20 rounded-lg p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">
              Start Creating Your Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple styles and formats to bring your imagination
              to life. Our AI-powered tools make it easy to create stunning
              visual stories.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/generate-story">
                <Button size="lg">Create New Story</Button>
              </Link>
              {/* <Button variant="outline" size="lg">
                Watch Tutorial
              </Button> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
