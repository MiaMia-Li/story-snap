"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLinkIcon, Globe2Icon, LinkIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

interface ShareButtonProps {
  story: {
    storyId: string;
    title: string;
    isPublic: boolean;
  };
  size?: "sm" | "default";
  onUpdatePublicStatus?: (isPublic: boolean) => void;
}

const ShareButton = ({
  story,
  size = "default",
  onUpdatePublicStatus,
}: ShareButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // 构建分享URL
  const getShareUrl = () => `${window.location.origin}/story/${story.storyId}`;

  // API调用函数
  const updateStoryPublicStatus = async (newPublicStatus: boolean) => {
    if (!story.storyId) return;

    try {
      const response = await fetch(`/api/story/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyId: story.storyId,
          isPublic: newPublicStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update story status");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update story status:", error);
      throw error;
    }
  };

  // 处理公开/私有状态切换
  const handleTogglePublic = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await updateStoryPublicStatus(!story.isPublic);
      onUpdatePublicStatus?.(!story.isPublic);

      toast(story.isPublic ? "Story is now private" : "Story is now public", {
        description: story.isPublic
          ? "Only you can view this story now"
          : "Anyone with the link can view this story",
      });
    } catch (error) {
      toast.error("Failed to update story status");
    } finally {
      setIsLoading(false);
    }
  };

  // 复制链接
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      toast.success("✨ Copied! Share it with your friends~");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // Twitter分享
  const handleTwitterShare = async () => {
    try {
      if (!story.isPublic) {
        await updateStoryPublicStatus(true);
        onUpdatePublicStatus?.(true);
      }

      const shareText = `Check out my story "${story.title}" on SnapyStory ✨`;
      const shareUrl = getShareUrl();
      const hashtags = "SnapyStory,AIStory,AIArt";

      const twitterUrl = `https://twitter.com/intent/tweet?${new URLSearchParams(
        {
          text: shareText,
          url: shareUrl,
          hashtags: hashtags,
        }
      )}`;

      window.open(twitterUrl, "_blank");
    } catch (error) {
      toast.error("Failed to share on Twitter");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* View Story Button */}
      <Link href={`/story/${story.storyId}`} passHref>
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLinkIcon className="h-4 w-4" />
          View
        </Button>
      </Link>

      {/* Share Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleCopyLink}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy Link
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleTwitterShare}>
            <TwitterLogoIcon className="h-4 w-4 mr-2" />
            Share on Twitter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Public/Private Toggle Button */}
      <Button
        variant={story.isPublic ? "default" : "outline"}
        size="sm"
        className={`gap-2 transition-all`}
        onClick={handleTogglePublic}
        disabled={isLoading}>
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {story.isPublic ? (
              <Globe2Icon className="h-4 w-4" />
            ) : (
              <LockIcon className="h-4 w-4" />
            )}
          </>
        )}
        {story.isPublic ? "Public" : "Make Public"}
      </Button>
    </div>
  );
};

export default ShareButton;
