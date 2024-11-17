import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Locale } from "@/types";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "SnapStory | AI-Powered Photo Story Generator | Create Engaging Stories",
  description:
    "Transform photos into captivating stories with SnapStory, the AI platform that brings your memories to life. Create engaging narratives from any image in one click.",
  keywords:
    "AI story generator, photo story creator, image storytelling, AI writing assistant, visual storytelling platform, photo narrative creator, AI story maker, digital storytelling tool",

  authors: [{ name: "SnapStory Team" }],
  creator: "SnapStory",
  publisher: "SnapStory Inc.",

  // Add canonical URL
  alternates: {
    canonical: "https://snapstoryai.com",
  },

  // Improved OpenGraph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapstoryai.com",
    siteName: "SnapStory",
    title: "SnapStory - Transform Photos into Engaging AI-Generated Stories",
    description:
      "Create captivating stories from your photos using AI technology. Transform any image into a compelling narrative with our intuitive story generator.",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 630,
        alt: "SnapStory - AI Story Generator",
      },
    ],
  },

  // Improved Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@snapstoryai",
    creator: "@snapstoryai",
    title: "SnapStory - AI-Powered Photo Story Generator",
    description:
      "Transform your photos into engaging stories with AI technology. Create and share memorable narratives instantly.",
    images: [
      {
        url: "/og-img.png",
        alt: "SnapStory - AI Story Generator",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={lang}>
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
