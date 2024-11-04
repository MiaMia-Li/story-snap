// app/(dashboard)/optimization/page.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SuggestionPanel } from "./SuggestionPanel";
import { BestPractices } from "./BestPractices";
import { AIRewrite } from "./AIRewrite";
import { KeywordOptimizer } from "./KeywordOptimizer";
import { Sparkles, FileText, BookOpen, Bot, Key } from "lucide-react";

// Types
interface ResumeAnalysis {
  totalScore: number;
  scoreCategories: Array<{
    name: string;
    score: number;
  }>;
  sections: Array<{
    id: string;
    name: string;
    suggestions: Array<{
      title: string;
      description: string;
      priority: "high" | "medium" | "low";
    }>;
  }>;
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    education: string;
    summary?: string;
  };
  workExperience: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
    achievements?: string[];
  }>;
  skills: string[];
}

interface OptimizationPageProps {
  analysisData: ResumeAnalysis;
}

export default function OptimizationPage({
  analysisData,
}: OptimizationPageProps) {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [optimizedSections, setOptimizedSections] = useState<Set<string>>(
    new Set()
  );
  const resumeContentRef = useRef<HTMLDivElement>(null);

  // 将函数定义移到前面
  const handleSectionOptimize = useCallback(
    (sectionId: string, suggestionIndex: number) => {
      setOptimizedSections(
        (prev) => new Set(prev.add(`${sectionId}-${suggestionIndex}`))
      );
    },
    []
  );

  const handleSectionHighlight = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const sectionElement = resumeContentRef.current?.querySelector(
      `[data-section-id="${sectionId}"]`
    );
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // 定义tabItems
  const tabItems = [
    {
      value: "suggestions",
      label: "Suggestions",
      icon: FileText,
      component: (
        <SuggestionPanel
          sections={analysisData.sections}
          onOptimize={handleSectionOptimize}
          onHighlight={handleSectionHighlight}
          activeSection={activeSection}
        />
      ),
    },
    // {
    //   value: "bestPractices",
    //   label: "Best Practices",
    //   icon: BookOpen,
    //   component: (
    //     <BestPractices scoreCategories={analysisData.scoreCategories} />
    //   ),
    // },
    {
      value: "aiRewrite",
      label: "AI Rewrite",
      icon: Bot,
      component: <AIRewrite workExperience={analysisData.workExperience} />,
    },
    // {
    //   value: "keywords",
    //   label: "Keywords",
    //   icon: Key,
    //   component: <KeywordOptimizer skills={analysisData.skills} />,
    // },
  ];

  const ResumeSection = useCallback(
    ({
      section,
      isActive,
      children,
    }: {
      section: ResumeAnalysis["sections"][0];
      isActive: boolean;
      children: React.ReactNode;
    }) => (
      <motion.div
        data-section-id={section.id}
        className={`
        p-4 rounded-lg mb-4 transition-all duration-200
        ${isActive ? "ring-2 ring-primary bg-primary/5" : "bg-card"}
      `}
        animate={{
          scale: isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{section.name}</h3>
          {optimizedSections.has(section.id) && (
            <Badge variant="outline">
              <Sparkles className="w-4 h-4 mr-1" />
              Optimized
            </Badge>
          )}
        </div>
        {children}
      </motion.div>
    ),
    [optimizedSections]
  );

  const BasicInfoSection = () => {
    return (
      <div>
        {" "}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {analysisData.basicInfo.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {analysisData.basicInfo.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {analysisData.basicInfo.phone}
            </p>
            <p>
              <span className="font-medium">Education:</span>{" "}
              {analysisData.basicInfo.education}
            </p>
            {analysisData.basicInfo.summary && (
              <p>
                <span className="font-medium">Summary:</span>{" "}
                {analysisData.basicInfo.summary}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SkillsSection = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysisData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Resume Content */}
      <div className="w-1/2 p-6">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Resume Overview</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Overall Score
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-lg">
                      {analysisData.totalScore}%
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Based on {analysisData.scoreCategories.length} categories
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Progress value={analysisData.totalScore} className="mt-2" />
          </CardHeader>
          <CardContent>
            <ScrollArea
              className="h-[calc(100vh-12rem)]"
              ref={resumeContentRef}>
              {/* Basic Info Section */}

              {/* Sections */}
              <AnimatePresence>
                {analysisData.sections.map((section) => (
                  <ResumeSection
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                  />
                ))}
              </AnimatePresence>

              {/* Skills Section */}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Optimization Tools */}
      <div className="w-1/2 p-6">
        <Tabs
          defaultValue="suggestions"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-sm">
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabItems.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <Card>
                <CardContent className="p-6">{tab.component}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
