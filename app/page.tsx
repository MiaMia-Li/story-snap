// app/page.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ImageIcon,
  Wand2,
  ArrowRight,
  Globe2,
  MessageSquareText,
  Share2,
  PenTool,
  CheckCircle2,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { faqData, testimonials } from "@/config/home";
import { PricingCards } from "@/components/pricing/PricingCards";
import { useSession } from "next-auth/react";
import Image from "next/image";

const features = [
  {
    icon: <Wand2 className="h-8 w-8" />,
    title: "AI Magic",
    description:
      "Advanced algorithms that understand context and create compelling narratives",
  },
  {
    icon: <Globe2 className="h-8 w-8" />,
    title: "Multiple Languages",
    description:
      "Generate stories in various languages to reach a global audience",
  },
  {
    icon: <MessageSquareText className="h-8 w-8" />,
    title: "Custom Tone",
    description: "Adjust the storytelling style to match your brand voice",
  },
  {
    icon: <ImageIcon className="h-8 w-8" />,
    title: "Smart Image Analysis",
    description:
      "Advanced computer vision technology that captures subtle details and emotions in your photos",
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Style Customization",
    description:
      "Multiple writing styles from professional to casual, ensuring your story matches your needs",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Easy Sharing",
    description:
      "Seamlessly share your stories across social media platforms and export in multiple formats",
  },
];

export default function HomePage() {
  const { data: session } = useSession();
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
                <Badge className="rounded-full px-6 py-2 text-sm bg-primary text-primary-foreground">
                  ✨ Transform Images into Stories with AI
                </Badge>
              </motion.div>

              <div className="text-center space-y-6">
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}>
                  Turn Your Images Into
                  <motion.span
                    className="text-primary block mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}>
                    Captivating Stories
                  </motion.span>
                </motion.h1>

                <FadeIn delay={0.6}>
                  <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                    Upload any image and watch as our AI transforms it into an
                    engaging story. Perfect for content creators, educators, and
                    storytellers.
                  </p>
                </FadeIn>

                <FadeIn delay={0.8} className="pt-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Link href="/generate-story">
                        <Button size="lg" className="rounded-full px-8">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Link href="/examples">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full px-8">
                          View Examples
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
              {/* <Badge className="rounded-full px-6 py-2 text-sm bg-primary text-primary-foreground mb-6">
                Features
              </Badge> */}
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how our AI-powered platform can transform your
                storytelling process
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
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>
          </section>
          {/* How It Works Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              {/* <Badge className="rounded-full px-6 py-2 text-sm bg-primary text-primary-foreground mb-6">
                Process
              </Badge> */}
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your images into engaging
                stories
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ProcessStep
                number={1}
                title="Upload Image"
                description="Drop or select any image you want to transform"
                icon={<ImageIcon className="h-6 w-6" />}
              />
              <ProcessStep
                number={2}
                title="AI Processing"
                description="Our AI analyzes and understands your image context"
                icon={<Wand2 className="h-6 w-6" />}
              />
              <ProcessStep
                number={3}
                title="Get Your Story"
                description="Receive a unique, engaging story based on your image"
                icon={<MessageSquareText className="h-6 w-6" />}
              />
            </div>
          </section>
          {/* Testimonials Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              {/* <Badge className="rounded-full px-6 py-2 text-sm bg-primary text-primary-foreground mb-6">
                Testimonials
              </Badge> */}
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied users who are already using our
                platform
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
              <h2 className="text-3xl font-bold mb-4">Plan Comparison</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your storytelling needs
              </p>
            </FadeIn>
            <PricingCards userId={session?.user?.id} />
          </section>

          {/* FAQ Section */}
          <section className="mb-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about StorySnap
              </p>
            </FadeIn>

            <Accordion
              type="single"
              collapsible
              className="space-y-4 max-w-5xl mx-auto">
              {faqData.map((faq, index) => (
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

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Still have questions?{" "}
                <a
                  href="mailto:support@ahaapple.com"
                  className="text-primary hover:underline font-medium">
                  Contact our support team
                </a>
              </p>
            </div>
          </section>
          {/* CTA Section */}
          <section>
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-12">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl font-bold">
                    Ready to Start Your Story?
                  </h2>
                  <p className="text-muted-foreground">
                    Join thousands of creators who are already using our
                    platform to bring their images to life
                  </p>
                  <motion.div
                    className="z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link href="/generate-story">
                      <Button size="lg" className="rounded-full px-8">
                        Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
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
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto py-10 max-w-7xl justify-between px-4 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
                StorySnap
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform your images into engaging stories with the power of AI.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
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
                <li>
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
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
      </footer>
    </main>
  );
}
