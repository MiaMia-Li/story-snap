"use client";
import { UploadSection } from "@/components/story/UploadSection";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  console.log("--session", session);
  if (!session?.user.id) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background p-6">
      {/* 欢迎标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 py-8">
        {/* 主标题 */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                Transform
              </span>{" "}
              <span
                className="bg-gradient-to-r from-primary/90 to-primary/70 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                Your Images
              </span>
            </h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold tracking-tight mt-2">
              <span
                className="bg-gradient-to-r from-primary/80 to-primary/60 
                       bg-clip-text text-transparent 
                       drop-shadow-sm">
                into Stories
              </span>
            </motion.h1>
          </motion.div>
        </div>

        {/* 副标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center space-y-4">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Upload an image and watch as AI transforms it into a captivating
            story,{" "}
            <span className="text-primary font-medium">uniquely crafted</span>{" "}
            just for you
          </p>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none
               overflow-hidden -z-10">
          <div
            className="absolute top-20 left-1/4 w-64 h-64 
                    bg-primary/10 rounded-full blur-3xl"
          />
          <div
            className="absolute top-40 right-1/4 w-64 h-64 
                    bg-primary/5 rounded-full blur-3xl"
          />
        </motion.div>
      </motion.div>

      <UploadSection />
    </main>
  );
}
