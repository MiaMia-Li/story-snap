import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function PageHeader() {
  const t = useTranslations("");

  return (
    <div className="text-center max-w-2xl mx-auto mb-8">
      <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        {t("generateStory.title")}
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("generateStory.title2")}
        </span>
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t("generateStory.description")}
      </p>
    </div>
  );
}
