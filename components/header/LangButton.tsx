"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Check } from "lucide-react";
import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/actions/locale";
import { useLocale } from "next-intl";

const LANGUAGE_OPTIONS = [
  { value: "en" as Locale, label: "English" },
  { value: "zh" as Locale, label: "中文" },
] as const;

export function LangButton() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      setUserLocale(newLocale);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="切换语言"
          disabled={isPending}>
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGE_OPTIONS.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleLanguageChange(value)}
            className="cursor-pointer flex items-center justify-between">
            {label}
            {value === locale && (
              <Check className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
