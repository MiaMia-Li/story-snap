import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ShuffleIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import useStyleStore from "@/hooks/useStyleStore";
const MAX_SELECTIONS = 4; // 定义最大选择数量
import { STYLE_OPTIONS } from "@/config/imgStyle";

export function StyleSelector({
  selectedStyles,
  onStyleSelect,
}: {
  selectedStyles: string[];
  onStyleSelect: (styleIds: string[]) => void;
}) {
  const t = useTranslations("generateStory");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setStyleIds } = useStyleStore();
  const [hasOverflow, setHasOverflow] = useState(false);
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setHasOverflow(scrollHeight > clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [STYLE_OPTIONS]);
  const handleStyleClick = (styleId: string) => {
    let newSelectedStyles: string[];

    if (selectedStyles.includes(styleId)) {
      newSelectedStyles = selectedStyles.filter((id) => id !== styleId);
    } else {
      if (selectedStyles.length >= MAX_SELECTIONS) {
        return;
      }
      newSelectedStyles = [...selectedStyles, styleId];
    }

    onStyleSelect(newSelectedStyles);
    setStyleIds(newSelectedStyles);
  };

  const handleRandomStyle = () => {
    const numSelections = Math.floor(Math.random() * MAX_SELECTIONS) + 1;
    const shuffled = [...STYLE_OPTIONS].sort(() => 0.5 - Math.random());
    const randomStyles = shuffled
      .slice(0, numSelections)
      .map((style) => style.id);
    onStyleSelect(randomStyles);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span>{t("imageStyle")}</span>
          </h3>
          <span className="text-sm text-muted-foreground">(up to 4)</span>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleRandomStyle} variant="outline">
            <ShuffleIcon className="w-4 h-4 mr-2" />
            {t("random")}
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
          {STYLE_OPTIONS.map((style: any) => {
            const isSelected = selectedStyles.includes(style.id);
            const isDisabled =
              !isSelected && selectedStyles.length >= MAX_SELECTIONS;

            return (
              <div
                key={style.id}
                onClick={() => !isDisabled && handleStyleClick(style.id)}
                className={`
                  relative rounded-lg overflow-hidden cursor-pointer
                  transition-all duration-200 transform
                  ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[1.02]"
                  }
                  ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                  }
                `}>
                <div className="relative aspect-square w-full">
                  <Image
                    src={style.thumbnail}
                    alt={style.id}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-sm text-white font-medium">
                    {t(style.name)}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Scroll Indicator */}
        {hasOverflow && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent h-10 pointer-events-none">
            <div className="flex flex-col items-center gap-1"></div>
          </div>
        )}
      </div>
    </div>
  );
}
