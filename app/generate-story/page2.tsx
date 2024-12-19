"use client";

import { AuthProvider } from "@/contexts/auth";
import { StoryGenerator } from "@/components/story/StoryGenerator";
import GenerationForm from "@/components/image-story/GenerationForm";
import { useState } from "react";
import GenerationResult from "@/components/image-story/GenerationResult";
import ImageGallery from "@/components/image-story/ImageGallery";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
  };

  return (
    <AuthProvider>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background">
        {/* Left Side - Form */}
        <div className="w-full lg:w-[500px] border-r border-border">
          <GenerationForm onGenerate={handleGenerate} />
        </div>

        {/* Right Side - Gallery/Result */}
        <div className="w-full lg:w-full">
          {isGenerating ? <GenerationResult /> : <ImageGallery />}
        </div>
      </div>
    </AuthProvider>
  );
}
