import { Feature } from "@/types";
import { ChartLine, FileSearch } from "lucide-react";

import { Sparkles } from "lucide-react";

export const RESUME_ANALYSIS_PATH = "/resume-analysis";

export const features = [
  {
    title: "Smart Resume Analysis",
    description:
      "Leverage advanced AI technology to deeply analyze your resume content, identify key strengths and potential improvements, ensuring your resume stands out in applicant tracking systems.",
    // image: "/images/resume-analysis.png", // 需要添加对应图片
    alt: "AI Resume Analysis",
  },
  {
    title: "Industry Insights Matching",
    description:
      "Intelligently match job requirements based on real-time industry data, automatically optimize keywords and skill descriptions to increase your resume's relevance to target positions.",
    // image: "/images/industry-match.png", // 需要添加对应图片
    alt: "Industry Insights",
  },
  {
    title: "Personalized Optimization",
    description:
      "Receive professional wording improvements and content organization suggestions to make your professional experience more compelling, helping you create a unique and competitive resume.",
    // image: "/images/personalized-suggestions.png", // 需要添加对应图片
    alt: "Personalized Optimization",
  },
];

// 常量
export const FEATURES: Feature[] = [
  {
    icon: FileSearch,
    title: "Smart Analysis",
    description: "Advanced AI algorithms analyze your resume content",
  },
  {
    icon: ChartLine,
    title: "Detailed Insights",
    description: "Get comprehensive feedback on your professional profile",
  },
  {
    icon: Sparkles,
    title: "Recommendations",
    description: "Receive personalized suggestions for improvement",
  },
];
