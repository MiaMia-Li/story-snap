import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// subcriptions
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    isPro: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
    credits?: number;
    level?: string;
    planId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
  };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & {
  [key in (typeof plansColumns)[number]]: ColumnType;
};

export type StoryType = "article" | "story" | "poem" | "novel";
export type Length = "short" | "medium" | "long";
export type Style = "casual" | "formal" | "narrative" | "descriptive";
export type Tone = "friendly" | "professional" | "humorous" | "inspirational";
export type Language = "en" | "es" | "fr" | "zh" | "de"; // 根据需要扩展语言代码

export interface StoryConfig {
  type: StoryType; // 类型：必填，例如 article, short story, poem 等
  length: Length; // 长度：必填，例如 short, medium, long
  style: Style; // 风格：必填，例如 casual, formal, narrative, descriptive
  tone: Tone; // 语气：必填，例如 friendly, professional, humorous, inspirational
  language: Language; // 语言：必填，例如 en, es, fr, zh 等

  // 可选配置项
  genre?: string; // 体裁：如 fantasy, sci-fi 等
  targetAudience?: string; // 目标读者：如 children, teens, adults
  pointOfView?: "first person" | "third person" | "omniscient"; // 叙述角度
  setting?: string; // 背景设定：如 modern, historical 等
  protagonist?: string; // 主角描述
  antagonist?: string; // 反派描述
  themes?: string[]; // 主题：如 friendship, courage 等
  complexity?: "simple" | "moderate" | "complex"; // 复杂性
  mood?: string; // 情绪
  keywords?: string[]; // 关键词
  formality?: "informal" | "neutral" | "formal"; // 正式度
  dialect?: string; // 方言：如 American English, British English
  explicitContent?: boolean; // 是否包含敏感内容
  readingLevel?: "beginner" | "intermediate" | "advanced"; // 阅读水平
}

// types/auth.ts
export interface AuthContextType {
  showLoginDialog: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  requireAuth: (callback: () => void) => void;
  credits: number;
  updateCredits: (newCredits: number) => void;
  refreshCredits: () => void;
}

export interface Prediction {
  status?: "starting" | "processing" | "succeeded" | "failed";
  output: string[];
  error?: string;
  styleId: string;
  [key: string]: any;
}

export interface StoryPayload {
  title: string;
  content: string;
  image: string;
  count: number;
  additionalImages?: string[];
  styleIds?: string[];
}

export interface FrameResponse {
  frames: string;
  title: string;
  content: string;
}

export interface StoryObject {
  title?: string;
  content?: string;
  frames?: string;
}
