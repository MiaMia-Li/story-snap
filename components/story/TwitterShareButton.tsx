"use client";

import React from "react";
import { FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TwitterShareButtonProps {
  storyId: string;
  text: string;
  hashtags: string;
  image?: string;
  className?: string;
  children?: string | React.ReactNode;
}

const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  storyId,
  text,
  hashtags,
  className,
  image,
  children,
}) => {
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent(hashtags);
  const encodedUrl = encodeURIComponent(
    (image || "https://www.snapstoryai.com").trim()
  );

  const url = `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${encodedUrl}`;

  return (
    <Button
      size="default"
      onClick={() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      className={cn(styleVariants["3d"], className)}>
      {/* 背景动画效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1DA1F2] to-[#0D8ED9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 图标 */}
      <FaTwitter
        className={cn(
          "mr-3 text-xl",
          "group-hover:scale-110 transition-transform duration-300"
        )}
      />

      {/* 文字 */}
      <span
        className={cn(
          "font-semibold",
          "group-hover:translate-x-0.5 transition-transform duration-300"
        )}>
        {children || "Share on Twitter"}
      </span>
    </Button>
  );
};

// 替代样式方案
const styleVariants = {
  // 方案1：深色渐变
  dark: "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-[#1DA1F2]",

  // 方案2：描边效果
  outline:
    "border-2 border-[#1DA1F2] bg-white text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white",

  // 方案3：玻璃态效果
  glass:
    "bg-white/10 backdrop-blur-md border border-white/20 text-[#1DA1F2] hover:bg-white/20",

  // 方案4：亮色方案
  light: "bg-blue-50 text-[#1DA1F2] hover:bg-blue-100 border border-blue-200",

  // 方案5：3D 效果
  "3d": `
    bg-[#1DA1F2] text-white
    border-b-4 border-blue-600
    active:border-b-0 active:translate-y-1
    transform-gpu
  `,
};

export default TwitterShareButton;
