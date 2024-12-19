import { useState, useRef, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { uploadFile } from "@/utils/image";
import { STYLE_PROMOT, TEMPLATE_IMAGES, TONE_PROMPTS } from "@/config/story";
import { FrameResponse, Prediction, StoryPayload } from "@/types";
import { useAuth } from "@/contexts/auth";
import useStyleStore from "./useStyleStore";
import { toast } from "sonner";
import { Description } from "@radix-ui/react-dialog";

// Schema 定义
const frameSchema = z.object({
  description: z.string(),
});

export function useVideoGeneration({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const video = useRef<any>(null);
  const [prediction, setPrediction] = useState({});
  const { credits, refreshCredits } = useAuth();
  const firstImg = useRef<string>();

  // 工具函数
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // API 请求相关函数
  const fetchVideo = async (payload: { prompt: string; image: string }) => {
    try {
      // 初始化预测
      const response = await fetch("/api/minivideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let prediction = await response.json();

      // 轮询状态
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const pollResponse = await fetch(`/api/minivideo/${prediction.id}`);
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

  // 核心生成逻辑
  const handleFrameGeneration = async (description: string) => {
    console.log("-handleFrameGeneration-", description);
    setPrediction({
      id: "",
      status: "processing" as const,
      output: [],
    });

    try {
      await fetchVideo({
        prompt: description,
        image: firstImg.current as string,
      });
      onSuccess?.();
    } catch (error) {
      onError?.("Failed to generate images, please try again.");
    }
  };

  // 表单处理
  const handleGenerate = async (formData: any) => {
    if (credits <= 5) {
      onError?.("You have no enough credits. Please buy more credits.");
      return;
    }

    const { images, keyword } = formData;
    console.log("-formData-", formData);
    if (!images?.length) {
      onError?.("Please reupload images");
      return;
    }
    firstImg.current = images[0].url;

    try {
      setPrediction({
        status: "processing",
      });

      submit({
        images: images.map((i: any) => i.url),
        keyword,
      });
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
    api: "/api/minivideo/frame",
    schema: frameSchema,
    onFinish: async (result) => {
      if (result.error) {
        onError?.("Failed to generate story");
        return;
      }
      try {
        await handleFrameGeneration(result.object?.description as string);
      } catch (error) {
        onError?.("Failed to generate story");
      }
    },
  });

  return {
    prediction,
    video,
    object,
    isLoadingFrame,
    handleGenerate,
  };
}
