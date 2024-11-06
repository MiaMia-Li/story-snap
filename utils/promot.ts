// utils/promptGenerator.ts

import { StoryConfig } from "@/types";
// 定义每个配置项的提示语模板
const PROMPT_TEMPLATES = {
  type: {
    article: "Write an article",
    story: "Write a short story",
    poem: "Compose a poem",
    novel: "Write a novel",
  },
  length: {
    short: "Keep it concise and brief, about 100 words",
    medium: "Use a moderate length, about 300 words",
    long: "Make it detailed and comprehensive, about 500 words",
  },
  style: {
    casual: "in a relaxed and informal style",
    formal: "in a formal and structured way",
    narrative: "using narrative storytelling",
    descriptive: "with rich descriptions",
  },
  tone: {
    friendly: "maintaining a warm and approachable tone",
    professional: "keeping a professional and authoritative voice",
    humorous: "incorporating humor and wit",
    inspirational: "with an uplifting and motivational message",
  },
  language: {
    en: "in English",
    es: "in Spanish",
    fr: "in French",
    zh: "in Chinese",
    ja: "in Japanese",
    ko: "in Korean",
  },
  // 高级配置项的模板
  genre: (value: string) => `in the ${value} genre`,
  targetAudience: (value: string) => `targeted at ${value}`,
  pointOfView: {
    "first person": "written from a first-person perspective",
    "third person": "written from a third-person perspective",
    omniscient: "written from an omniscient perspective",
  },
  setting: (value: string) => `set in a ${value} environment`,
  protagonist: (value: string) => `featuring a protagonist who is ${value}`,
  antagonist: (value: string) => `with an antagonist who is ${value}`,
  themes: (values: string[]) => `exploring themes of ${values.join(", ")}`,
  complexity: {
    simple: "using simple and clear language",
    moderate: "with moderate complexity",
    complex: "using sophisticated language and complex ideas",
  },
  mood: (value: string) => `conveying a ${value} mood`,
  keywords: (values: string[]) =>
    `incorporating these key elements: ${values.join(", ")}`,
  formality: {
    informal: "in a casual and conversational manner",
    neutral: "maintaining a balanced tone",
    formal: "with proper formality",
  },
  dialect: (value: string) => `using ${value} dialect`,
  readingLevel: {
    beginner: "suitable for beginners",
    intermediate: "appropriate for intermediate readers",
    advanced: "targeted at advanced readers",
  },
};

export function generatePrompt(config: StoryConfig): string {
  const promptParts: string[] = [];

  // 添加基础配置
  promptParts.push(PROMPT_TEMPLATES.type[config.type]);
  promptParts.push(PROMPT_TEMPLATES.length[config.length]);
  promptParts.push(PROMPT_TEMPLATES.style[config.style]);
  promptParts.push(PROMPT_TEMPLATES.tone[config.tone]);
  promptParts.push(PROMPT_TEMPLATES.language[config.language]);

  // 添加高级配置（如果存在）
  if (config.genre) {
    promptParts.push(PROMPT_TEMPLATES.genre(config.genre));
  }
  if (config.targetAudience) {
    promptParts.push(PROMPT_TEMPLATES.targetAudience(config.targetAudience));
  }
  if (config.pointOfView) {
    promptParts.push(PROMPT_TEMPLATES.pointOfView[config.pointOfView]);
  }
  if (config.setting) {
    promptParts.push(PROMPT_TEMPLATES.setting(config.setting));
  }
  if (config.protagonist) {
    promptParts.push(PROMPT_TEMPLATES.protagonist(config.protagonist));
  }
  if (config.antagonist) {
    promptParts.push(PROMPT_TEMPLATES.antagonist(config.antagonist));
  }
  if (config.themes?.length) {
    promptParts.push(PROMPT_TEMPLATES.themes(config.themes));
  }
  if (config.complexity) {
    promptParts.push(PROMPT_TEMPLATES.complexity[config.complexity]);
  }
  if (config.mood) {
    promptParts.push(PROMPT_TEMPLATES.mood(config.mood));
  }
  if (config.keywords?.length) {
    promptParts.push(PROMPT_TEMPLATES.keywords(config.keywords));
  }
  if (config.formality) {
    promptParts.push(PROMPT_TEMPLATES.formality[config.formality]);
  }
  if (config.dialect) {
    promptParts.push(PROMPT_TEMPLATES.dialect(config.dialect));
  }
  if (config.readingLevel) {
    promptParts.push(PROMPT_TEMPLATES.readingLevel[config.readingLevel]);
  }

  // 组合所有部分并添加标点符号
  return promptParts.join(", ") + ".";
}
