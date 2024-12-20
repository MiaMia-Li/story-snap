"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { TextToImageForm } from "./TextToImageForm";
import { ImageToImageForm } from "./ImageToImageForm";
import { useAuth } from "@/contexts/auth";
import { StoryFormData } from "@/types";
import { useStoryGeneration } from "@/hooks/useStoryGeneration";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { Wand2, Image as ImageIcon, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface GenerationFormProps {
  onGenerate: (data: StoryFormData) => void;
  isLoading: boolean;
}

export default function GenerationForm({
  onGenerate,
  isLoading,
}: GenerationFormProps) {
  const { credits } = useAuth();
  const [formData, setFormData] = useState<StoryFormData>({
    language: useLocale(),
    tone: "friendly",
    keyword: "",
    imageStyles: [],
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentCost = useMemo(() => {
    return formData?.imageStyles.length || 0;
  }, [formData]);

  const handleFormChange = (formData: StoryFormData) => {
    setFormData(formData);
    console.log("Form data changed:", formData);
  };

  return (
    <>
      <Tabs
        defaultValue="text-to-image"
        className="flex flex-col h-full"
        onValueChange={() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }}>
        {/* Fixed Header */}
        <div className="flex-none">
          <div className="px-6 pt-4">
            <TabsList className="w-full h-11 grid grid-cols-2 bg-muted">
              <TabsTrigger value="text-to-image">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Text to Image</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="image-to-image">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Image to Image</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 py-4">
            <TabsContent
              value="text-to-image"
              className="mt-0 data-[state=inactive]:hidden">
              <TextToImageForm onChange={handleFormChange} />
            </TabsContent>
            <TabsContent
              value="image-to-image"
              className="mt-0 data-[state=inactive]:hidden">
              <ImageToImageForm onChange={handleFormChange} />
            </TabsContent>
          </div>
        </div>

        {/* Fixed Bottom */}
        <div className="flex-none bg-background shadow-md">
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Cost:</span>
                <span className="font-medium text-primary">
                  {currentCost} credits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span className="font-medium text-primary">
                  {credits} credits
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                if (!formData) return;
                onGenerate(formData);
              }}
              className="w-full"
              variant="default"
              disabled={currentCost > credits || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>

            {currentCost > credits && (
              <p className="text-xs text-destructive text-center">
                Insufficient credits. You need {currentCost - credits} more
                credits.
              </p>
            )}
          </div>
        </div>
      </Tabs>
    </>
  );
}
