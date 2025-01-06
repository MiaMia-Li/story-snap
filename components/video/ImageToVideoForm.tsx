"use client";

import { useForm, Controller } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LANGUAGES_PROMPT } from "@/config/lang";
import { StoryFormData } from "@/types";
import ImageUpload from "../common/ImageUpload";
import { Textarea } from "../ui/textarea";

interface ImageToImageFormProps {
  onChange?: (formData: StoryFormData) => void;
}

export function ImageToVideoForm({ onChange }: ImageToImageFormProps) {
  const t = useTranslations("generateStory");
  const defaultLocale = useLocale() as Locale;

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<StoryFormData>({
    defaultValues: {
      image: null,
      keyword: "",
      imageStyles: [],
      language: defaultLocale,
      tone: "friendly",
    },
  });

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

  // 使用 Controller 的 onChange 来触发父组件更新
  const notifyChange = () => {
    const currentValues = getValues();
    onChange?.(currentValues);
  };

  return (
    <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          <span className="text-red-500">*</span> Upload Image
        </label>
        <Controller
          name="image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field }) => (
            <ImageUpload
              onImageChange={(imageUrl) => {
                field.onChange(imageUrl);
                notifyChange();
              }}
            />
          )}
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
      </div>

      {/* Language Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t("storyLanguage")}</label>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                notifyChange();
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES_PROMPT.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Tone Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t("storyTone")}</label>
        <Controller
          name="tone"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                notifyChange();
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {/* Optional Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Additional Prompt (Optional)
        </label>
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t("enterKeyword")}
              className="min-h-[100px]"
              onChange={(e) => {
                field.onChange(e.target.value);
                notifyChange();
              }}
            />
          )}
        />
      </div>
    </form>
  );
}
