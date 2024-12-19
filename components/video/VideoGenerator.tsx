"use client";

import { LoginDialog } from "@/components/header/LoginDialog";

import { motion } from "framer-motion";
import { VideoContent } from "./VideoContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: 0.8,
    },
  },
};

export function VideoGenerator() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <LoginDialog />
      <div className="max-w-6xl mx-auto py-10 px-4 md:px-6">
        <motion.div
          className="text-center p-6 sm:px-6 mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {/* 装饰元素 */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
            variants={itemVariants}>
            ✨
          </motion.div>

          {/* 主标题部分 */}
          <motion.h1 className="flex flex-col items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <motion.div
              className="flex items-center gap-3"
              variants={itemVariants}>
              <span className="inline-flex items-center gap-2">
                <span>🎬 Transform</span>
                <span>Images</span>
              </span>
            </motion.div>

            <motion.div
              className="text-primary relative inline-block"
              variants={itemVariants}>
              Into Motion
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
          </motion.h1>

          {/* 描述部分 */}
          <motion.div className="mt-8 space-y-4" variants={itemVariants}>
            <p className="text-base sm:text-lg text-muted-foreground/90 font-medium max-w-md mx-auto">
              Professional video creation, powered by AI
            </p>

            {/* 特性标签 */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center items-center mt-6"
              variants={itemVariants}>
              <motion.span
                className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                🎥 Smart Video
              </motion.span>
              <motion.span
                className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                ⚡️ Quick Generation
              </motion.span>
              <motion.span
                className="px-4 py-1.5 rounded-full text-sm bg-primary/5 border border-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                🎭 Rich Effects
              </motion.span>
            </motion.div>
          </motion.div>

          {/* 装饰背景 */}
          <div className="absolute -z-10 inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-full blur-[100px]" />
          </div>
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="w-full mt-12">
          <VideoContent />
        </motion.div>
      </div>
    </main>
  );
}
