// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { useEffect, useRef, useState } from "react";
import { STYLE_PRESETS, TEMPLATE_IMAGES } from "@/config/story";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Share2Icon, Sparkles } from "lucide-react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { uploadFile } from "@/utils/image";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStyle = useRef<any>(null);
  const storyId = useRef<string | null>(null);
  const { refreshCredits, credits } = useAuth();

  const handleDownload = () => {
    const imageUrl = prediction?.output[prediction.output.length - 1];
    window.open(imageUrl, "_blank");
  };

  const saveStory = async (payload: {
    title: string;
    content: string;
    image: string;
  }) => {
    try {
      const response = await fetch("/api/story/save", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      refreshCredits();
      storyId.current = data.storyId;
    } catch (error) {
      console.error("saveStory error", error);
    }
  };

  const fetchImage = async (payload: {
    prompt: string;
    image: string;
  }): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/predictions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        let prediction = await response.json();

        if (response.status !== 201) {
          throw new Error(prediction.detail || "Failed to start prediction.");
        }

        setPrediction(prediction);

        while (
          prediction.status !== "succeeded" &&
          prediction.status !== "failed"
        ) {
          await sleep(1000);

          const pollResponse = await fetch(`/api/predictions/${prediction.id}`);
          prediction = await pollResponse.json();

          if (pollResponse.status !== 200) {
            throw new Error(
              prediction.detail || "Error during polling prediction."
            );
          }

          setPrediction(prediction);
        }

        if (prediction.status === "failed") {
          throw new Error("Prediction generation failed.");
        }
        console.log("prediction", prediction);
        resolve(prediction);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        reject(error);
      }
    });
  };

  const {
    submit,
    isLoading: isLoadingFrame,
    object,
  } = useObject({
    api: "/api/predictions/frame",
    schema: z.object({
      frames: z.string(),
      title: z.string(),
      content: z.string(),
    }),
    onError: async (error) => {
      setError("Failed to generate story, please try again.");
      setIsLoading(false);
      console.log(error);
      return;
    },
    onFinish: async (result) => {
      if (result.error) {
        setError("Failed to generate story, please try again.");
        setIsLoading(false);
        return;
      }
      const { frames, title, content } = result.object as {
        frames: string;
        title: string;
        content: string;
      };
      const templates: string[] =
        TEMPLATE_IMAGES.get(currentStyle.current.id)?.images || [];

      const templateImage =
        templates[Math.floor(Math.random() * templates.length)];
      try {
        const predictionResult = await fetchImage({
          prompt: `${currentStyle.current.promptImage}${frames}`,
          image: templateImage,
        });
        saveStory({
          title,
          content,
          image: predictionResult?.output[predictionResult.output.length - 1],
        });
        setIsLoading(false);
      } catch (error) {
        setError("Failed to generate story, please try again.");
        setIsLoading(false);
      }
    },
  });

  const handleGenerate = async (formData: any) => {
    if (credits <= 0) {
      setError("You have no credits left. Please buy more credits.");
      return;
    }
    const { images, imageStyle, language, keyword } = formData;
    if (!images || images.length === 0) {
      setError("Please reupload images");
      return;
    }

    const style = STYLE_PRESETS.find((style) => style.id === imageStyle);
    if (!style) {
      setError("Selected style is invalid. Please choose another style.");
      return;
    }
    currentStyle.current = style;

    setIsLoading(true);
    setError(null);
    setPrediction({
      status: "starting",
    });

    try {
      const imagesUrls = (
        await Promise.all(images.map((image: any) => uploadFile(image.file)))
      ).filter((url) => url !== undefined);

      console.log("-imagesUrls", imagesUrls);
      await submit({
        style: style.promptText,
        images: imagesUrls.map((i: any) => i.url),
        language: language,
        keyword: keyword,
      });
    } catch (err) {
      console.error("handleGenerate error", err);
      setError("Generation failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!storyId.current) {
      setError("Please generate a story first.");
      return;
    }
    try {
      await fetch(`/api/story/share`, {
        method: "POST",
        body: JSON.stringify({
          storyId: storyId.current,
          isPublic: true,
        }),
      });
      const shareUrl = `${window.location.origin}/story/${storyId.current}`;
      await navigator.clipboard.writeText(shareUrl);

      toast.success("✨ Copied!,Share it with your friends~");
    } catch (e) {
      console.error("handleShare error", e);
    }
  };

  return (
    <AuthProvider>
      <LoginDialog />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6">
          {/* 页面标题 */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              Transform Your Ideas into
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Magic
              </span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Watch as AI turns your stories into stunning visuals. Each image
              is
              <span className="text-primary font-medium">
                {" "}
                uniquely crafted{" "}
              </span>
              just for you ✨
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 max-w-[1200px] mx-auto pb-20 px-6">
          <div className="col-span-1">
            <FormSection onGenerate={handleGenerate} isLoading={isLoading} />
            {error && (
              <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/50 rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="space-y-8 mb-10">
              {/* 故事内容展示区块 */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Your Story
                  </h3>
                </div>
                {isLoading && !object?.content && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                      Please wait while we process your request...
                    </p>
                  </div>
                )}
                {(object?.content || object?.title) && (
                  <div className="space-y-2">
                    <h6>{object?.title}</h6>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {object?.content}
                    </p>
                  </div>
                )}
                {!object?.content && !isLoading && (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                  </div>
                )}
              </div>
            </div>
            <DisplaySection prediction={prediction} isLoading={isLoading} />
            {/* 按钮区域 */}

            {prediction?.output && (
              <div className="space-y-6 mt-10">
                {/* 成功提示 */}
                <div className="relative overflow-hidden rounded-xl border bg-primary/5 border-primary/10 p-6">
                  {/* 装饰元素 */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full blur-xl" />
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/10 rounded-full blur-xl" />

                  <div className="relative space-y-4">
                    {/* 图标和文字 */}
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="p-3 rounded-full bg-primary/10 animate-bounce">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-primary">
                          Story Created Successfully! ✨
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your story has been saved. View it in your{" "}
                          <Link
                            href="/dashboard/stories"
                            className="text-primary hover:underline font-medium transition-colors underline-offset-4">
                            dashboard
                          </Link>
                        </p>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex justify-center gap-4 pt-2">
                      <Button
                        variant="outline"
                        onClick={handleDownload}
                        disabled={isLoading}
                        className="group hover:bg-primary/5">
                        <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                        Download
                      </Button>

                      <Button onClick={handleShare} className="group">
                        <Share2Icon className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
