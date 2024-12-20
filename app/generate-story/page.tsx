"use client";

import { AuthProvider } from "@/contexts/auth";
import { StoryGenerator } from "@/components/story/StoryGenerator";
import GenerationForm from "@/components/image-story/GenerationForm";
import { useState } from "react";
import GenerationResult from "@/components/image-story/GenerationResult";
import ImageGallery from "@/components/image-story/ImageGallery";
import { LoginDialog } from "@/components/header/LoginDialog";
import { useStoryGeneration } from "@/hooks/useStoryGeneration";
import { toast } from "sonner";
import { StoryFormData } from "@/types";
import { StoryDisplay } from "@/components/story/StoryDisplay";
import { ImageGrid } from "@/components/story/ImageGrid";
import { ActionButtons } from "@/components/story/ActionButtons";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import StoryContent from "@/components/image-story/StoryBox";
import StoryBox from "@/components/image-story/StoryBox";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // State to track sidebar expansion

  const { predictions, story, object, isLoadingFrame, handleGenerate } =
    useStoryGeneration({
      onSuccess: () => setIsGenerating(false),
      onError: (msg) => {
        toast.error(msg);
        setIsGenerating(false);
      },
    });

  const handleGenerateStory = (data: StoryFormData) => {
    console.log("--data", data);
    handleGenerate(data);
    setIsGenerating(true);
  };

  // Function to handle sidebar toggle
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <div className="flex">
      <Sidebar onToggle={handleSidebarToggle} className="hidden lg:flex" />
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarExpanded ? "lg:ml-64" : "lg:ml-16"
        )}>
        <AuthProvider>
          <LoginDialog />
          <div className="flex flex-col lg:flex-row relative">
            <div
              className={cn(
                "w-full lg:w-[400px] lg:fixed lg:top-[65px] lg:bottom-0 border-r border-border overflow-hidden bg-background"
              )}>
              <GenerationForm
                isLoading={isGenerating}
                onGenerate={(data) => handleGenerateStory(data)}
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
        </AuthProvider>
      </main>
    </div>
  );
}
