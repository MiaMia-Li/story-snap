import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TwitterShareButton from "./TwitterShareButton";

interface ActionButtonsProps {
  story: any;
  predictions: any[];
  onShare?: () => Promise<void>;
}

export function ActionButtons({ story, predictions }: ActionButtonsProps) {
  if (
    !predictions ||
    predictions.length === 0 ||
    !predictions.every((p) => p.output?.length > 0)
  ) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Success Message */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Story Generated Successfully ✨</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your story has been saved and ready to share
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/stories">
          <Button variant="outline" className="flex items-center gap-2">
            <DashboardIcon className="h-4 w-4" />
            View in Dashboard
          </Button>
        </Link>

        {story && (
          <TwitterShareButton
            storyId={story?.storyId || ""}
            text={`I just created a story on SnapyStory, so amazing✨! Check it out: ${story?.title}`}
            hashtags="SnapyStory,AIStory,AIArt"
            image={`https://www.snapstoryai.com/story/${story?.storyId}`}
          />
        )}
      </div>
    </div>
  );
}
