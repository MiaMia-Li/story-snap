import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header/Header";
import SessionWrapper from "@/components/header/SessionWrapper";
import { AuthProvider } from "@/contexts/auth";
import { Analytics } from "@vercel/analytics/react";
import { Locale } from "@/types";
import DictionaryProvider from "@/contexts/dictionary";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(lang);
  return (
    <SessionWrapper>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <AuthProvider>
            <DictionaryProvider dictionary={dictionary}>
              <Header />
              {children}
              <Toaster />
            </DictionaryProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
      {process.env.NODE_ENV === "production" && <Analytics />}
    </SessionWrapper>
  );
}
