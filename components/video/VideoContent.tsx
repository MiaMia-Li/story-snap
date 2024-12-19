import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { VideoForm } from "./VideoForm";
import { Video } from "lucide-react";

export function VideoContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { credits } = useAuth();

  const { prediction, video, object, isLoadingFrame, handleGenerate } =
    useVideoGeneration({
      onSuccess: () => setIsLoading(false),
      onError: (msg) => {
        toast.error(msg);
        setIsLoading(false);
      },
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 max-w-[1200px] mx-auto pb-20 px-6">
      <div className="space-y-4 mb-8 md:mb-0">
        <VideoForm
          onGenerate={(formData) => {
            // setIsLoading(true);
            handleGenerate(formData);
          }}
          isLoading={isLoading}
          credits={credits}
        />
      </div>
      <div className="col-span-2 bg-primary/5 rounded-2xl p-4 min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-muted-foreground">Generating your video...</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Your video will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
