import { STYLE_PRESETS } from "@/config/story";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";

// Image Style Selection Component
export function ImageStyleSelector({
  selectedStyle,
  onStyleSelect,
}: {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Image Style
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Select a visual style for your story
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {STYLE_PRESETS.map((style: any) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`
              relative rounded-lg overflow-hidden cursor-pointer
              transition-all duration-200 transform hover:scale-[1.02]
              ${
                selectedStyle === style.id
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
              }
            `}>
            {/* Thumbnail Image */}
            <div className="relative aspect-square">
              <Image
                src={style.thumbnail}
                alt={style.name}
                fill
                className="object-cover"
                sizes="(max-width: 150px) 10vw, 5vw"
                priority
              />
            </div>

            {/* Style Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-sm text-white font-medium">{style.name}</p>
              {/* <p className="text-xs text-white/80 mt-1">{style.description}</p> */}
            </div>

            {/* Selection Indicator */}
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
