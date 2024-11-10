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
  title:
    "StorySnap | AI-Powered Photo Story Generator | Create Engaging Stories",
  description:
    "Transform photos into captivating stories with StorySnap, the AI platform that brings your memories to life. Create engaging narratives from any image in one click.",
  keywords:
    "AI story generator, photo story creator, image storytelling, AI writing assistant, visual storytelling platform, photo narrative creator, AI story maker, digital storytelling tool",

  authors: [{ name: "StorySnap Team" }],
  creator: "StorySnap",
  publisher: "StorySnap Inc.",

  // Add canonical URL
  alternates: {
    canonical: "https://snapstoryai.com",
  },

  // Improved OpenGraph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapstoryai.com",
    siteName: "StorySnap",
    title: "StorySnap - Transform Photos into Engaging AI-Generated Stories",
    description:
      "Create captivating stories from your photos using AI technology. Transform any image into a compelling narrative with our intuitive story generator.",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 630,
        alt: "StorySnap - AI Story Generator",
      },
    ],
  },

  // Improved Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@snapstoryai",
    creator: "@snapstoryai",
    title: "StorySnap - AI-Powered Photo Story Generator",
    description:
      "Transform your photos into engaging stories with AI technology. Create and share memorable narratives instantly.",
    images: [
      {
        url: "/og-img.png",
        alt: "StorySnap - AI Story Generator",
      },
    ],
  },

  other: {
    // 将结构化数据转换为字符串
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "StorySnap",
      applicationCategory: "Photography & Story Creation",
      description:
        "Transform photos into engaging stories with StorySnap's AI technology. Create, customize, and share memorable narratives from your images instantly.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
      },
      creator: {
        "@type": "Organization",
        name: "StorySnap Inc.",
        url: "https://snapstoryai.com",
      },
      faq: {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is StorySnap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StorySnap is an AI-powered platform that transforms photos into engaging stories. Upload any image and our AI technology will generate a compelling narrative around it.",
            },
          },
          {
            "@type": "Question",
            name: "How does StorySnap work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Simply upload your photo, and our AI analyzes the image to generate a unique story. You can then customize and edit the story before sharing it with your audience.",
            },
          },
          {
            "@type": "Question",
            name: "Is StorySnap free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StorySnap offers both free and premium plans. You can start creating stories for free, with advanced features available in our premium plans.",
            },
          },
        ],
      },
    }),
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
          <meta content="text/html; charset=UTF-8" name="Content-Type" />
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
