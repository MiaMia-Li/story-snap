import { UploadSection } from "@/components/story/UploadSection";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background p-6">
      <div className="text-center space-y-6 py-8">
        {/* 主标题 */}
        <div className="space-y-2">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                Transform
              </span>{" "}
              <span
                className="bg-gradient-to-r from-primary/90 to-primary/70 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                Your Images
              </span>
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-2">
              <span
                className="bg-gradient-to-r from-primary/80 to-primary/60 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                into Stories
              </span>
            </h1>
          </div>
        </div>

        {/* 副标题 */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Upload an image and watch as AI transforms it into a captivating
            story,{" "}
            <span className="text-primary font-medium">uniquely crafted</span>{" "}
            just for you
          </p>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>
        </div>
      </div>

      <UploadSection />
    </main>
  );
}
