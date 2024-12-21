// app/stories/page.tsx
"use client";

import { BotIcon, BookOpenIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoryCard } from "@/components/story/StoryCard";
import { useEffect, useState } from "react";
import { Story } from "@prisma/client";

interface StoriesResponse {
  stories: Story[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const ITEMS_PER_PAGE = 9;

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchStories = async (pageNum: number) => {
    try {
      const response = await fetch(
        `/api/story/getList?page=${pageNum}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }
      const data: StoriesResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Initial load
  useEffect(() => {
    const loadInitialStories = async () => {
      try {
        const data = await fetchStories(1);
        setStories(data.stories);
        setHasMore(data.metadata.hasMore);
        setTotal(data.metadata.total);
      } catch (err) {
        setError("Failed to load stories");
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialStories();
  }, []);

  // Load more function
  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchStories(nextPage);

      setStories((prevStories) => [...prevStories, ...data.stories]);
      setHasMore(data.metadata.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more stories");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[400px]">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              My Stories
            </h1>
            <p className="text-muted-foreground">
              Create and manage your AI-generated stories with images
            </p>
          </div>
          <Link href="/generate-story">
            <Button className="hover:scale-105 transition-transform duration-200">
              <BotIcon className="mr-2 h-4 w-4" />
              Create Story
            </Button>
          </Link>
        </div>
        <div className="border-b border-border" />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {/* Stories Grid */}
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 p-6 bg-muted rounded-full">
            <BookOpenIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Start your creative journey by creating your first AI-generated
            story with custom images.
          </p>
          <Link href="/generate-story">
            <Button
              size="lg"
              className="hover:scale-105 transition-transform duration-200">
              <BotIcon className="mr-2 h-4 w-4" />
              Create Your First Story
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="flex">
                <StoryCard story={story} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={loading}
                className="min-w-[200px]">
                {loading ? (
                  <div className="flex items-center">
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}

          {/* Stories Count */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {stories.length} of {total} stories
          </div>
        </>
      )}
    </div>
  );
}
