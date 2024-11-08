// components/DisplaySection.jsx
import { Button } from "@/components/ui/button";
import { Share2, Download, ImageIcon, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";
import TwitterShareButton from "./TwitterShareButton";

export function DisplaySection({
  prediction,
  error,
  isLoading,
  storyContent,
}: {
  prediction: any;
  error?: string;
  isLoading: boolean;
  storyContent: string;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="md:text-3xl text-xl font-semibold md:flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Transform Your Ideas into
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Magic
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Watch as AI turns your stories into stunning visuals. Each image is
          <span className="text-primary font-medium"> uniquely crafted </span>
          just for you ✨
        </p>
      </div>

      {/* 故事内容展示区块 */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Your Story
          </h3>
        </div>
        {storyContent ? (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {storyContent}
          </p>
        ) : (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
          </div>
        )}
      </div>
      {prediction?.status && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Status: {prediction.status}
        </p>
      )}

      {/* Loading状态提示 */}
      {isLoading && !prediction?.output && (
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Please wait while we process your request...
          </p>
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
                layout="responsive"
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          ) : (
            // 占位状态或loading状态
            <div className="relative w-full mx-auto aspect-video rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 w-full">
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
                    <p className="text-sm">Creating your masterpiece...</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5]" />
                    <p className="text-xs text-center px-4">
                      Your image will appear here
                    </p>
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
