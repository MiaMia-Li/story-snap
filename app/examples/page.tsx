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
    title: "Whiskers and Wonders",
    category: "Slice of Life",
    image:
      "https://story-snap.vercel.app/_next/image?url=https%3A%2F%2Freplicate.delivery%2Fxezq%2FE4O69spILUJRNNp9J7nkCv8WNXHxcQzRNeLwIfcUP9T4hOvTA%2Fout-0.webp&w=2048&q=75",
    content:
      "As I strolled through the sunlit park, the crisp autumn air filled my lungs with a refreshing chill. My fluffy cat nestled in my arms, its soft purrs harmonizing with the rustling leaves. I felt a wave of joy wash over me, the kind that only comes from moments like these. The world around us was alive with color, laughter echoing in the distance, but all I could focus on was the warmth of my furry companion. Each step we took felt like an adventure, a journey into a world where worries faded and happiness reigned supreme.",
  },
  {
    id: 2,
    title: "Whispers of the Path",
    category: "Romance",
    image:
      "https://story-snap.vercel.app/_next/image?url=https%3A%2F%2Freplicate.delivery%2Fxezq%2FFGQORHqLqfRAMaA8NRPmlOrw1rVgbw0DRopQSAnf4fpUJf8OB%2Fout-0.webp&w=3840&q=75",
    content:
      "As I walk along the winding path, the world around me transforms with each step. The towering trees, their leaves rustling softly, seem to whisper secrets of the forest. The sun hangs low in the sky, casting a warm golden glow that dances on the ground. I pause, glancing back, feeling a mix of nostalgia and curiosity. The air is rich with the scent of damp earth and blooming flowers, and I can hear the distant call of birds settling in for the night. This moment, suspended in time, fills me with a sense of adventure, urging me to delve deeper into the heart of nature.",
  },
  {
    id: 1,
    title: "The Journey Within",
    category: " Childhood Wonder",
    image:
      "https://story-snap.vercel.app/_next/image?url=https%3A%2F%2Freplicate.delivery%2Fxezq%2FKGj1Iep5HuxyPqQPrLXYKy4NyCLraWiCvnWYkPNUaGy4Uq3JA%2Fout-0.webp&w=3840&q=75",
    content:
      "I stood at the edge of the forest, where the tall trees whispered secrets of ancient times. The air was thick with the scent of pine and damp earth, a reminder of the rain that had just passed. With each step, I felt the ground soft beneath my feet, as if the forest was welcoming me into its embrace. I sought something deeper, a truth hidden among the shadows. As I ventured further, the sunlight flickered through the leaves, casting playful patterns on the ground, almost urging me to keep going. My heart raced with anticipation; I knew this journey would reveal more than just the beauty of nature—it would unveil parts of myself I had long forgotten.",
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
            <Card key={story.id} className="overflow-hidden group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{story.title}</span>
                  <Badge variant="secondary">{story.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 图片和内容的容器 */}
                <div className="relative aspect-[4/3]">
                  {/* 图片 */}
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {/* 悬浮时显示的内容 */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 overflow-y-auto">
                    <p className="text-white leading-relaxed">
                      {story.content}
                    </p>
                  </div>
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
