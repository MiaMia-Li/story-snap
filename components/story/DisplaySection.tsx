// components/DisplaySection.jsx
import { Share2, Download, ImageIcon, Sparkles, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function DisplaySection({
  prediction,
  isLoading,
}: {
  prediction: any;
  error?: string;
  isLoading: boolean;
}) {
  const t = useTranslations("generateStory");
  return (
    <div className="space-y-8">
      {/* 故事内容展示区块 */}
      {prediction?.status && (
        <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-2 mr-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {prediction.status}
            </span>
          </div>
          {isLoading && !prediction?.output && (
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                {t("waiting")}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* 图片展示区域 */}
        <div>
          {prediction?.output ? (
            // 已生成的图片
            <div className="w-full mx-auto rounded-lg overflow-hidden relative">
              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="Generated image"
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-contain"
                style={{ objectFit: "contain", width: "100%", height: "auto" }} // Use inline styles if necessary
              />
            </div>
          ) : (
            // 占位状态或loading状态
            <div className="relative w-full mx-auto aspect-video rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 w-full">
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
                    <p className="text-sm">{t("craftingImage")}</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5]" />
                    <p className="text-xs text-center px-4">{t("yourImage")}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
