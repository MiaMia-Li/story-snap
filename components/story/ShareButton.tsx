"use client";

import { Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ShareButton = ({
  story,
  size = "default",
}: {
  story: any;
  size: "sm" | "default";
}) => {
  const handleShare = async () => {
    console.log("handleShare", story);
    if (!story.storyId) {
      return;
    }
    try {
      await fetch(`/api/story/share`, {
        method: "POST",
        body: JSON.stringify({
          storyId: story.storyId,
        }),
      });
      const shareUrl = `${window.location.origin}/story/${story.storyId}`;
      await navigator.clipboard.writeText(shareUrl);

      toast.success("✨ Copied!, Share it with your friends~");
    } catch (e) {
      console.error("handleShare error", e);
    }
  };

  return (
    <Button
      size={size}
      onClick={handleShare}
      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90">
      <Share2Icon className="w-4 h-4 mr-2" />
      Share
    </Button>
  );
};

export default ShareButton;
