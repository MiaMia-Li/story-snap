"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface FileUploaderProps {
  onFilesPick: (files: File[]) => void;
  disabled?: boolean;
  progress?: number;
}

// 动画变体
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const uploadIconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      yoyo: Infinity,
    },
  },
};

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesPick,
  disabled,
  progress = 0,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setError("Please upload a PDF or Word document");
        setTimeout(() => setError(null), 3000); // 自动清除错误
        return;
      }
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setError(null);
        onFilesPick(acceptedFiles);
      }
    },
    [onFilesPick]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
    disabled,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative">
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed
          transition-all duration-300 ease-in-out
          ${isDragActive ? "border-blue-500 bg-blue-50/50" : "border-gray-200"}
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          ${isHovered ? "border-blue-400 shadow-lg" : ""}
          hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-500
          transform hover:scale-[1.01] transition-transform
        `}>
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center p-12 text-center">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="upload-prompt"
                variants={containerVariants}
                className="flex flex-col items-center space-y-6">
                <motion.div
                  variants={uploadIconVariants}
                  animate={isHovered ? "hover" : "initial"}
                  className="p-6 rounded-full bg-blue-50 dark:bg-blue-900/20
                           ring-4 ring-blue-50/50 dark:ring-blue-900/10">
                  <Upload className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                </motion.div>

                <div className="space-y-3">
                  <motion.h3
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
                    animate={{ scale: isHovered ? 1.02 : 1 }}>
                    Upload Your Resume
                  </motion.h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                    Drag and drop your resume file (PDF or Word) or click to
                    browse
                  </p>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  disabled={disabled}
                  className="mt-4 font-medium transition-all duration-200
                           hover:shadow-lg hover:scale-105">
                  Select File
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                variants={containerVariants}
                className="space-y-6 w-full max-w-md">
                <div
                  className="flex items-center space-x-4 bg-blue-50/50 dark:bg-blue-900/10 
                              p-4 rounded-lg">
                  <File className="h-8 w-8 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {progress === 100 ? (
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <Loader2 className="h-6 w-6 text-blue-500 animate-spin flex-shrink-0" />
                  )}
                </div>

                {progress > 0 && progress < 100 && (
                  <div className="space-y-2">
                    <Progress
                      value={progress}
                      className="h-2 bg-blue-100 dark:bg-blue-900/20"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between text-sm">
                      <span className="text-gray-500">Uploading...</span>
                      <span className="text-blue-500 font-medium">
                        {progress}%
                      </span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm
                         flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                <p className="text-blue-500 font-medium">Drop your file here</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-12 left-0 right-0 flex items-center 
                       justify-center text-red-500 bg-red-50 dark:bg-red-900/10
                       p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUploader;
