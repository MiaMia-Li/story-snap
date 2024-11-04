// components/resume/SuggestionPanel.tsx
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";

// Types
interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "content" | "format" | "language" | "keywords";
  impact: number; // 1-100
  timeToFix: "quick" | "medium" | "long";
}

interface Section {
  id: string;
  name: string;
  type: "experience" | "education" | "skills" | "summary";
  suggestions: Suggestion[];
  score: number;
}

interface SuggestionPanelProps {
  sections: Section[];
  onOptimize: (sectionId: string, suggestionId: string) => Promise<void>;
  onHighlight: (sectionId: string) => void;
  activeSection: string | null;
}

export function SuggestionPanel({
  sections,
  onOptimize,
  onHighlight,
  activeSection,
}: SuggestionPanelProps) {
  const [optimizedSuggestions, setOptimizedSuggestions] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive border-destructive";
      case "medium":
        return "text-warning border-warning";
      case "low":
        return "text-success border-success";
      default:
        return "text-primary border-primary";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "low":
        return <Info className="h-4 w-4 text-success" />;
      default:
        return null;
    }
  };

  const getTimeToFixLabel = (timeToFix: string) => {
    switch (timeToFix) {
      case "quick":
        return "< 5 mins";
      case "medium":
        return "5-15 mins";
      case "long":
        return "> 15 mins";
      default:
        return "";
    }
  };

  const handleOptimize = useCallback(
    async (sectionId: string, suggestionId: string) => {
      const loadingKey = `${sectionId}-${suggestionId}`;

      try {
        setLoading((prev) => ({ ...prev, [loadingKey]: true }));

        await onOptimize(sectionId, suggestionId);

        setOptimizedSuggestions((prev) => new Set(prev.add(loadingKey)));
        toast.success("Successfully applied optimization");
      } catch (error) {
        toast.error("Failed to apply optimization");
        console.error("Optimization error:", error);
      } finally {
        setLoading((prev) => ({ ...prev, [loadingKey]: false }));
      }
    },
    [onOptimize]
  );

  const handleOptimizeAll = useCallback(
    async (section: Section) => {
      try {
        toast.loading("Applying all optimizations...");

        for (const suggestion of section.suggestions) {
          if (!optimizedSuggestions.has(`${section.id}-${suggestion.id}`)) {
            await handleOptimize(section.id, suggestion.id);
          }
        }

        toast.success("Successfully applied all optimizations");
      } catch (error) {
        toast.error("Failed to apply some optimizations");
        console.error("Batch optimization error:", error);
      }
    },
    [handleOptimize, optimizedSuggestions]
  );

  const SuggestionCard = ({
    section,
    suggestion,
    isOptimized,
  }: {
    section: Section;
    suggestion: Suggestion;
    isOptimized: boolean;
  }) => {
    const loadingKey = `${section.id}-${suggestion.id}`;
    const isLoading = loading[loadingKey];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}>
        <Alert
          className={`
            transition-all duration-200
            ${isOptimized ? "bg-muted/50" : ""}
            ${isLoading ? "animate-pulse" : ""}
          `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getPriorityIcon(suggestion.priority)}
              <AlertTitle className="flex items-center gap-2">
                {suggestion.title}
                <Badge
                  variant="outline"
                  className={`
                    ${getPriorityColor(suggestion.priority)}
                    transition-all duration-200
                  `}>
                  {suggestion.priority}
                </Badge>
              </AlertTitle>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getTimeToFixLabel(suggestion.timeToFix)}
              </Badge>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant={isOptimized ? "ghost" : "default"}
                    onClick={() => handleOptimize(section.id, suggestion.id)}
                    disabled={isOptimized || isLoading}
                    className={isLoading ? "animate-pulse" : ""}>
                    {isOptimized ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}>
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isOptimized
                    ? "Already optimized"
                    : isLoading
                    ? "Optimizing..."
                    : "Apply optimization"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <p>{suggestion.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  Impact: {suggestion.impact}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Category: {suggestion.category}
                </Badge>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-6">
        <AnimatePresence>
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}>
              <Card
                className={`
                  transition-all duration-200
                  ${activeSection === section.id ? "ring-2 ring-primary" : ""}
                  hover:shadow-lg
                `}
                onMouseEnter={() => onHighlight(section.id)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      <Badge variant="outline">Score: {section.score}%</Badge>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOptimizeAll(section)}
                          disabled={section.suggestions.every((s) =>
                            optimizedSuggestions.has(`${section.id}-${s.id}`)
                          )}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Optimize All
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Apply all remaining optimizations
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-4">
                    {section.suggestions
                      .sort((a, b) => {
                        const priorityOrder = {
                          high: 3,
                          medium: 2,
                          low: 1,
                        };
                        return (
                          priorityOrder[b.priority] - priorityOrder[a.priority]
                        );
                      })
                      .map((suggestion) => (
                        <SuggestionCard
                          key={suggestion.id}
                          section={section}
                          suggestion={suggestion}
                          isOptimized={optimizedSuggestions.has(
                            `${section.id}-${suggestion.id}`
                          )}
                        />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
