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
import { Download } from "lucide-react";
import { useCompletion, experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const IMAGE_URL =
//   "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/image/1719814052939-Klrm7gBgErzQyXqvHaR4CKCB6Zd71B.jpeg";

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStyle = useRef<any>(null);
  const { refreshCredits } = useAuth();

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
      await fetch("/api/story/save", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await refreshCredits();
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
        // 初始请求
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

        // 轮询检查状态
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

        // 成功完成
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
    const { images, imageStyle, language } = formData;
    console.log(images, "images");
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
        style: style.name,
        image: image,
        language: language,
      });
    } catch (err) {
      console.error("handleGenerate error", err);
      setError("Generation failed. Please try again.");
      setIsLoading(false);
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
            <DisplaySection
              prediction={prediction}
              isLoading={isLoading}
              storyContent={object?.content}
              storyTitle={object?.title}
            />
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

                  <TwitterShareButton
                    text="I just generated a story with SnapStoryAI! It's so much fun! You should try it out too! 🚀"
                    hashtags="SnapStoryAI,EasyEditing"
                    image={prediction?.output[prediction.output.length - 1]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
