// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { uploadFile } from "@/utils/image";
import { useState } from "react";
import { toast } from "sonner";
import { STYLE_PRESETS } from "@/config/story";
import { useCompletion } from "ai/react";
import { Language } from "@/types";
import TwitterShareButton from "@/components/story/TwitterShareButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refreshCredits } = useAuth();
  const { completion, complete } = useCompletion({
    api: "/api/predictions/text",
  });

  const handleDownload = () => {
    const imageUrl = prediction?.output[prediction.output.length - 1];
    window.open(imageUrl, "_blank");
  };

  const saveStory = async (completion: string, image: string) => {
    const title = completion.split("\n")[0].replace(/(Title: |[#*])/g, "");
    const content = completion.split("\n").slice(1).join("\n");
    try {
      await fetch("/api/story/save", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          images: image,
        }),
      });
      await refreshCredits();
    } catch (error) {
      console.error("saveStory error", error);
    }
  };

  const uploadImages = async (images: File[]) => {
    try {
      const imageUrls = await Promise.all(images.map(uploadFile));
      const validImageUrls = imageUrls.filter((url) => url !== undefined);
      return validImageUrls;
    } catch (error) {
      console.error("File upload error:", error);
      toast.error((error as Error).message);
      return [];
    }
  };

  const fetchImage = async (prompt: string, image: string) => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, image }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail || "Failed to start prediction.");
      return;
    }
    setPrediction(prediction);
    console.log(prediction, "initial prediction");
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
      console.log(prediction, "updated prediction status");
    }
    if (prediction.status === "failed") {
      setError("Prediction generation failed.");
    }
  };

  const fetchText = async (
    prompt: string,
    image: string,
    language: Language
  ) => {
    await complete(prompt, {
      body: { image, language },
    });
  };

  const handleGenerate = async (formData: any) => {
    console.log(formData, "formData");
    const { images, imageStyle, language } = formData;

    const imageUrls = await uploadImages(
      images.map((image: any) => image.file)
    );
    console.log(imageUrls, "imageUrls");

    if (imageUrls.length === 0) {
      setError("Please reupload images");
      return;
    }

    const style = STYLE_PRESETS.find((style) => style.id === imageStyle);
    if (!style) {
      setError("Selected style is invalid. Please choose another style.");
      return;
    }
    setIsLoading(true);

    try {
      await Promise.all([
        fetchImage(style.prompt, imageUrls[0].url),
        fetchText(style.promptText, imageUrls[0].url, language),
      ]);
      saveStory(completion, imageUrls[0].url);
      setIsLoading(false);
    } catch (err) {
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
              storyContent={completion}
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
