import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";
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

const ShareButton = ({ story, size = "default" }: ShareButtonProps) => {
  // 构建分享URL
  const getShareUrl = () => `${window.location.origin}/story/${story.storyId}`;

  // 复制链接
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      toast.success("✨ Copied! Share it with your friends~");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // // Twitter分享
  const handleTwitterShare = async () => {
    try {
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
    </div>
  );
};

export default ShareButton;
