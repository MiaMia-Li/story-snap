"use client";

import GenerationForm from "@/components/image-story/GenerationForm";
import { useState } from "react";
import { LoginDialog } from "@/components/header/LoginDialog";
import { useStoryGeneration } from "@/hooks/useStoryGeneration";
import { toast } from "sonner";
import { StoryFormData } from "@/types";
import { ActionButtons } from "@/components/story/ActionButtons";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import StoryBox from "@/components/image-story/StoryBox";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const { predictions, story, object, handleGenerate } = useStoryGeneration({
    onSuccess: () => {
      setIsGenerating(false);
    },
    onError: (errorMsg) => {
      setIsGenerating(false);
      toast.error(errorMsg);
    },
  });

  // Create a wrapper function that adheres to the AuthContextType interface
  const handleGenerateStory = (data: StoryFormData, type: string) => {
    if (!data.imageStyles || !data.imageStyles.length) {
      toast.info("Please select image style");
      return;
    }
    if (type === "image-to-image") {
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
    setIsGenerating(true);
    handleGenerate(data);
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
                "w-full lg:w-[400px] lg:fixed lg:top-[65px] lg:bottom-0 border-r border-border overflow-hidden bg-background"
              )}>
              <GenerationForm
                isLoading={isGenerating}
                onGenerate={(data, type) => handleGenerateStory(data, type)}
              />
            </div>

            {/* Right Side - Gallery/Result */}
            <div className={cn("w-full p-6", "lg:ml-[400px]")}>
              <StoryBox
                predictions={predictions}
                isLoading={isGenerating}
                object={object}
              />
              <ActionButtons story={story} predictions={predictions} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
