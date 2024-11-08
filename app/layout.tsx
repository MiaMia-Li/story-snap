import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header/Header";
import SessionWrapper from "@/components/header/SessionWrapper";
import { AuthProvider } from "@/contexts/auth";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StorySnap",
  description:
    "StorySnap is a platform that helps you create and share stories with your audience",
  keywords: "story creation, story sharing, story marketing",

  authors: [{ name: "StorySnap Team" }],
  creator: "StorySnap",
  publisher: "StorySnap Inc.",

  openGraph: {
    title: "StorySnap - Create and Share Stories",
    description:
      "StorySnap is a platform that helps you create and share stories with your audience",
    images: [{ url: "/og-img.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StorySnap - Create and Share Stories",
    description: "Create and share stories with your audience",
    images: ["/og-img.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="MyWebSite" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class">
            <TooltipProvider>
              <AuthProvider>
                <Header />
                {children}
                <Toaster />
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </body>
      </html>
    </SessionWrapper>
  );
}
