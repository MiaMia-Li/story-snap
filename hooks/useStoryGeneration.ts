import { useState, useRef, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { uploadFile } from "@/utils/image";
import { STYLE_PROMOT, TEMPLATE_IMAGES, TONE_PROMPTS } from "@/config/story";
import { FrameResponse, Prediction, StoryPayload } from "@/types";
import { useAuth } from "@/contexts/auth";
import useStyleStore from "./useStyleStore";
import { toast } from "sonner";

// Schema 定义
const frameSchema = z.object({
  frames: z.string(),
  title: z.string(),
  content: z.string(),
});

export function useStoryGeneration({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  // State & Refs
  const story = useRef<any>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const { credits, refreshCredits } = useAuth();
  const { styleIds } = useStyleStore();

  // 工具函数
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const getTemplateImage = (styleId: string) => {
    const templates = TEMPLATE_IMAGES.get(styleId)?.images || [];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  // API 请求相关函数
  const fetchImage = async (payload: { prompt: string; image: string }) => {
    try {
      // 初始化预测
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let prediction = await response.json();
      if (response.status !== 201) {
        throw new Error(prediction.detail || "Failed to start prediction.");
      }

      // 轮询状态
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
      }

      if (prediction.status === "failed") {
        throw new Error("Prediction generation failed.");
      }

      return prediction;
    } catch (error) {
      throw error;
    }
  };

  const getPrediction = async ({
    prompt,
    templateImage,
    styleId,
  }: {
    prompt: string;
    templateImage: string;
    styleId: string;
  }) => {
    const predictionResult = await fetchImage({
      prompt,
      image: templateImage,
    });
    return { ...predictionResult, styleId };
  };

  // 故事保存相关函数
  const saveStoryWithAllImages = async (
    predictions: Prediction[],
    title: string,
    content: string
  ) => {
    try {
      const allImages = predictions
        .filter(
          (pred) => pred.status === "succeeded" && pred.output?.length > 0
        )
        .map((pred) => ({
          image: pred.output[0],
          styleId: pred.styleId,
        }));

      if (allImages.length === 0) {
        throw new Error("No successful image generations");
      }

      const payload: StoryPayload = {
        title,
        content,
        image: allImages.map((img) => img.image).join(","),
        count: allImages.length,
      };

      console.log(payload, "--payload");

      const response = await fetch("/api/story/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      await refreshCredits();
      story.current = data.story;
      return data;
    } catch (error) {
      console.error("saveStoryWithAllImages error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initialPredictions = styleIds.map((styleId) => ({
      id: "",
      output: [],
      styleId,
    }));
    setPredictions(initialPredictions);
  }, [styleIds]);

  // 核心生成逻辑
  const handleFrameGeneration = async (frameResponse: FrameResponse) => {
    const { frames, title, content } = frameResponse;

    // 初始化predictions
    const initialPredictions = styleIds.map((styleId) => ({
      id: "",
      status: "processing" as const,
      output: [],
      styleId,
    }));
    setPredictions(initialPredictions);

    try {
      // 并行处理所有风格的图片生成
      const updatedPredictions = await Promise.all(
        styleIds.map(async (styleId, index) => {
          const prediction = await getPrediction({
            prompt: `${
              STYLE_PROMOT.find((s: any) => s.id === styleId)?.promptImage
            } frames: ${frames}`,
            templateImage: getTemplateImage(styleId),
            styleId,
          });

          setPredictions((prev) => {
            const newPredictions = [...prev];
            newPredictions[index] = prediction;
            return newPredictions;
          });

          return prediction;
        })
      );

      const allSucceeded = updatedPredictions.every(
        (pred) => pred.status === "succeeded" && pred.output?.length > 0
      );

      if (allSucceeded) {
        await saveStoryWithAllImages(updatedPredictions, title, content);
        toast.success("Story and all images saved successfully!");
      }

      setPredictions(updatedPredictions);
      onSuccess?.();
    } catch (error) {
      const errorPredictions = styleIds.map((styleId) => ({
        id: "",
        status: "failed" as const,
        output: [],
        styleId,
      }));
      setPredictions(errorPredictions);
      onError?.("Failed to generate images, please try again.");
    }
  };

  // 表单处理
  const handleGenerate = async (formData: any) => {
    if (credits <= styleIds.length) {
      onError?.("You have no enough credits. Please buy more credits.");
      return;
    }

    const { image, imageStyles, language, keyword, tone } = formData;
    console.log("--formData", formData);

    if (!imageStyles?.length) {
      onError?.("Please select styles");
      return;
    }

    try {
      const initialPredictions = imageStyles.map((styleId: string) => ({
        styleId,
        status: "processing",
      }));
      setPredictions(initialPredictions);

      const parmas = {
        language,
        keyword,
        tone: TONE_PROMPTS.find((t: any) => t.value === tone)?.prompt,
        images: image ? [image] : null,
      };

      submit(parmas);
    } catch (err) {
      console.error("handleGenerate error:", err);
      onError?.("Generation failed. Please try again.");
    }
  };

  // useObject hook
  const {
    submit,
    isLoading: isLoadingFrame,
    object,
  } = useObject({
    api: "/api/predictions/frame",
    schema: frameSchema,
    onFinish: async (result) => {
      if (result.error) {
        onError?.("Failed to generate story");
        return;
      }
      try {
        console.log(result.object, "--result.object");
        await handleFrameGeneration(result.object as FrameResponse);
      } catch (error) {
        onError?.("Failed to generate story");
      }
    },
  });

  return {
    predictions,
    story,
    object,
    isLoadingFrame,
    handleGenerate,
  };
}
