import { StoryObject } from "@/types";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

interface StoryDisplayProps {
  object: StoryObject | undefined;
  isLoading: boolean;
}

export function StoryDisplay({ object, isLoading }: StoryDisplayProps) {
  const t = useTranslations("");

  return (
    <div className="space-y-8 mb-10">
      <div className="p-6 rounded-xl border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">
            {t("generateStory.yourStory")}
          </h3>
        </div>

        {isLoading && !object?.content && (
          <div className="text-center py-4">
            <p className="text-muted-foreground animate-pulse">
              {t("generateStory.waiting")}
            </p>
          </div>
        )}

        {(object?.content || object?.title) && (
          <div className="space-y-3">
            <h6 className="font-semibold text-foreground">{object?.title}</h6>
            <p className="text-muted-foreground leading-relaxed">
              {object?.content}
            </p>
          </div>
        )}

        {!object?.content && !isLoading && (
          <div className="space-y-3 py-2">
            <div className="h-4 bg-border rounded-full animate-pulse w-3/4" />
            <div className="h-4 bg-border rounded-full animate-pulse w-1/2" />
            <div className="h-4 bg-border rounded-full animate-pulse w-2/3" />
          </div>
        )}
      </div>
    </div>
  );
}
