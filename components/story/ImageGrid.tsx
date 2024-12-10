import { useTranslations } from "next-intl";
import { Prediction } from "@/types";
import { STYLE_OPTIONS } from "@/config/imgStyle";
import { Loader2, AlertCircle, Share2, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageGridProps {
  predictions: Prediction[];
  isLoading: boolean;
}

// 加载状态指示器组件
const LoadingIndicator = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    <span className="text-sm font-medium text-muted-foreground text-center">
      {status}
    </span>
  </div>
);

// 空状态组件
const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="text-center flex flex-col items-center gap-2">
      <Image src="/penguin.png" alt="penguin" width={36} height={36} />
      <p className="text-sm text-muted-foreground px-4">{message}</p>
    </div>
  </div>
);

// 错误状态组件
const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="text-center">
      <AlertCircle className="w-8 h-8 mb-3 mx-auto text-destructive" />
      <p className="text-sm text-destructive px-4">{message}</p>
    </div>
  </div>
);

export function ImageGrid({ predictions, isLoading }: ImageGridProps) {
  const t = useTranslations("");

  const getStyleName = (styleId: string) => {
    return t(
      `generateStory.${STYLE_OPTIONS.find((s) => s.id === styleId)?.name}`
    );
  };

  const renderImageContent = (prediction: Prediction, index: number) => {
    // 根据不同状态渲染不同内容
    switch (prediction.status) {
      case "starting":
      case "processing":
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center flex flex-col items-center gap-2">
              <Image
                src="/penguin.png"
                alt="penguin"
                width={36}
                height={36}
                className="animate-bounce"
              />
              <LoadingIndicator status={prediction.status} />
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
          <ErrorState
            message={prediction.error || t("generateStory.generationFailed")}
          />
        );

      default:
        return <EmptyState message="" />;
    }
  };

  if (!predictions || !predictions.length) {
    return (
      <div className="flex justify-center">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border flex items-center justify-center bg-muted">
          <EmptyState message={t("generateStory.yourImage")} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {predictions.map((prediction, index) => (
        <div key={`${prediction.styleId}-${index}`} className="space-y-3">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-border flex items-center justify-center bg-muted">
            {renderImageContent(prediction, index)}
          </div>
          <div className="text-center">
            <h3>{getStyleName(prediction.styleId)}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
