// app/feedback/page.tsx
"use client";

import Giscus from "@giscus/react";
import { Card } from "@/components/ui/card";

export default function FeedbackPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Feedback & Discussions</h1>

        <Card className="p-6">
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-muted-foreground">
              Welcome to the feedback section! Feel free to share your thoughts,
              suggestions, or report issues. You can sign in with your GitHub
              account to participate in the discussion.
            </p>
          </div>

          <Giscus
            repo="MiaMia-Li/story-snap"
            repoId="R_kgDONKTB1g"
            category="Announcements"
            categoryId="DIC_kwDONKTB1s4CkBcf"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="preferred_color_scheme"
            lang="en"
            loading="lazy"
          />
        </Card>
      </div>
    </div>
  );
}
