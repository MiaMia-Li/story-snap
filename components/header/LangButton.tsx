"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/config/lang";
import { Locale } from "@/types";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";

export function LangButton() {
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    // 设置 Cookie
    document.cookie = `i18nlang=${locale}; path=/; max-age=31536000`;

    // 获取当前路径并替换语言路径
    const { pathname, search } = window.location;
    const pathParts = pathname.split("/");

    // 如果路径中包含语言标识，将其替换
    if (LANGUAGES.map((lang) => lang.value).includes(pathParts[1] as Locale)) {
      pathParts[1] = locale; // 替换语言路径
    } else {
      // 如果没有语言标识，添加新的语言前缀
      pathParts.unshift(locale);
    }

    // 构造新的路径
    const newPath = pathParts.join("/") + search;

    // 跳转到新路径
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          {/* <span className="sr-only">切换语言</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            className="cursor-pointer">
            {/* <span className="mr-2">{language.flag}</span> */}
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
