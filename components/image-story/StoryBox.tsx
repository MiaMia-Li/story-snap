import { STYLE_OPTIONS } from "@/config/imgStyle";
import {
  AlertCircle,
  Download,
  Loader2,
  PenLine,
  Share2,
  Sparkles,
} from "lucide-react";
import { Prediction } from "replicate";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CopyButton } from "../story/CopyButton";
import Examples from "./Examples";
import { Badge } from "../ui/badge";
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

export default function StoryBox({
  object,
  predictions,
  isLoading,
}: {
  object: any;
  predictions: any;
  isLoading: boolean;
}) {
  const t = useTranslations("");

  const getStyleName = (styleId: string) => {
    const style = STYLE_OPTIONS.find((s) => s.id === styleId);
    if (!style) return "";

    return `${t(`generateStory.${style.name}`)}`;
  };

  const renderImageContent = (prediction: Prediction) => {
    switch (prediction.status) {
      case "starting":
      case "processing":
        return (
          <div className="text-center space-y-4 flex flex-col items-center">
            <div className="w-8 h-8 relative animate-pulse">
              <Image
                src="/penguin.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full">
              <Loader2 className="animate-spin h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("generateStory.waiting")}
              </span>
            </div>
          </div>
        );

      case "succeeded":
        if (prediction.output?.[0]) {
          const latestOutput = prediction.output?.[0];
          return (
            <div className="relative w-full h-full">
              <img
                src={latestOutput}
                alt="Generated image"
                // fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-cover" // 修改这里，使用 object-cover 确保图片填充
                // priority
                loading="eager"
                onError={(e) => {
                  console.error("Image load error:", e);
                }}
              />

              {/* 图片操作按钮 */}
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
        return <EmptyState message={t("generateStory.noImage")} />;

      case "failed":

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState message={t("generateStory.yourImage")} />
          </div>
        );
    }
  };

  // If no predictions and no content, show welcome state
  if (!predictions?.length && !object?.content && !isLoading) {
    return <Examples />;
  }

  return (
    <div className="w-full py-6 px-10 rounded-xl flex flex-col bg-card shadow-lg border border-border">
      {/* Story Section */}
      <div className="flex-1">
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
      <div className="flex-1 py-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {predictions.map((prediction: any, index: number) => (
            <div
              key={`${prediction.styleId}-${index}`}
              className="space-y-2 relative">
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center relative overflow-hidden">
                {renderImageContent(prediction)}
              </div>
              <Badge
                className="text-sm absolute top-0 left-2"
                variant="secondary">
                {getStyleName(prediction.styleId)}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
