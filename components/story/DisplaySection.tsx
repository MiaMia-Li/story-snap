// components/DisplaySection.jsx
import { Button } from "@/components/ui/button";
import { Share2, Download, ImageIcon, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";

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
  const handleDownload = () => {
    window.open(prediction?.output[prediction.output.length - 1], "_blank");
  };

  const handleShare = () => {
    navigator.share({
      title: "My Generated Image",
      url: prediction?.output[prediction.output.length - 1],
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Transform Your Ideas into
          <span className="text-gradient">Magic</span>
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Watch as AI turns your stories into stunning visuals. Each image is
          <span className="text-primary font-medium"> uniquely crafted </span>
          just for you ✨
        </p>
      </div>

      {/* 故事内容展示区块 */}
      {storyContent && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Your Story</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {storyContent}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* 图片展示区域 */}
        <div
          className="relative aspect-square w-full rounded-lg overflow-hidden
          bg-gray-50 border border-gray-200">
          {prediction?.output ? (
            // 已生成的图片
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="Generated image"
              fill
              className="object-cover"
            />
          ) : (
            // 占位状态或loading状态
            <div
              className="absolute inset-0 flex flex-col items-center justify-center
              text-gray-400">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3" />
                  <p className="text-sm">Creating your masterpiece...</p>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 mb-3 stroke-[1.5]" />
                  <p className="text-sm">Your image will appear here</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* 按钮区域 */}
        {prediction?.output && (
          <>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="text-gray-600 hover:text-gray-900"
                disabled={isLoading}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="text-gray-600 hover:text-gray-900"
                disabled={isLoading}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {prediction.status && (
              <p className="text-sm text-gray-500 text-center">
                Status: {prediction.status}
              </p>
            )}
          </>
        )}

        {/* Loading状态提示 */}
        {isLoading && !prediction?.output && (
          <div className="text-center">
            <p className="text-sm text-gray-500 animate-pulse">
              Please wait while we process your request...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
