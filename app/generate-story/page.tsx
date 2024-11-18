// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { useRef, useState } from "react";
import { STYLE_PROMOT, TEMPLATE_IMAGES, TONE_PROMPTS } from "@/config/story";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { uploadFile } from "@/utils/image";
import { useTranslations } from "next-intl";
import { DashboardIcon } from "@radix-ui/react-icons";
import TwitterShareButton from "@/components/story/TwitterShareButton";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const t = useTranslations("");
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStyle = useRef<any>(null);
  const story = useRef<any>(null);
  const { refreshCredits, credits } = useAuth();

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
      story.current = data.story;
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
    console.log("formData", formData);

    if (credits <= 0) {
      setError("You have no credits left. Please buy more credits.");
      return;
    }
    const { images, imageStyle, language, keyword, tone } = formData;
    if (!images || images.length === 0) {
      setError("Please reupload images");
      return;
    }
    const style = STYLE_PROMOT.find((style) => style.id === imageStyle);
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
      submit({
        style: style.promptText,
        images: imagesUrls.map((i: any) => i.url),
        language: language,
        keyword: keyword,
        tone: TONE_PROMPTS.find((t: any) => t.value === tone)?.prompt,
      });
    } catch (err) {
      console.error("handleGenerate error", err);
      setError("Generation failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!story.current?.storyId) {
      setError("Please generate a story first.");
      return;
    }
    try {
      await fetch(`/api/story/share`, {
        method: "POST",
        body: JSON.stringify({
          storyId: story.current.storyId,
          isPublic: true,
        }),
      });
      // const shareUrl = `${window.location.origin}/story/${story.current.storyId}`;
      // await navigator.clipboard.writeText(shareUrl);

      // toast.success("✨ Copied!,Share it with your friends~");
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
              {t("generateStory.title")}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("generateStory.title2")}
              </span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("generateStory.description")}
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
                    {t("generateStory.yourStory")}
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
              <div className="mt-8 flex flex-col items-center">
                {/* Success Message */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium">
                    Story Generated Successfully ✨
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your story has been saved and ready to share
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <Link href="/dashboard/stories">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2">
                      <DashboardIcon className="h-4 w-4" />
                      View in Dashboard
                    </Button>
                  </Link>
                  {story?.current && (
                    <div onClick={handleShare}>
                      <TwitterShareButton
                        text={`I just created a story on SnapyStory, so amazing✨! Check it out: ${story?.current?.title}`}
                        hashtags={"SnapyStory,AIStory,AIArt"}
                        image={`https://www.snapstoryai.com/story/${story?.current?.storyId}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
