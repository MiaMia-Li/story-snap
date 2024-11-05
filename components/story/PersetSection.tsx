// components/StoryStyleConfig/index.tsx
import { useState } from "react";
import { Shuffle, Crown, Lock, Star } from "lucide-react";
import { StoryConfig } from "@/types";
import {
  LANGUAGES,
  LENGTHS,
  TONES,
  PRESETS,
  STORY_TYPES,
  STYLES,
} from "@/config/lang";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfigBadges } from "./ConfigBadges";

interface StoryStyleConfigProps {
  config: StoryConfig;
  onChange: (config: StoryConfig) => void;
  isPro?: boolean;
}

export function StoryStyleConfig({
  config,
  onChange,
  isPro = false,
}: StoryStyleConfigProps) {
  const [showProDialog, setShowProDialog] = useState(false);

  const handleRandomPreset = () => {
    const presets = Object.values(PRESETS);
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    onChange({
      ...config,
      ...randomPreset.config,
    });
  };

  const basicConfig = [
    { label: "Type", value: config.type, options: STORY_TYPES },
    { label: "Length", value: config.length, options: LENGTHS },
    { label: "Style", value: config.style, options: STYLES },
    { label: "Tone", value: config.tone, options: TONES },
    { label: "Language", value: config.language, options: LANGUAGES },
  ];

  return (
    <div className="space-y-4">
      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <ConfigBadges config={config} />
        <div className="flex items-center gap-2">
          {isPro && (
            <Badge variant="default" className="gap-1">
              <Crown className="h-3 w-3" />
              PRO
            </Badge>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRandomPreset}
            className="gap-2">
            <Shuffle className="h-4 w-4" />
            Random
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {basicConfig.map((section, index) => (
          <div key={section.label} className="flex items-center space-x-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{section.label}:</h4>
              {/* 可以添加帮助提示或其他操作 */}
            </div>

            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    option.value === section.value ? "outline" : "secondary"
                  }
                  size="sm"
                  className={cn(
                    "h-8",
                    option.value === section.value && "shadow-md"
                  )}
                  onClick={() => {
                    const key =
                      section.label.toLowerCase() as keyof StoryConfig;
                    onChange({
                      ...config,
                      [key]: option.value,
                    });
                  }}>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 高级配置提示 */}
      {!isPro && (
        <Dialog open={showProDialog} onOpenChange={setShowProDialog}>
          <DialogTrigger asChild>
            <Card
              className="p-6 border-dashed cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setShowProDialog(true)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-4 w-4" />
                  <div>
                    <h4 className="font-medium">Advanced Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Unlock advanced features with Pro
                    </p>
                  </div>
                </div>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade to Pro</DialogTitle>
              <DialogDescription>
                Get access to advanced story configuration options:
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Genre & Target Audience Settings
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Point of View & Setting Controls
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Character Development Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Theme & Mood Configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Advanced Language Settings
                  </li>
                </ul>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowProDialog(false)}>
                Maybe Later
              </Button>
              <Button>
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pro 用户的高级配置 */}
      {isPro && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <h4 className="text-sm font-medium">Advanced Configuration</h4>
            </div>

            {/* 这里添加高级配置选项 */}
            {/* ... */}
          </div>
        </Card>
      )}
    </div>
  );
}
