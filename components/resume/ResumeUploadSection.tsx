"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FileUploader from "./FileUploader";
import { Button } from "../ui/button";
import { Sparkles, ArrowRight, FileCheck } from "lucide-react";

export const ResumeUploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFilesPick = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    // 模拟上传进度
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setUploadedFile(files[0]);
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 w-full">
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <FileUploader
              onFilesPick={handleFilesPick}
              disabled={isUploading}
              progress={uploadProgress}
            />
          </motion.div>

          <AnimatePresence>
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center space-y-6">
                {/* 成功上传提示 */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-green-500 dark:text-green-400">
                  <FileCheck className="h-6 w-6" />
                  <span className="font-medium">
                    Successfully uploaded: {uploadedFile.name}
                  </span>
                </motion.div>

                {/* 解析按钮 */}
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative">
                  {/* 光晕效果 */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />

                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 rounded-full group">
                    <span className="flex items-center gap-2 text-lg font-medium">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                      Start AI Analysis
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>

                {/* 额外信息 */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  className="text-sm text-muted-foreground text-center max-w-md">
                  Our AI will analyze your resume and provide detailed insights
                  about your professional profile
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// 可选：添加一个进度指示器组件
const ProgressIndicator = ({ progress }: { progress: number }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-1 bg-blue-500 rounded-full"
      transition={{ duration: 0.3 }}
    />
  );
};

// 可选：添加一个悬浮提示组件
const FloatingTip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-full whitespace-nowrap">
      Click to start the analysis
    </motion.div>
  );
};
