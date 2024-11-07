"use client";

import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  Settings2,
  Wand2,
  Shuffle,
  PlusCircle,
  ArrowBigRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import { StoryConfig } from "@/types";
import { StoryStyleConfig } from "./PersetSection";
import ImageUpload from "./ImageUpload";
import { PRESETS } from "@/config/lang";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingMessage from "./LoadingMessage";
import { useAuth } from "@/contexts/auth";

export function UploadSection() {
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<any[] | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [randomPresetLabel, setRandomPresetLabel] = useState("Create a story");
  const { requireAuth, refreshCredits, credits } = useAuth();
  const [storyConfig, setStoryConfig] = useState<StoryConfig>({
    type: "story",
    length: "medium",
    style: "narrative",
    tone: "friendly",
    language: "en",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 文件上传处理
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      return await response.json();
    } catch (error) {
      console.error("File upload error:", error);
      toast.error((error as Error).message);
      return undefined;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      // 将文件上传逻辑包装在一个函数中
      const handleUpload = async () => {
        setIsUploading(true);
        try {
          const newImages = await Promise.all(
            acceptedFiles.map((file) => uploadFile(file))
          );
          const validImages = newImages.filter(
            (
              file
            ): file is {
              url: string;
              name: string;
              contentType: string;
              content: string;
            } => file !== undefined
          );
          console.log("--newImages", newImages);

          setPreviewImage((prev) => [...(prev || []), ...validImages]);
        } catch (error) {
          console.error("Upload error:", error);
          toast("Upload failed");
        } finally {
          setIsUploading(false);
          setUploadProgress(0);
        }
      };

      // 使用requireAuth包装上传函数
      requireAuth(handleUpload);
    },
    [requireAuth, setIsUploading, setPreviewImage, setUploadProgress, toast]
  );

  const {
    completion: generatedCompletion,
    complete,
    setCompletion,
    isLoading: isGenerating,
    error,
  } = useCompletion({
    api: "/api/generate_image",
    onError: (error) => {
      toast(error.message);
    },

    onFinish: (prompt: string, completion: string) => {
      const title = completion.split("\n")[0].replace(/(Title: |[#*])/g, "");
      const content = completion.split("\n").slice(1).join("\n");
      dispatchEvent(new Event("finishStory"));
      refreshCredits();
      saveStory(title, content);
      storyRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });
  const saveStory = async (title: string, content: string) => {
    try {
      const response = await fetch("/api/story/save", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          images: JSON.stringify(previewImage),
        }),
      });
    } catch (error) {
      console.error("saveStory error", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 10485760,
    multiple: true,
    onError: (error) => {
      toast(error.message);
    },
    onDropRejected: (fileRejections) => {
      console.log("--fileRejections", fileRejections);
      toast(fileRejections[0].errors[0].message);
    },
  });

  const handleRandomPreset = () => {
    const presets = Object.values(PRESETS);
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    setStoryConfig({
      ...storyConfig,
      ...randomPreset.config,
    });
    setRandomPresetLabel(randomPreset.label);
  };

  const handleGenerate = async () => {
    if (!previewImage) return;
    if (credits <= 0) {
      toast("No credits, please buy credits");
      return;
    }
    try {
      //再次生成时组件刷新
      setCompletion("");
      // 在开始生成时就滚动到生成区域
      setTimeout(() => {
        storyRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      const payload = {
        image: previewImage,
        storyType: storyConfig.type,
        storyLength: storyConfig.length,
        storyStyle: storyConfig.style,
        language: storyConfig.language,
      };
      await complete(JSON.stringify(payload));
    } catch (error) {
      console.error("Error in handleGenerate:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* 图片上传区域 */}
      <div className="relative overflow-hidden rounded-xl transition-all duration-300 h-[300px]">
        <ImageUpload
          onClearImages={() => setPreviewImage([])}
          onRemoveImage={(index) =>
            setPreviewImage((prev: string[] | null) =>
              prev ? prev.filter((_, i) => i !== index) : null
            )
          }
          previewImage={previewImage}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
        />
      </div>
      {previewImage && previewImage?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          {/* Settings Panel */}
          <div className="backdrop-blur-md">
            <Card className="shadow-lg bg-primary/5 border-none">
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setIsConfigExpanded(!isConfigExpanded)}>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Settings2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Story Settings
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Customize your story generation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {/* Random Button */}
                        <Button
                          variant="outline"
                          className="flex-1 h-12 group hover:bg-primary/5 transition-colors rounded-full"
                          onClick={handleRandomPreset}>
                          <div className="relative flex items-center justify-center">
                            <Shuffle className="h-5 w-5 mr-2 group-hover:animate-spin" />
                            <span className="relative z-10">
                              {randomPresetLabel}
                            </span>
                          </div>
                        </Button>

                        <Button
                          className="flex-1 h-12 group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                          onClick={handleGenerate}
                          disabled={isGenerating}>
                          <div className="relative flex items-center justify-center">
                            {isGenerating ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                <span className="animate-pulse">
                                  Crafting your story...
                                </span>
                              </>
                            ) : (
                              <>
                                <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                                Generate Story
                              </>
                            )}
                          </div>
                          {/* Enhanced Sparkle Effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              background: [
                                "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                                "linear-gradient(45deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)",
                              ],
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "linear",
                            }}
                          />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsConfigExpanded(!isConfigExpanded);
                        }}>
                        {isConfigExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Config Details */}
                  <AnimatePresence>
                    {isConfigExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <StoryStyleConfig
                            config={storyConfig}
                            onChange={setStoryConfig}
                            isPro={false}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* 故事展示区域 */}
      <div ref={storyRef}>
        <AnimatePresence mode="wait">
          {generatedCompletion ? (
            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Your Story
                  </h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap">
                    {generatedCompletion}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : isGenerating ? (
            <LoadingMessage />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
