// config/lang.ts
import {
  Language,
  Length,
  StoryConfig,
  Style,
  Tone,
  StoryType,
  Locale,
} from "@/types";

export const LANGUAGES = [
  { value: "en" as Locale, label: "English" },
  { value: "zh" as Locale, label: "中文" },
  // { value: "ja" as Locale, label: "日本語" },
  // { value: "ko" as Locale, label: "한국어" },
  // { value: "es" as Locale, label: "Español" },
] as const;

export const LANGUAGES_PROMPT = [
  { value: "en" as Locale, label: "English" },
  { value: "zh" as Locale, label: "中文" },
  { value: "fr" as Locale, label: "Français" },
  { value: "de" as Locale, label: "Deutsch" },
  { value: "it" as Locale, label: "Italiano" },
  { value: "ja" as Locale, label: "日本語" },
  { value: "ko" as Locale, label: "한국어" },
  { value: "es" as Locale, label: "Español" },
] as const;

// 基础配置选项
export const STORY_TYPES: { value: StoryType; label: string }[] = [
  { value: "article", label: "Article" },
  { value: "story", label: "Story" },
  { value: "poem", label: "Poem" },
  { value: "novel", label: "Novel" },
  // ... 其他类型
];

export const LENGTHS: { value: Length; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export const STYLES: { value: Style; label: string }[] = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "narrative", label: "Narrative" },
  { value: "descriptive", label: "Descriptive" },
];

export const TONES: { value: Tone; label: string }[] = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
];

// 预设模板
export const PRESETS: Record<
  string,
  {
    label: string;
    config: Partial<StoryConfig>;
  }
> = {
  professional: {
    label: "Professional Article",
    config: {
      type: "article",
      length: "medium",
      style: "formal",
      tone: "professional",
      language: "en",
    },
  },
  creative: {
    label: "Creative Story",
    config: {
      type: "story",
      length: "medium",
      style: "narrative",
      tone: "friendly",
      language: "en",
    },
  },
  humorous: {
    label: "Humorous Piece",
    config: {
      type: "article",
      length: "short",
      style: "casual",
      tone: "humorous",
      language: "en",
    },
  },
  inspirational: {
    label: "Inspirational Story",
    config: {
      type: "story",
      length: "long",
      style: "descriptive",
      tone: "inspirational",
      language: "en",
    },
  },
  technical: {
    label: "Technical Article",
    config: {
      type: "article",
      length: "medium",
      style: "formal",
      tone: "professional",
      language: "en",
      targetAudience: "developers",
      complexity: "complex",
    },
  },
  fantasy: {
    label: "Fantasy Adventure",
    config: {
      type: "story",
      length: "long",
      style: "narrative",
      tone: "friendly",
      language: "en",
      genre: "fantasy",
      setting: "medieval",
      pointOfView: "third person",
      themes: ["courage", "adventure"],
    },
  },
  childrenStory: {
    label: "Children's Story",
    config: {
      type: "story",
      length: "short",
      style: "narrative",
      tone: "friendly",
      language: "en",
      targetAudience: "children",
      themes: ["friendship", "kindness"],
      readingLevel: "beginner",
    },
  },
  sciFi: {
    label: "Sci-Fi Story",
    config: {
      type: "story",
      length: "long",
      style: "narrative",
      tone: "friendly",
      language: "en",
      genre: "sci-fi",
      setting: "futuristic",
      protagonist: "space explorer",
      antagonist: "alien species",
      themes: ["exploration", "survival"],
      complexity: "complex",
    },
  },
};
