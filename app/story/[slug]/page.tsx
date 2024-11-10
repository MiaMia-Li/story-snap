// app/stories/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { getStory } from "@/app/actions";
import { redirect } from "next/navigation";
import TwitterShareButton from "@/components/story/TwitterShareButton";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const story = await getStory(params.slug);
  if (!story) {
    return {
      title: "Story not found",
    };
  }

  return {
    title: `${story.title} | YourSite Stories`,
    description: story.content.substring(0, 155),
    openGraph: {
      title: story.title,
      description: story.content.substring(0, 155),
      images: [story.image],
      type: "article",
      publishedTime: story.createdAt,
      authors: [story.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.content.substring(0, 155),
      images: [story.image],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);
  if (!story || !story.isPublic) {
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
            image: story.image,
            datePublished: story.publishedAt,
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
          <div className="relative w-full">
            <Image
              src={story.image}
              alt={story.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {story.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center space-x-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={story.author.avatar}
                  alt={story.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{story.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(story.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <Card className="mt-8">
          <CardContent className="prose prose-lg max-w-none p-6">
            <p className="leading-relaxed">{story.content}</p>
          </CardContent>
        </Card>

        {/* Engagement Buttons */}
        <div className="mt-8 flex space-x-4 justify-center">
          {/* <Button variant="outline" className="flex-1">
            <HeartIcon className="w-4 h-4 mr-2" />
            Like
          </Button>
          <Button variant="outline" className="flex-1">
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </Button> */}
          <TwitterShareButton
            text={story.title}
            hashtags={"SnappyStory"}
            image={story.image}
          />
        </div>

        {/* Related Stories */}
        {/* <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          </div>
        </section> */}
        {/* Try Our Platform Section */}

        <section className="bg-secondary/20 rounded-lg p-8 mt-8">
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
      </main>
    </>
  );
}
