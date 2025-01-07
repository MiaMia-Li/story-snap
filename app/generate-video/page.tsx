"use client";

import { useState } from "react";
import { LoginDialog } from "@/components/header/LoginDialog";
import { toast } from "sonner";
import { StoryFormData } from "@/types";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import GenerationForm from "@/components/video/GenerationForm";
import StoryBox from "@/components/video/StoryBox";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import { QueuePanel } from "@/components/common/QueuePanel";
import { randomUUID } from "@/utils/uuid";
import { useSession } from "next-auth/react";
import { useQueueStore } from "@/hooks/useQueueStore";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { tasks } = useQueueStore();

  const { prediction, object, isLoadingFrame, handleGenerate } =
    useVideoGeneration({
      onSuccess: () => setIsGenerating(false),
      onError: (msg) => {
        toast.error(msg);
        setIsGenerating(false);
      },
    });

  // Create a wrapper function that adheres to the AuthContextType interface
  const handleGenerateStory = async (data: StoryFormData, type: string) => {
    if (type === "image-to-video") {
      if (!data.image) {
        toast.info("Please upload image");
        return;
      }
    } else {
      if (!data.keyword) {
        toast.info("Please input promot");
        return;
      }
    }
    const queueTasks =
      tasks &&
      tasks.length > 0 &&
      tasks.filter(
        (task) => task.status === "pending" || task.status === "processing"
      );
    if (queueTasks && queueTasks.length >= 3) {
      toast.info("Maximum concurrent tasks reached");
      return;
    }

    handleGenerate(data);
    setIsGenerating(true);
  };

  // Function to handle sidebar toggle
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <>
      <LoginDialog />
      <div className="flex">
        <Sidebar onToggle={handleSidebarToggle} className="hidden lg:flex" />
        <main
          className={cn(
            "flex-1 transition-all duration-200",
            isSidebarExpanded ? "lg:ml-64" : "lg:ml-16"
          )}>
          <div className="flex flex-col lg:flex-row relative">
            <div
              className={cn(
                "w-full lg:w-[350px] lg:fixed lg:top-[65px] lg:bottom-0 border-r border-border overflow-hidden bg-background"
              )}>
              <GenerationForm
                isLoading={isGenerating}
                onGenerate={(data, type) => handleGenerateStory(data, type)}
              />
            </div>

            {/* Right Side - Gallery/Result */}
            <div className={cn("w-full p-6", "lg:ml-[350px]")}>
              <StoryBox
                prediction={prediction}
                isLoading={isGenerating}
                object={object}
              />
              {/* <ActionButtons story={story} predictions={predictions} /> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
