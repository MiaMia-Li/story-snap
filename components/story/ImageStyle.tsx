// import { STYLE_PRESETS } from "@/config/story";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ShuffleIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function StyleSelector({
  styleOptions,
  selectedStyle,
  onStyleSelect,
}: {
  styleOptions: any[];
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}) {
  const t = useTranslations("generateStory");
  const [hasOverflow, setHasOverflow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if content overflows
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
  }, [styleOptions]);

  const handleRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * styleOptions.length);
    onStyleSelect(styleOptions[randomIndex].id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{t("imageStyle")}</h3>
        <div className="flex items-center gap-4">
          <Button onClick={handleRandomStyle} variant="outline">
            <ShuffleIcon className="w-4 h-4 mr-2" />
            {t("random")}
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 pb-2">
          {styleOptions.map((style: any) => (
            <div
              key={style.id}
              onClick={() => onStyleSelect(style.id)}
              className={`
                relative rounded-lg overflow-hidden cursor-pointer
                transition-all duration-200 transform hover:scale-[1.02]
                ${
                  selectedStyle === style.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                }
              `}>
              <div className="relative aspect-square w-full">
                <Image
                  src={style.thumbnail}
                  alt={style.name}
                  fill
                  className="object-cover rounded-lg"
                  quality={100}
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm text-white font-medium">{style.name}</p>
              </div>

              {selectedStyle === style.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        {hasOverflow && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent h-10 pointer-events-none">
            {/* Scroll Icon */}
            <div className="flex flex-col items-center gap-1">
              {/* <div className="w-[30px] h-[50px] border-2 border-primary rounded-full p-1">
                <div className="w-full h-3 bg-primary rounded-full animate-scroll-down" />
              </div> */}
              {/* <span className="text-sm font-medium text-primary">
                Scroll for more
              </span> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
