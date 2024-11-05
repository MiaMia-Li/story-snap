import { LANGUAGES } from "@/config/lang";
import { Button } from "@/components/ui/button";
import { Language, StoryConfig } from "@/types";

// 添加语言选择组件
export const LanguageSelector = ({
  storyConfig,
  handleLanguageChange,
}: {
  storyConfig: StoryConfig;
  handleLanguageChange: (language: Language) => void;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium">Language:</span>
    <div className="flex gap-2">
      {LANGUAGES.map(({ value, label }) => (
        <Button
          key={value}
          variant={storyConfig.language === value ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange(value as Language)}
          className={`
              h-8 px-3 transition-all duration-200
              ${storyConfig.language === value ? "shadow-md" : ""}
            `}>
          {label}
        </Button>
      ))}
    </div>
  </div>
);
