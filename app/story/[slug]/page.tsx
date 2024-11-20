// app/stories/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import TwitterShareButton from "@/components/story/TwitterShareButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStory } from "@/actions";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const story = await getStory(params.slug);
  const session = await auth();
  if (!story || session?.user?.id !== story.userId) {
    redirect("/");
  }

  const images = story.image.split(",").filter(Boolean);
  const firstImage = images[0];
  console.log("firstImage", firstImage); // 获取第一张图片

  return {
    title: `${story.title} | SnapyStory`,
    description: story.content.substring(0, 155),
    openGraph: {
      title: story.title,
      description: story.content.substring(0, 155),
      images: [firstImage],
      type: "article",
      publishedTime: story.createdAt,
      authors: [story.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.content.substring(0, 155),
      images: [firstImage], // 只使用第一张图片作为 Twitter 预览
      creator: story.author.name,
    },
  };
}

const ImageGallery = ({ imageString }: { imageString: string }) => {
  const images = imageString.split(",").filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={cn(
            "relative w-full aspect-[4/3] overflow-hidden rounded-lg",
            images.length === 1 && "md:col-span-2"
          )}>
          <Image
            src={imageUrl}
            alt={`Story image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

const AuthorInfo = ({ author, date }: { author: any; date: string }) => (
  <div className="flex items-center space-x-4">
    <Avatar className="h-10 w-10 transition-all">
      <AvatarImage
        src={author?.avatar}
        alt={author?.name || "User avatar"}
        className="object-cover"
      />
      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-500 dark:to-indigo-500">
        {author?.name.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">{author.name}</p>
      <p className="text-sm text-muted-foreground">
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  </div>
);

const CallToAction = () => (
  <section className="bg-secondary/20 rounded-lg p-8 mt-8">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">Start Creating Your Story</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Choose from multiple styles and formats to bring your imagination to
        life. Our AI-powered tools make it easy to create stunning visual
        stories.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/generate-story">
          <Button size="lg" variant="outline">
            Create New Story
          </Button>
        </Link>
        <Link href="/examples">
          <Button variant="outline" size="lg">
            Explore Examples
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);
  const session = await auth();
  const images = story.image.split(",").filter(Boolean);
  const firstImage = images[0];
  if (!story || session?.user?.id !== story.userId) {
    redirect("/");
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.title,
            image: firstImage,
            datePublished: story.createdAt,
            author: {
              "@type": "Person",
              name: story.author.name,
            },
          }),
        }}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="space-y-12">
          <ImageGallery imageString={story.image} />

          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {story.title}
            </h1>
            <AuthorInfo author={story.author} date={story.createdAt} />
          </div>
        </div>

        {/* Story Content */}
        <Card className="mt-8">
          <CardContent className="prose prose-lg max-w-none p-6">
            <p className="leading-relaxed whitespace-pre-wrap">
              {story.content}
            </p>
          </CardContent>
        </Card>

        {/* Share Button */}
        <div className="mt-8 flex justify-center">
          <TwitterShareButton
            storyId={story?.storyId || ""}
            text={`I just created a story on SnapyStory, so amazing✨! Check it out: ${story.title}`}
            hashtags="SnapyStory,AIStory,AIArt"
            image={`https://www.snapstoryai.com/story/${story.storyId}`}
          />
        </div>

        {/* Call to Action */}
        <CallToAction />
      </main>
    </>
  );
}
