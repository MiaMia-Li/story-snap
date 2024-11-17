// app/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ImageIcon,
  Wand2,
  ArrowRight,
  Globe2,
  MessageSquareText,
  Share2,
  PenTool,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { FloatingElement } from "@/components/animations/FloatingElement";
import {
  ProcessStep,
  TestimonialCard,
  FeatureCard,
} from "@/components/story/Card";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { testimonials } from "@/config/home";
// import { PricingCards } from "@/components/pricing/PricingCards";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import GalleryCard from "@/components/story/GalleryCard";
import { EMAIL_ADDRESS } from "@/config/site";
import { useTranslations } from "next-intl";
import { PricingCards } from "../pricing/PricingCards";

const stories = [
  {
    id: "1",
    title: "A New Beginning",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/download/output_0-TTlzDRT5p47awZWL3WtH1ciB28pjXr.png",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_10.png",
    authorName: "John",
    createdAt: "2024-11-11",
    content:
      "As I stood in the fading sunlight, my heart raced with both excitement and trepidation. The world felt vast and full of potential, yet here I was, clutching my beloved cat, Luna, as if she were my anchor. With each gentle purr, she reminded me that I wasn't alone in this journey of 'being open to work.' I took a deep breath, letting the warmth of the sun wash over me, promising to embrace this new chapter with hope and determination. Together, we would explore the opportunities that lay ahead, each step a testament to resilience and the bonds we cherish.",
  },
  {
    id: "2",
    title: "A Penguin's Journey",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/download/output_0-7XJ7dxbN93HfQX5ZwSYC7a0cwxzria.png",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_11.png",
    authorName: "Emily",
    createdAt: "2024-11-02",
    content:
      "Once, there was a little penguin named Percy, who always dreamed of venturing beyond the icy shores of his homeland. He donned a tiny suit each day, clutching a briefcase, as he imagined himself in the bustling world of business. One day, he finally decided to take the leap and journey to a tropical paradise. Standing on a sun-kissed beach, he felt the warm breeze ruffle his feathers. It was unlike anything he'd ever experienced. As he gazed out at the vast ocean, he realized that this was not just a vacation; it was the start of a new chapter in his life, where possibilities were endless and dreams could come true.",
    likes: 100,
  },
  {
    id: "3",
    title: "A Spring Evening with My Feline Friends",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(10)-bVJsXAgxiNkNmFvYwEzG9BZx5nJDBc.webp",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_12.png",
    authorName: "Alice",
    createdAt: "2024-11-07",
    content:
      "As I sit beneath the cherry blossoms on this magical evening, I find myself surrounded by my two faithful black cats. The pink petals dance through the twilight air, creating a mystical atmosphere in our favorite park. My companions, Shadow and Luna, sit silently beside me, their emerald eyes fixed on the falling petals, just as enchanted as I am by nature's display.The city lights twinkle in the distance, but here, under the canopy of pink blossoms, time seems to stand still. I watch as my cats gracefully move through the carpet of fallen petals, their silhouettes perfect against the purple-hued sky. In moments like these, I understand why the Japanese celebrate hanami - there's something truly spiritual about witnessing the cherry blossoms with those you love, even if your companions happen to be cats.",
  },
  {
    id: "4",
    title: "A Peaceful Afternoon with My Furry Friends",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/out-0%20(5)-K6A2A7cREdgX2J4R3U9O3gQOi2jLkp.webp",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_13.png",
    authorName: "Charlie",
    createdAt: "2024-11-06",
    content:
      "Today, I found a quiet spot on a park bench, the warm sun filtering through the trees. With my two cats snuggled on my lap, I felt an incredible sense of calm. People walked by, some smiling at the sight of us, but I was lost in this little bubble of warmth and purrs. I couldn’t help but smile, feeling lucky to share such a simple, perfect moment with my furry companions. As they nestled close, I realized there’s nothing quite like the joy of being together in the gentle afternoon breeze.",
  },
  {
    id: "5",
    title: "The First Day at the Iceberg Conference",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/out-0%20(14)-Or4ItfgHTZ7dgdaPjp1uT3CuXXalXs.webp",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_14.png",
    authorName: "Percy",
    createdAt: "2024-11-10",
    content:
      "Once upon a time, in the icy landscapes of Antarctica, a penguin named Percy had a unique ambition—he wanted to work in corporate affairs. Unlike his friends who spent their days fishing and sliding on the ice, Percy wore a suit, carried a briefcase, and dreamed of making a difference.Today was Percy’s big day: his first conference with all the leading penguins from various icebergs. As he walked across the frozen plains, his friends watched in curiosity and awe, unable to understand his unusual passion for business. Arriving at the grand conference room, Percy took a deep breath, adjusted his tie, and stepped in. The room was filled with serious-looking penguins discussing the latest issues facing the iceberg community.Percy knew he was finally where he belonged. He might have been the only one wearing a tie, but he was ready to make waves in his own way. The journey had just begun for this corporate penguin.",
  },
  {
    id: "6",
    title: "In Awe of the Mountains",
    image:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/out-0%20(8)-kqmmbBBY10RG6zO9kRg6i6G1PVmAyF.webp",
    authorAvatar:
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png",
    authorName: "Fiona",
    createdAt: "2024-11-03",
    content:
      "I stand alone by the edge of a pristine lake, surrounded by towering mountains capped with snow. The air is crisp, and everything feels still, almost sacred. I watch as birds soar above, their silhouettes tiny against the vast sky. Gazing at the reflection of these majestic peaks, I feel both humbled and inspired. It's just me and this endless beauty, a reminder of how vast the world is and how small I am within it. In this moment, I am completely at peace, lost in nature's grandeur.",
  },
];

export default function HomePage() {
  const t = useTranslations("PageLayout");
  const FEATURES = [
    {
      icon: <Wand2 className="h-8 w-8" />,
      title: `${t("features.item1Title")}`,
      description: `${t("features.item1Description")}`,
    },
    {
      icon: <Globe2 className="h-8 w-8" />,
      title: `${t("features.item2Title")}`,
      description: `${t("features.item2Description")}`,
    },
    {
      icon: <MessageSquareText className="h-8 w-8" />,
      title: `${t("features.item3Title")}`,
      description: `${t("features.item3Description")}`,
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: `${t("features.item4Title")}`,
      description: `${t("features.item4Description")}`,
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: `${t("features.item5Title")}`,
      description: `${t("features.item5Description")}`,
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: `${t("features.item6Title")}`,
      description: `${t("features.item6Description")}`,
    },
  ];
  const HOW_IT_WORKS = [
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: `${t("howItWorks.step1Title")}`,
      description: `${t("howItWorks.step1Description")}`,
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: `${t("howItWorks.step2Title")}`,
      description: `${t("howItWorks.step2Description")}`,
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      title: `${t("howItWorks.step3Title")}`,
      description: `${t("howItWorks.step3Description")}`,
    },
  ];
  const FAQ = [
    {
      question: `${t("faq.question1")}`,
      answer: `${t("faq.answer1")}`,
    },
    {
      question: `${t("faq.question2")}`,
      answer: `${t("faq.answer2")}`,
    },
    {
      question: `${t("faq.question3")}`,
      answer: `${t("faq.answer3")}`,
    },
    {
      question: `${t("faq.question4")}`,
      answer: `${t("faq.answer4")}`,
    },
    {
      question: `${t("faq.question5")}`,
      answer: `${t("faq.answer5")}`,
    },
    {
      question: `${t("faq.question6")}`,
      answer: `${t("faq.answer6")}`,
    },
    {
      question: `${t("faq.question7")}`,
      answer: `${t("faq.answer7")}`,
    },
    {
      question: `${t("faq.question8")}`,
      answer: `${t("faq.answer8")}`,
    },
  ];

  return (
    <main className="min-h-screen relative bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="relative">
        {/* Floating Decorative Elements */}
        <FloatingElement className="absolute top-20 left-[10%] w-24 h-24 bg-primary/10 rounded-full blur-xl" />
        <FloatingElement className="absolute top-40 right-[15%] w-32 h-32 bg-primary/10 rounded-full blur-xl" />

        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="relative mb-32">
            <FadeIn className="space-y-8" duration={0.7}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center">
                <Badge
                  variant="outline"
                  className="rounded-full px-6 py-2 text-sm border-2">
                  {t("hero.badge")}
                </Badge>
              </motion.div>

              <div className="text-center space-y-6">
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}>
                  {t("hero.title")}
                  <motion.span
                    className="text-primary block mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}>
                    {t("hero.title2")}
                  </motion.span>
                </motion.h1>

                <FadeIn delay={0.6}>
                  <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                    {t("hero.description")}
                  </p>
                </FadeIn>

                <FadeIn delay={0.8} className="pt-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Link href="/generate-story">
                        <Button size="lg" className="rounded-full px-8">
                          {t("hero.startButton")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </section>

          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t("gallery.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("gallery.description")}
              </p>
            </FadeIn>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}>
              {stories.map((story) => (
                <GalleryCard key={story.id} story={story} />
              ))}
            </motion.div>
          </section>

          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t("features.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("features.description")}
              </p>
            </FadeIn>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}>
              {FEATURES.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>
          </section>
          {/* How It Works Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("howItWorks.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("howItWorks.description")}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {HOW_IT_WORKS.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              ))}
            </div>
          </section>
          {/* Testimonials Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("testimonials.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("testimonials.description")}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </section>
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t("pricing.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("pricing.description")}
              </p>
            </FadeIn>
            <PricingCards />
          </section>

          {/* FAQ Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t("faq.title")}</h2>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("faq.description")}
              </p>
            </FadeIn>

            <Accordion
              type="single"
              collapsible
              className="space-y-4 max-w-5xl mx-auto">
              {FAQ.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground  pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
          {/* CTA Section */}
          <section>
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-12">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
                  <p className="text-muted-foreground">
                    {t("cta.description")}
                  </p>
                  <motion.div
                    className="z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link href="/generate-story">
                      <Button size="lg" className="rounded-full px-8">
                        {t("cta.button")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </section>
          {/* Newsletter Signup */}
          {/* <section className="bg-muted py-12 mt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h3 className="text-2xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-muted-foreground mb-6">
                Get the latest stories delivered to your inbox
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border px-4 py-2"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </section> */}
        </div>
      </div>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-10">
        <div className="mx-auto max-w-7xl justify-between px-4 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Logo and Description Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <Image
                src="/penguin.png"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="md:text-2xl text-xl font-bold font-mono">
                SnapStory
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <Link
                href="https://pagegen.ai"
                target="_blank"
                className="text-primary hover:text-primary/80 transition-colors mr-6">
                pagegen
              </Link>
              {/* © {new Date().getFullYear()} All Rights Reserved */}
            </p>
            <p className="text-sm text-muted-foreground">
              Transform your images into engaging stories with the power of AI.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/snapstoryAI"
                target="_blank"
                rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <TwitterLogoIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://discord.gg/z5NbSzm9"
                target="_blank"
                rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <DiscordLogoIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/feedback">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </Link>

              {/* <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
          <div className="space-y-4">
            {/* Product Column */}
            <div className="space-y-2">
              <h4 className="font-semibold">Product</h4>
              <ul className="flex space-x-6 text-sm">
                {" "}
                {/* 改用 space-x-6 控制水平间距 */}
                <li>
                  <Link
                    href="/generate-story"
                    className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examples"
                    className="text-muted-foreground hover:text-primary">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-2">
              <h4 className="font-semibold">Legal</h4>
              <ul className="flex space-x-6 text-sm">
                {" "}
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-primary">
                    Licenses
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
