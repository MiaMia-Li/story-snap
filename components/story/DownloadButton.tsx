"use client";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

interface DownloadButtonProps {
  imageUrl: string;
  className?: string;
  tooltip?: string;
}

export default function DownloadButton({
  imageUrl,
  className = "",
  tooltip = "Download image",
}: DownloadButtonProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止事件冒泡
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleDownload}
      title={tooltip}
      size="iconSm">
      <Download className="h-4 w-4" />
    </Button>
  );
}
