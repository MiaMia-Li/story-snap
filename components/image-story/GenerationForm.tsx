"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TextToImageForm } from "./TextToImageForm";
import { ImageToImageForm } from "./ImageToImageForm";

interface GenerationFormProps {
  onGenerate: () => void;
}

export default function GenerationForm({ onGenerate }: GenerationFormProps) {
  const [credits, setCredits] = useState(100);
  const [activeTab, setActiveTab] = useState<
    "text-to-image" | "image-to-image"
  >("text-to-image");

  // 创建滚动容器的引用
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 监听 activeTab 的变化
  useEffect(() => {
    // 当标签切换时，将滚动容器滚动到顶部
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] py-6">
      {/* Tabs Header - 固定在顶部 */}
      <div className="flex-none px-4 mb-4">
        <div className="flex space-x-6 border-b border-border">
          <button
            onClick={() => setActiveTab("text-to-image")}
            className={`relative px-2 pb-2 text-sm font-medium transition-colors ${
              activeTab === "text-to-image"
                ? "text-primary after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-muted-foreground hover:text-primary"
            }`}>
            Text to Image
          </button>
          <button
            onClick={() => setActiveTab("image-to-image")}
            className={`relative px-2 pb-2 text-sm font-medium transition-colors ${
              activeTab === "image-to-image"
                ? "text-primary after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-muted-foreground hover:text-primary"
            }`}>
            Image to Image
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef} // 添加 ref
        className="flex-1 overflow-y-scroll pb-4 min-h-0 w-full px-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {activeTab === "text-to-image" && (
          <div className="animate-in fade-in duration-200">
            <TextToImageForm />
          </div>
        )}
        {activeTab === "image-to-image" && (
          <div className="animate-in fade-in duration-200">
            <ImageToImageForm />
          </div>
        )}
      </div>

      {/* Bottom Button - 固定在底部 */}
      <div className="flex-none pt-4 border-t border-border px-4">
        <Button onClick={onGenerate} className="w-full" variant="default">
          Generate (Credits: {credits})
        </Button>
      </div>
    </div>
  );
}
