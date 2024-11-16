"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface DownloadButtonProps {
  imageUrl: string;
  fileName?: string;
}

const DownloadButton = ({ imageUrl, fileName }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const downloadImage = async () => {
    try {
      setIsDownloading(true);

      // 获取文件扩展名
      const fileExtension = imageUrl.split(".").pop()?.split("?")[0] || "jpg";
      // 生成文件名
      const defaultFileName = `image-${Date.now()}.${fileExtension}`;
      const finalFileName = fileName || defaultFileName;

      // 处理跨域图片
      const response = await fetch(imageUrl, {
        headers: new Headers({
          Origin: window.location.origin,
        }),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // 获取blob数据
      const blob = await response.blob();

      // 创建下载链接
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = finalFileName;

      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 清理blob URL
      window.URL.revokeObjectURL(blobUrl);

      // 显示成功状态
      setIsComplete(true);
      toast.success("Image downloaded successfully");

      // 重置状态
      setTimeout(() => {
        setIsComplete(false);
      }, 2000);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={downloadImage}
      disabled={isDownloading}>
      {isDownloading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      ) : isComplete ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <DownloadIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DownloadButton;
