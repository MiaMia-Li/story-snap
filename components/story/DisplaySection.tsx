// components/DisplaySection.tsx
import { Share2, Download, ImageIcon, Sparkles, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils"; // 假设你使用了 tailwind-merge
import { Prediction } from "@/types";

// 定义类型

interface DisplaySectionProps {
  prediction?: Prediction;
  isLoading?: boolean;
}

// 子组件：加载状态指示器
const LoadingIndicator = ({ status }: { status: string }) => {
  const t = useTranslations("generateStory");

  return (
    <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-2 mr-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {status}
        </span>
      </div>
      {/* <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        {t("waiting")}
      </p> */}
    </div>
  );
};

// 子组件：空状态展示
const EmptyState = () => {
  const t = useTranslations("generateStory");

  return (
    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
      <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5]" />
      <p className="text-xs text-center px-4">{t("yourImage")}</p>
    </div>
  );
};

// 子组件：生成中状态
const GeneratingState = ({ status }: { status: string }) => {
  const t = useTranslations("generateStory");

  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
      {/* <p className="text-sm">{t("craftingImage")}</p> */}
      <LoadingIndicator status={status} />
    </div>
  );
};

// 主组件
export function DisplaySection({ prediction, isLoading }: DisplaySectionProps) {
  const t = useTranslations("generateStory");

  // 错误处理
  if (prediction?.error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
        <p>{prediction.error}</p>
      </div>
    );
  }

  const hasOutput = prediction?.output && prediction.output.length > 0;
  const latestOutput = hasOutput
    ? prediction.output[prediction.output.length - 1]
    : null;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div
          className={cn(
            "w-full mx-auto rounded-lg overflow-hidden",
            !hasOutput &&
              "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
          )}>
          {latestOutput ? (
            // 已生成的图片
            <div className="relative aspect-auto">
              <Image
                src={latestOutput}
                alt="Generated image"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-contain"
                priority
                loading="eager"
              />

              {/* 图片操作按钮 */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
                  onClick={() => window.open(latestOutput, "_blank")}
                  title={t("download")}>
                  <Download className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
                  onClick={() => navigator.share({ url: latestOutput })}
                  title={t("share")}>
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            // 占位状态或loading状态
            <div className="relative w-full aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                {prediction?.status ? (
                  <GeneratingState status={prediction.status} />
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
