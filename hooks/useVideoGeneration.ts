import { useState, useRef, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { TONE_PROMPTS } from "@/config/story";
import { FrameResponse, Prediction, StoryObject, StoryPayload } from "@/types";
import { useAuth } from "@/contexts/auth";
import { useQueueStore } from "./useQueueStore";
import { randomUUID } from "@/utils/uuid";
import { useSession } from "next-auth/react";
import { saveStory, updateStory } from "@/utils/story";
import { sleep } from "@/utils";

// Schema 定义
const frameSchema = z.object({
  frames: z.string(),
  title: z.string(),
  content: z.string(),
});

export function useVideoGeneration({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
  onPolling?: (id: string) => void;
}) {
  const [prediction, setPrediction] = useState({});
  const { credits, refreshCredits } = useAuth();
  const firstImg = useRef<string>();
  const { data: session } = useSession();
  const { tasks, addTask, updateTaskStatus } = useQueueStore();
  const story = useRef<any>(null);

  // API 请求相关函数
  const fetchVideo = async (payload: { prompt: string; image?: string }) => {
    try {
      // 初始化预测
      const response = await fetch("/api/minivideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let prediction = await response.json();
      addTask({
        type: "video",
        id: story.current?.storyId,
        userId: session?.user.id,
        pollingId: prediction.id,
      });

      // 轮询状态
      while (prediction.status !== "success" && prediction.status !== "fail") {
        if (!prediction.id) {
          throw new Error();
        }
        await sleep(1000);
        const pollResponse = await fetch(`/api/minivideo/${prediction.id}`);

        prediction = await pollResponse.json();

        if (pollResponse.status !== 200) {
          throw new Error(
            prediction.detail || "Error during polling prediction."
          );
        }
      }

      if (prediction.status === "fail") {
        throw new Error("Prediction generation failed.");
      }

      setPrediction(prediction);
      return prediction;
    } catch (error) {
      throw error;
    }
  };
  // Simulated video fetch with polling
  // const fetchVideo = async (payload: { prompt: string; image?: string }) => {
  //   return new Promise<Prediction>((resolve, reject) => {
  //     const randomId = randomUUID();
  //     console.log("--randomId", randomId);
  //     const mockPrediction: Prediction = {
  //       status: "succeeded",
  //       output: {
  //         video: "https://example.com/mock-video.mp4",
  //       },
  //       input: payload,
  //     };

  //     addTask({
  //       type: "video",
  //       id: story.current?.storyId,
  //       userId: session?.user.id,
  //       pollingId: randomId,
  //     });

  //     // Simulate polling
  //     const pollCount = 10;
  //     let currentPoll = 0;

  //     const pollSimulation = () => {
  //       if (currentPoll < pollCount) {
  //         updateTaskStatus(randomId, "processing");
  //         currentPoll++;
  //         setTimeout(pollSimulation, 1000);
  //       } else {
  //         updateStory(story.current.storyId, mockPrediction.output.video);
  //         setPrediction(mockPrediction);
  //         resolve(mockPrediction);
  //         updateTaskStatus(randomId, "completed");
  //       }
  //     };

  //     pollSimulation();
  //   });
  // };

  // 核心生成逻辑
  const handleFrameGeneration = async (frameResponse: FrameResponse) => {
    const { frames, title, content } = frameResponse;
    setPrediction({
      id: "",
      status: "processing" as const,
      output: {},
      input: {
        prompt: frames,
        first_frame_image: (firstImg.current as string) || "",
      },
    });

    try {
      const storyResponse = await saveStory(title, content);
      story.current = storyResponse;
      const prediction: Prediction = await fetchVideo({
        prompt: frames,
        image: (firstImg.current as string) || "",
      });
      updateStory(story.current.storyId, prediction.video);
      updateTaskStatus(prediction.id, "completed");
      onSuccess?.();
    } catch (error) {
      onError?.("Failed to generate images, please try again.");
    }
  };

  // 表单处理
  const handleGenerate = async (formData: any) => {
    if (credits < 5) {
      onError?.("You have no enough credits. Please buy more credits.");
      return;
    }

    const { image, keyword, language, tone } = formData;
    if (image) {
      firstImg.current = image;
    }

    try {
      setPrediction({
        status: "pending",
      });

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
    api: "/api/minivideo/frame",
    schema: frameSchema,
    onFinish: async (result) => {
      if (result.error) {
        onError?.("Failed to generate story");
        return;
      }
      try {
        console.log("-result-", result);
        await handleFrameGeneration(result.object as FrameResponse);
      } catch (error) {
        onError?.("Failed to generate story");
      }
    },
  });

  return {
    prediction,
    object,
    isLoadingFrame,
    handleGenerate,
  };
}
