import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header/Header";
import SessionWrapper from "@/components/header/SessionWrapper";
import { AuthProvider } from "@/contexts/auth";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title:
    "SnapStory | AI-Powered Photo Story Generator | Create Engaging Stories",
  description:
    "Transform photos into captivating stories with SnapStory, the AI platform that brings your memories to life. Create engaging narratives from any image in one click.",
  keywords:
    "Snap AI,AI IMAGE, AI Art Generator,AI picture,AI photo,AI story generator, photo story creator, image storytelling, AI writing assistant, visual storytelling platform, photo narrative creator, AI story maker, digital storytelling tool",

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

export default async function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
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
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          {/* <Navigation /> */}
          <SessionWrapper>
            <ThemeProvider attribute="class">
              <TooltipProvider>
                <AuthProvider>
                  <Header />
                  <div className="mt-[64px]">{children}</div>
                  <Toaster />
                </AuthProvider>
              </TooltipProvider>
            </ThemeProvider>
            {process.env.NODE_ENV === "production" && <Analytics />}
          </SessionWrapper>
        </NextIntlClientProvider>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="058cf91e-c9b8-4e9a-b189-d49dcd1ff4d2"
          data-domains="snapstoryai.com,www.snapstoryai.com"></Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MJT6974BC1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MJT6974BC1');
        `}
        </Script>
      </body>
    </html>
  );
}
