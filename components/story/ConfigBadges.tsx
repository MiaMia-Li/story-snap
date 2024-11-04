// components/StoryPresets/index.tsx
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Globe, Palette, Star } from "lucide-react";
import { StoryConfig } from "@/types";
import { LANGUAGES } from "@/config/lang";

export function ConfigBadges({ config }: { config: StoryConfig }) {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <Badge className="gap-1">
        <BookOpen className="h-3 w-3" />
        {config.type}
      </Badge>
      <Badge className="gap-1">
        <Clock className="h-3 w-3" />
        {config.length}
      </Badge>
      <Badge className="gap-1">
        <Palette className="h-3 w-3" />
        {config.style}
      </Badge>
      <Badge className="gap-1">
        <Globe className="h-3 w-3" />
        {LANGUAGES.find((l) => l.value === config.language)?.label}
      </Badge>
      <Badge className="gap-1">
        <Star className="h-3 w-3" />
        {config.tone}
      </Badge>
    </motion.div>
  );
}
