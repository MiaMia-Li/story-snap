// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { STYLE_PRESETS, TEMPLATE_IMAGES } from "@/config/story";
import { Language } from "@/types";
import TwitterShareButton from "@/components/story/TwitterShareButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const IMAGE_URL =
//   "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/image/1719814052939-Klrm7gBgErzQyXqvHaR4CKCB6Zd71B.jpeg";

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [story, setStory] = useState<{ title: string; content: string } | null>(
    null
  );
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

  const fetchImage = async (payload: { prompt: string; image: string }) => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail || "Failed to start prediction.");
      return;
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
        setError(prediction.detail || "Error during polling prediction.");
        return;
      }
      setPrediction(prediction); // Update the state after each poll
    }
    if (prediction.status === "failed") {
      setError("Prediction generation failed.");
    }
  };

  useEffect(() => {
    if (prediction?.status === "succeeded" && prediction?.output) {
      saveStory({
        title: story?.title || "",
        content: story?.content || "",
        image: prediction?.output[prediction.output.length - 1],
      });
    }
  }, [prediction, story]);

  const fetchFrame = async (payload: {
    style: string;
    image: string;
    language: Language;
  }) => {
    try {
      const response = await fetch("/api/predictions/frame", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetchFrame error", error);
      throw error;
    }
  };

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    setStory(null);

    const { images, imageStyle, language } = formData;
    console.log(images, "images");

    const image = images[0].base64;
    if (!image) {
      setError("Please reupload images");
      return;
    }

    const style = STYLE_PRESETS.find((style) => style.id === imageStyle);
    if (!style) {
      setError("Selected style is invalid. Please choose another style.");
      return;
    }

    try {
      const frameData = await fetchFrame({
        style: style.name,
        image: image,
        language: language,
      });

      if (!frameData) {
        throw new Error("Failed to fetch frame data");
      }

      const { frames, title, content } = frameData;
      setStory({ title, content });
      console.log(frames, "frames");
      const templates: string[] | undefined = TEMPLATE_IMAGES.get(
        style.id
      )?.images;
      if (!templates) {
        throw new Error("No templates found for this style");
      }
      const templateImage =
        templates[Math.floor(Math.random() * templates.length)];

      await fetchImage({
        prompt: `${style.promptImage}${frames}`,
        image: templateImage,
      });

      setIsLoading(false);
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
              <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <DisplaySection
              prediction={prediction}
              isLoading={isLoading}
              storyContent={story}
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
