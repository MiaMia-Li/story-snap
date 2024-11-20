import { FormSection } from "./FormSection";
import { useStoryGeneration } from "@/hooks/useStoryGeneration";
import { StoryDisplay } from "./StoryDisplay";
import { ImageGrid } from "./ImageGrid";
import { ActionButtons } from "./ActionButtons";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";

export function StoryContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { credits } = useAuth();

  const { predictions, story, object, isLoadingFrame, handleGenerate } =
    useStoryGeneration({
      onSuccess: () => setIsLoading(false),
      onError: (msg) => {
        setError(msg);
        setIsLoading(false);
      },
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 max-w-[1200px] mx-auto pb-20 px-6">
      <div className="space-y-4">
        <FormSection
          onGenerate={(formData) => {
            setIsLoading(true);
            handleGenerate(formData);
          }}
          isLoading={isLoading}
          credits={credits}
        />
        {error && (
          <div className="text-red-500 bg-red-50 p-2 rounded-md text-center">
            {error}
          </div>
        )}
      </div>
      <div className="col-span-2">
        <StoryDisplay object={object} isLoading={isLoading} />
        <ImageGrid predictions={predictions} isLoading={isLoading} />
        <ActionButtons story={story} predictions={predictions} />
      </div>
    </div>
  );
}
