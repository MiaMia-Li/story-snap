"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Copy,
  CopyIcon,
  ExternalLinkIcon,
  Globe2Icon,
  LinkIcon,
  LockIcon,
  Share2Icon,
  TwitterIcon,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

const ShareButton = ({
  story,
  size = "default",
}: // onUpdatePublicStatus,
{
  story: any;
  size?: "sm" | "default";
  // onUpdatePublicStatus: () => void;
}) => {
  const [isPublic, setIsPublic] = useState(story.isPublic);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePublic = async () => {
    setIsLoading(true);
    console.log("handleShare", story);
    if (!story.storyId) {
      return;
    }
    try {
      await fetch(`/api/story/share`, {
        method: "POST",
        body: JSON.stringify({
          storyId: story.storyId,
          isPublic: !isPublic,
        }),
      });
      setIsPublic(!isPublic);
      toast(isPublic ? "Story is now private" : "Story is now public", {
        description: isPublic
          ? "Only you can view this story now"
          : "Anyone with the link can view this story",
      });
      setIsLoading(false);
      // onUpdatePublicStatus();
    } catch (e) {
      setIsLoading(false);
      console.error("handleShare error", e);
    }
  };
  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/story/${story.storyId}`;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("✨ Copied!, Share it with your friends~");
  };

  const handleTwitterShare = () => {
    const text = `Check out my story "${story.title}" on SnapyStory ✨`;
    const url = `${window.location.origin}/story/${story.storyId}`;
    const hashtags = "SnapyStory,AIStory,AIArt";

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isPublic ? "default" : "outline"}
        size="sm"
        className={`gap-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleTogglePublic}
        disabled={isLoading}>
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : isPublic ? (
          <Globe2Icon className="h-4 w-4" />
        ) : (
          <LockIcon className="h-4 w-4" />
        )}
        {isPublic ? "Public" : "Make Public"}
      </Button>

      {isPublic && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCopyLink}>
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleTwitterShare}>
              <TwitterLogoIcon className="h-4 w-4" />
              Share on Twitter
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <Link href={`/story/${story.storyId}`} passHref>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ExternalLinkIcon className="h-4 w-4" />
                View Story
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ShareButton;
