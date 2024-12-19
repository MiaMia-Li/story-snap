// components/generation/image-to-image-form.tsx
"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StyleSelector } from "../story/ImageStyle";
import { LanguageSelector } from "../story/LangSelector";
import ToneSelector from "../story/ToneSelector";
import { Locale } from "@/i18n/config";
import { useTranslations, useLocale } from "next-intl";
import { ImageUploader } from "./ImageUpload";

export function ImageToImageForm() {
  const [image, setImage] = useState<string | null>(null);
  // Hooks
  const t = useTranslations("generateStory");
  const [imageStyles, setImageStyles] = useState<string[]>([]);
  const [language, setLanguage] = useState<Locale>(useLocale() as Locale);
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("");
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

  const handleImageChange = (imageUrl: string | null) => {
    // 处理返回的图片URL
    console.log("Uploaded image URL:", imageUrl);
  };

  return (
    <div className="space-y-4 mx-4">
      <ImageUploader onImageChange={handleImageChange} />

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
