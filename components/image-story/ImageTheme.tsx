import { CheckIcon, ShuffleIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import useStyleStore from "@/hooks/useStyleStore";
import { STYLE_OPTIONS } from "@/config/imgStyle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth";

const MAX_SELECTIONS = 3;

export default function ImageTheme({
  selectedStyles,
  onStyleSelect,
}: {
  selectedStyles: string[];
  onStyleSelect: (styleIds: string[]) => void;
}) {
  const t = useTranslations("generateStory");
  const { setStyleIds } = useStyleStore();

  const { requireAuth } = useAuth();

  const handleStyleClick = (styleId: string) => {
    if (selectedStyles.includes(styleId)) {
      const newStyles = selectedStyles.filter((id) => id !== styleId);
      onStyleSelect(newStyles);
      setStyleIds(newStyles);
    } else if (selectedStyles.length < MAX_SELECTIONS) {
      const newStyles = [...selectedStyles, styleId];
      onStyleSelect(newStyles);
      setStyleIds(newStyles);
    }
  };

  const handleRandomStyle = () => {
    const numSelections = Math.floor(Math.random() * MAX_SELECTIONS) + 1;
    const randomStyles = [...STYLE_OPTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, numSelections)
      .map((style) => style.id);
    onStyleSelect(randomStyles);
    setStyleIds(randomStyles);
  };

  useEffect(() => {
    return () => {
      setStyleIds([]);
    };
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500">*</span>
            <span className="font-medium">{t("imageStyle")}</span>
            <span className="text-muted-foreground">
              ({selectedStyles.length}/{MAX_SELECTIONS})
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t("imageStyleGuide")}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {STYLE_OPTIONS.map((style) => (
                  <div key={style.id} className="space-y-2">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      {style.thumbnail && (
                        <Image
                          src={style.thumbnail}
                          alt={style.id}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{t(style.name)}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t(`${style.description}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button
          onClick={() => requireAuth(() => handleRandomStyle())}
          variant="ghost"
          size="sm"
          className="h-7 text-xs">
          <ShuffleIcon className="w-3 h-3 mr-1" />
          {t("random")}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {STYLE_OPTIONS.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          const isDisabled =
            !isSelected && selectedStyles.length >= MAX_SELECTIONS;

          return (
            <button
              key={style.id}
              onClick={() =>
                requireAuth(() => {
                  !isDisabled && handleStyleClick(style.id);
                })
              }
              disabled={isDisabled}
              className={`
                group relative h-10 px-4
                rounded-md border transition-all duration-200
                flex items-center justify-between
                ${
                  isDisabled
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:border-primary hover:bg-primary/5 hover:text-primary"
                }
                ${
                  isSelected
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted-foreground/20 hover:border-muted-foreground/40"
                }
              `}>
              <span className="text-sm font-medium">{t(style.name)}</span>
              {isSelected && (
                <CheckIcon className="h-4 w-4 text-primary shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
