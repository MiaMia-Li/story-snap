// components/generation/text-to-image-form.tsx
"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/contexts/auth";
import { StyleSelector } from "../story/ImageStyle";
import { useCallback, useState } from "react";
import { Locale } from "@/i18n/config";
import { LanguageSelector } from "../story/LangSelector";
import ToneSelector from "../story/ToneSelector";

export function TextToImageForm() {
  // Hooks
  const t = useTranslations("generateStory");
  const [imageStyles, setImageStyles] = useState<string[]>([]);
  const [language, setLanguage] = useState<Locale>(useLocale() as Locale);
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("friendly");
  // Constants
  const toneOptions = [
    { value: "professional", label: t("tone.professional") },
    { value: "friendly", label: t("tone.friendly") },
    { value: "humorous", label: t("tone.humorous") },
    { value: "formal", label: t("tone.formal") },
    { value: "casual", label: t("tone.casual") },
    { value: "enthusiastic", label: t("tone.enthusiastic") },
    { value: "empathetic", label: t("tone.empathetic") },
    { value: "direct", label: t("tone.direct") },
  ];
  const handleStyleChange = useCallback((styleIds: string[]) => {
    setImageStyles(styleIds);
  }, []);

  return (
    <div className="space-y-4 mx-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Prompt</label>
        <Textarea
          placeholder={t("enterKeyword")}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          className="min-h-[200px]"
        />
      </div>

      <StyleSelector
        selectedStyles={imageStyles}
        onStyleSelect={handleStyleChange}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium ">{t("storyLanguage")}</label>
        <LanguageSelector
          language={language}
          handleLanguageChange={setLanguage}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium ">{t("storyTone")}</label>
        <ToneSelector
          toneOptions={toneOptions}
          tone={tone}
          handleToneChange={setTone}
        />
      </div>
    </div>
  );
}
