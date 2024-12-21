"use client";

import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
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
import ImageTheme from "./ImageTheme";
import { StoryFormData } from "@/types";
import { useAuth } from "@/contexts/auth";
import useStyleStore from "@/hooks/useStyleStore";
import { useEffect } from "react";

interface TextToImageFormProps {
  onChange?: (formData: StoryFormData) => void;
}

export function TextToImageForm({ onChange }: TextToImageFormProps) {
  const t = useTranslations("generateStory");
  const defaultLocale = useLocale() as Locale;

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<StoryFormData>({
    defaultValues: {
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
      {/* Prompt Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          <span className="text-red-500">*</span> Prompt
        </label>
        <Controller
          name="keyword"
          control={control}
          rules={{
            required: "Prompt is required",
            minLength: {
              value: 3,
              message: "Prompt must be at least 3 characters",
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t("enterKeyword")}
              className="min-h-[200px]"
              onChange={(e) => {
                field.onChange(e.target.value);
                notifyChange();
              }}
            />
          )}
        />
        {errors.keyword && (
          <p className="text-sm text-destructive">{errors.keyword.message}</p>
        )}
      </div>

      {/* Image Styles */}
      <div className="space-y-2">
        <Controller
          name="imageStyles"
          control={control}
          render={({ field }) => (
            <ImageTheme
              selectedStyles={field.value}
              onStyleSelect={(styles) => {
                field.onChange(styles);
                notifyChange();
              }}
            />
          )}
        />
        {errors.imageStyles && (
          <p className="text-sm text-destructive">
            {errors.imageStyles.message}
          </p>
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
    </form>
  );
}
