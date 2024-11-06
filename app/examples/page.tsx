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
// 故事数据
const stories = [
  {
    id: 1,
    title: "A Moment of Peace",
    category: "Slice of Life",
    image: "/eg_1.jpg",
    content:
      "Amid a busy market, Hana wanders alone, feeling out of place in the crowd. As she walks, she lifts her eyes to the leaves above, finding a moment of quiet beauty. The simple sight eases her heart, reminding her that peace can be found even in the busiest places.",
  },
  {
    id: 2,
    title: "Our Playful Moments",
    category: "Romance",
    image: "/eg_2.jpg",
    content:
      "Today was filled with laughter and little games between us. I tried to challenge him to an arm-wrestling match, but of course, he won every time, laughing as I struggled. He’d reach out for a hug, only to playfully pull away at the last second, teasing me until I finally caught him. Every moment felt warm and lighthearted, reminding me how lucky I am to have someone who brings so much joy to my life. Even in the simplest gestures, we find happiness together.",
  },
  {
    id: 1,
    title: "A Day in My Wonderland",
    category: " Childhood Wonder",
    image: "/eg_3.jpg",
    content:
      "Today is my big adventure day! I ran through the fields, feeling the sun warm my face and the flowers dancing around me. I lay down in the grass, letting ants tickle my skin as they climbed over me—I think they're my tiny friends! Then I chased the chickens, laughing as they flapped and scattered. Every moment was filled with fun, and I felt like the queen of my own little world.",
  },
];

export default function ExamplePage() {
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
            <Card key={story.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{story.title}</span>
                  <Badge variant="secondary">{story.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 图片区域 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover rounded-lg transition-transform hover:scale-105"
                  />
                </div>
                {/* 文字区域 */}
                <p className="text-muted-foreground leading-relaxed">
                  {story.content}
                </p>
              </CardContent>
              {/* <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </CardFooter> */}
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
              <Button variant="outline" size="lg">
                Watch Tutorial
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
