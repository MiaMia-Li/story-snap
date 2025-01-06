import { Download, Share2 } from "lucide-react";
import { Prediction } from "replicate";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CopyButton } from "../story/CopyButton";
import Examples from "./Examples";
import StoryLoadingSkeleton from "../common/StoryLoadingSkeleton";

const EmptyState = ({
  message,
  type = "image",
}: {
  message: string;
  type?: "image" | "story";
}) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] space-y-3">
    <div className="w-8 h-8 relative">
      <Image
        src="/penguin.png"
        alt="Logo"
        fill
        className="object-contain opacity-50"
      />
    </div>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

const DotLoading = () => (
  <div className="flex items-center gap-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_ease-in-out_infinite]"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

export default function StoryBox({
  object,
  prediction,
  isLoading,
}: {
  object: any;
  prediction: any;
  isLoading: boolean;
}) {
  const t = useTranslations("");

  const renderVideo = () => {
    console.log("--prediction", prediction);
    switch (prediction?.status) {
      case "starting":
      case "processing":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {prediction?.input?.first_frame_image ? (
              <div className="absolute inset-0">
                <Image
                  src={prediction.input.first_frame_image}
                  alt="Background"
                  fill
                  className="opacity-50 object-scale-down"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
            )}
            <div className="relative z-10 text-center space-y-4 flex flex-col items-center">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                  <DotLoading />
                  <span className="text-sm font-medium text-primary">
                    {t("generateStory.waiting")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("generateStory.estimateTime")} {/* 添加预计时间提示 */}
                </p>
              </div>
            </div>
          </div>
        );

      case "success":
        if (prediction.output) {
          const latestOutput = prediction.video;
          return (
            <div className="relative w-full h-full">
              <video
                src={latestOutput}
                className="w-full h-full object-scale-down"
                controls
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                  console.error("Video load error:", e);
                }}
              />

              {/* 视频操作按钮 */}
              <div className="absolute bottom-0 right-0 flex space-x-2 z-10">
                <Button
                  className="rounded-full"
                  onClick={() => window.open(latestOutput, "_blank")}
                  variant="secondary"
                  size="icon">
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  size="icon"
                  onClick={() => navigator.share({ url: latestOutput })}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          );
        }
        return <EmptyState message={t("generateStory.noVideo")} />;

      case "failed":

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState message={t("generateStory.waiting")} />
          </div>
        );
    }
  };
  // If no predictions and no content, show welcome state
  if (!object?.content && !isLoading) {
    return <Examples />;
  }

  return (
    <div className="w-full p-6 rounded-xl flex flex-col bg-card shadow-lg border border-border">
      {/* Story Section */}
      <div className="flex-1 p-4">
        <div className="space-y-6">
          {!object?.content && (
            <StoryLoadingSkeleton message={t("generateStory.generateTip")} />
          )}

          {(object?.content || object?.title) && (
            <div className="space-y-4 bg-card rounded-lg">
              {object?.title && (
                <h6 className="font-semibold text-lg text-foreground">
                  {object.title}
                </h6>
              )}
              <p className="text-muted-foreground leading-relaxed text-base">
                {object?.content}
                {!isLoading && <CopyButton content={object?.content} />}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div className="flex-1 p-4 mt-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <div className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-primary/10 backdrop-blur-xl">
              {renderVideo()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
