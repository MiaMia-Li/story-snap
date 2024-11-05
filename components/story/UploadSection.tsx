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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import { StoryConfig } from "@/types";
import { StoryStyleConfig } from "./PersetSection";
import ImageUpload from "./ImageUpload";
import { PRESETS } from "@/config/lang";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UploadSection() {
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [randomPresetLabel, setRandomPresetLabel] = useState("Create a story");
  const router = useRouter();

  const [storyConfig, setStoryConfig] = useState<StoryConfig>({
    type: "story",
    length: "medium",
    style: "narrative",
    tone: "friendly",
    language: "en",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log("--acceptedFiles", acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      try {
        // 模拟上传进度
        const reader = new FileReader();
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        };

        reader.onload = () => {
          setPreviewImage(reader.result as string);
          setIsUploading(false);
          setUploadProgress(0);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  }, []);

  const {
    completion,
    complete,
    isLoading: isGenerating,
    error,
  } = useCompletion({
    api: "/api/image",
    onError: (error) => {
      console.log("--error", error.message);
      if (error.message === "Unauthorized") {
        router.push(`/login?callbackUrl=${window.location.href}`);
      }
      toast(error.message);
    },
    onFinish: () => {
      storyRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 10485760,
    multiple: false,
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
    try {
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
          previewImage={previewImage}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
        />
      </div>
      {previewImage && (
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

                        {/* Generate Button */}
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
          {completion ? (
            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Your Story
                  </h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap">{completion}</div>
                </div>
              </CardContent>
            </Card>
          ) : isGenerating ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12">
              <Card className="bg-gradient-to-br from-primary/5 to-background max-w-md mx-auto">
                <CardContent className="p-6">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground animate-pulse">
                    Creating your story...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
