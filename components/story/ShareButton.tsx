"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, CopyIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

const ShareButton = ({
  story,
  size = "default",
}: {
  story: any;
  size: "sm" | "default";
}) => {
  const [isPublic, setIsPublic] = useState(story.isPublic);
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
      setIsPublic(true);
      copyUrl();
    } catch (e) {
      console.error("handleShare error", e);
    }
  };
  const copyUrl = async () => {
    const shareUrl = `${window.location.origin}/story/${story.storyId}`;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("✨ Copied!, Share it with your friends~");
  };

  return (
    <>
      {isPublic ? (
        <div>
          <Badge
            variant="default"
            className="bg-blue-500 text-white border-none font-medium shadow-sm shadow-blue-200">
            Public
          </Badge>
        </div>
      ) : (
        <Button
          size={size}
          onClick={handleShare}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90">
          <Share2Icon className="w-4 h-4 mr-2" />
          Share
        </Button>
      )}
    </>
  );
};

export default ShareButton;
