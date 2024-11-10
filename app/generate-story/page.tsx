// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { useEffect, useRef, useState } from "react";
import { STYLE_PRESETS, TEMPLATE_IMAGES } from "@/config/story";
import { Language } from "@/types";
import TwitterShareButton from "@/components/story/TwitterShareButton";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Share, Share2Icon, Sparkles } from "lucide-react";
import { useCompletion, experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { toast } from "sonner";
import ShareButton from "@/components/story/ShareButton";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const IMAGE_URL =
//   "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/image/1719814052939-Klrm7gBgErzQyXqvHaR4CKCB6Zd71B.jpeg";

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
    onFinish: async (result) => {
      if (result.error) {
        setError("Failed to generate story, please try again.");
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
    const { images, imageStyle, language } = formData;
    if (!images || images.length === 0) {
      setError("Please reupload images");
      return;
    }

    const image = images[0].base64;

    const style = STYLE_PRESETS.find((style) => style.id === imageStyle);
    if (!style) {
      setError("Selected style is invalid. Please choose another style.");
      return;
    }
    currentStyle.current = style;

    setIsLoading(true);
    setError(null);

    try {
      await submit({
        style: style.promptText,
        image: image,
        language: language,
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
      await fetch(`/api/story/share/`, {
        method: "POST",
        body: JSON.stringify({
          storyId: storyId.current,
        }),
      });
      const shareUrl = `${window.location.origin}/story/${storyId.current}`;
      await navigator.clipboard.writeText(shareUrl);

      toast.success("✨ Copied!", {
        description: "Share it with your friends~",
        duration: 2000,
      });
    } catch (e) {
      console.error("handleShare error", e);
    }
  };

  return (
    <AuthProvider>
      <LoginDialog />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 max-w-[1200px] mx-auto py-20 px-6">
          <div className="col-span-1">
            <FormSection onGenerate={handleGenerate} isLoading={isLoading} />
            {error && (
              <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="space-y-8 mb-10">
              <div className="space-y-2 text-center">
                <h1 className="md:text-3xl text-xl font-semibold md:flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Transform Your Ideas into
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    Magic
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                  Watch as AI turns your stories into stunning visuals. Each
                  image is
                  <span className="text-primary font-medium">
                    {" "}
                    uniquely crafted{" "}
                  </span>
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
              <div className="mt-10">
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    disabled={isLoading}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>

                  <Button
                    onClick={handleShare}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90">
                    <Share2Icon className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
