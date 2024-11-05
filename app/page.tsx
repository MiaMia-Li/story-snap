// app/page.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ImageIcon,
  Wand2,
  ArrowRight,
  Globe2,
  MessageSquareText,
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
];

const testimonials = [
  {
    quote:
      "This tool has revolutionized how I create content for my blog. The stories it generates are incredibly engaging.",
    author: "Sarah Johnson",
    role: "Content Creator",
    // avatar: "/avatars/avatar-1.jpg",
  },
  {
    quote:
      "As an educator, I use this daily to create engaging materials for my students. It's been a game-changer.",
    author: "Michael Chen",
    role: "Education Professional",
    // avatar: "/avatars/avatar-2.jpg",
  },
  {
    quote:
      "The quality of the generated stories is consistently high. It saves me hours of work every week.",
    author: "Emma Davis",
    role: "Marketing Manager",
    // avatar: "/avatars/avatar-3.jpg",
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
                      <Link href="/generate">
                        <Button size="lg" className="rounded-full px-8">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8">
                        View Examples
                      </Button>
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

          {/* CTA Section */}
          <section className="mb-32">
            <Card className="relative overflow-hidden border-2 border-primary/20">
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
              />
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="rounded-full px-8">
                      Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
