// utils/promptGenerator.ts

import { StoryConfig } from "@/types";
// 定义每个配置项的提示语模板
const PROMPT_TEMPLATES = {
  type: {
    article:
      "Write an article. This should be a well-structured piece with clear introduction, body paragraphs, and conclusion. Include relevant facts, examples, and supporting evidence to make your points",

    story:
      "Write a short story. Create a compelling narrative with developed characters, engaging plot, clear setting, and meaningful conflict. Include dialogue and descriptive elements to bring the story to life",

    poem: "Compose a poem. Focus on creating rhythmic and evocative verses that capture emotions and imagery. Consider using literary devices such as metaphor, simile, and personification to enhance the poetic expression",

    novel:
      "Write a novel. Develop a complex narrative with multiple plot threads, well-developed characters, detailed world-building, and engaging dialogue. Include character arcs, plot twists, and thematic elements",
  },

  length: {
    short:
      "Keep it concise and brief, about 100 words. Focus on the most essential points while maintaining clarity and coherence. Every word should serve a purpose, avoiding unnecessary elaboration or redundant information",

    medium:
      "Use a moderate length, about 300 words. This allows for sufficient detail and explanation while maintaining reader engagement. Balance depth with conciseness, providing enough context and examples to support your main points",

    long: "Make it detailed and comprehensive, about 500 words. Take time to fully explore the topic, providing in-depth analysis, multiple examples, and thorough explanations. Include relevant background information, supporting evidence, and detailed discussions of key points",

    brief:
      "Provide a quick overview in about 50 words. Capture only the most crucial elements, focusing on core messages and key takeaways. Use precise language to convey maximum information in minimum words",

    extensive:
      "Create an in-depth exploration of about 1000 words. This length allows for comprehensive coverage including detailed analysis, multiple perspectives, extensive examples, and thorough discussion of implications and applications",
  },

  style: {
    casual:
      "Write in a relaxed and informal style, as if having a conversation with a friend. Use everyday language, personal anecdotes, and a friendly tone. Feel free to include colloquialisms and casual expressions where appropriate",

    formal:
      "Maintain a formal and structured approach, using professional language and proper academic conventions. Avoid colloquialisms, employ sophisticated vocabulary, and follow standard writing conventions. Present information in a logical and organized manner",

    narrative:
      "Employ narrative storytelling techniques, creating a flowing account that engages readers. Include character development, plot progression, and scene-setting details. Use narrative devices such as foreshadowing, flashbacks, and perspective shifts where appropriate",

    descriptive:
      "Focus on rich, vivid descriptions that paint a detailed picture in the reader's mind. Use sensory details, figurative language, and careful word choice to create immersive and engaging content. Emphasize showing rather than telling",
  },

  tone: {
    friendly:
      "Maintain a warm and approachable tone throughout the piece. Use inclusive language, show empathy, and create a welcoming atmosphere. Write as if speaking to a trusted friend while maintaining appropriate professionalism",

    professional:
      "Adopt a professional and authoritative voice that demonstrates expertise and credibility. Use clear, precise language and maintain an appropriate level of formality. Support statements with evidence and maintain objectivity",

    humorous:
      "Incorporate appropriate humor and wit to engage readers while maintaining the message's integrity. Use clever wordplay, amusing observations, and light-hearted examples where suitable. Balance humor with informative content",

    inspirational:
      "Create content that motivates and uplifts readers. Include encouraging messages, positive examples, and empowering language. Share success stories, provide actionable insights, and maintain an optimistic perspective",
  },

  language: {
    en: "Write in English, following standard English grammar and usage conventions. Use clear and precise language appropriate for the target audience. Consider regional variations and cultural context when relevant",

    es: "Escribir en español, siguiendo las convenciones gramaticales y de uso del español estándar. Utilizar un lenguaje claro y preciso, apropiado para la audiencia objetivo. Considerar variaciones regionales y contexto cultural cuando sea relevante",

    fr: "Rédiger en français, en respectant les conventions grammaticales et d'usage du français standard. Utiliser un langage clair et précis, adapté au public cible. Tenir compte des variations régionales et du contexte culturel le cas échéant",

    zh: "用中文写作，遵循标准中文语法和用法规范。使用清晰准确的语言，适合目标受众。在相关时考虑地区差异和文化背景",

    ja: "日本語で書き、標準的な日本語の文法と使用規則に従う。対象読者に適した明確で正確な言葉を使用する。必要に応じて地域の違いや文化的背景を考慮する",

    ko: "한국어로 작성하며, 표준 한국어 문법과 사용 규칙을 따름. 대상 독자에게 적합한 명확하고 정확한 언어를 사용. 필요한 경우 지역적 차이와 문화적 배경을 고려",
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
  console.log("--config", config);

  // 添加基础配置
  promptParts.push(PROMPT_TEMPLATES.type[config.type]);
  promptParts.push(PROMPT_TEMPLATES.style[config.style]);
  promptParts.push(PROMPT_TEMPLATES.tone[config.tone]);
  promptParts.push(PROMPT_TEMPLATES.language[config.language]);
  promptParts.push(PROMPT_TEMPLATES.length[config.length]);

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
