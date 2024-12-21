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

const WelcomeState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
    <div className="w-20 h-20 relative">
      <Image
        src="/penguin.png"
        alt="Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
    <div className="space-y-3 max-w-lg">
      <h2 className="text-2xl font-semibold text-foreground">
        Create Amazing Stories & Images
      </h2>
      <p className="text-muted-foreground">
        Transform your ideas into captivating stories and stunning visuals.
        Select a style to begin your creative journey.
      </p>
    </div>

    <div className="flex flex-wrap gap-3 justify-center items-center mt-6">
      <span className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10">
        🎯 Smart Composition
      </span>
      <span className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10">
        ⚡️ Instant Generation
      </span>
      <span className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10">
        🎭 Rich Storytelling
      </span>
    </div>
  </div>
);

const StoryLoadingSkeleton = ({ message }: { message: string }) => (
  <div className="space-y-6">
    {/* Description text */}
    <p className="text-sm text-muted-foreground italic">{message}</p>

    {/* Loading skeleton */}
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-muted rounded-md w-3/4" />

      {/* First paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-5/6" />
        <div className="h-4 bg-muted rounded-md w-4/6" />
        <div className="h-4 bg-muted rounded-md w-5/6" />
      </div>

      {/* Second paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-4/5" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
      </div>

      {/* Third paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-5/6" />
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-4/6" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
      </div>
    </div>
  </div>
);

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
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
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
          </div>
        );

      case "succeeded":
        if (prediction.output?.[0]) {
          const latestOutput = prediction.output?.[0];
          return (
            <div className="relative w-full h-full">
              <Image
                src={latestOutput}
                alt="Generated image"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-cover" // 修改这里，使用 object-cover 确保图片填充
                priority
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
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 p-4">
              <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
              <p className="text-sm font-medium text-destructive">
                {t("generateStory.generationFailed")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("generateStory.tryAgain")}
              </p>
            </div>
          </div>
        );

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
    return <WelcomeState />;
  }

  return (
    <div className="w-full p-6 rounded-xl flex flex-col lg:flex-row bg-card shadow-lg border border-border">
      {/* Story Section */}
      <div className="flex-1 p-4">
        <div className="space-y-6">
          {!object?.content && (
            <StoryLoadingSkeleton message={t("generateStory.generateTip")} />
          )}

          {(object?.content || object?.title) && (
            <div className="space-y-4 bg-card rounded-lg">
              {object?.title && (
                <h6 className="font-semibold text-xl text-foreground">
                  {object.title}
                </h6>
              )}
              <p className="text-muted-foreground leading-relaxed text-lg">
                {object?.content}
                {object?.content && <CopyButton content={object?.content} />}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div className="flex-1 p-4 border-t lg:border-t-0 lg:border-l border-border mt-4 lg:mt-0 lg:ml-4 pt-4 lg:pt-0">
        <div className="grid grid-cols-1 gap-4">
          {predictions.map((prediction: any, index: number) => (
            <div key={`${prediction.styleId}-${index}`} className="space-y-2">
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center relative overflow-hidden border border-border">
                {renderImageContent(prediction)}
              </div>
              <p className="text-sm text-center text-muted-foreground">
                {getStyleName(prediction.styleId)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
