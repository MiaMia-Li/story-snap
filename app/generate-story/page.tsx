// app/page.js
"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { FormSection } from "@/components/story/FormSection";
import { DisplaySection } from "@/components/story/DisplaySection";
import { AuthProvider } from "@/contexts/auth";
import { uploadFile } from "@/utils/image";
import { useState } from "react";
import { toast } from "sonner";
import { STYLE_PRESETS } from "@/config/story";
import { useCompletion } from "ai/react";
import { Language } from "@/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { completion, complete } = useCompletion({
    api: "/api/predictions/text",
  });

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
        <div className="grid grid-cols-3 gap-20 max-w-[1200px] mx-auto py-20 px-6">
          <div className="col-span-1">
            <FormSection onGenerate={handleGenerate} />
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
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
