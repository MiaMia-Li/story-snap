import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Brain,
  FileSearch,
  Cpu,
  Code2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import React from "react";

// 定义每个步骤的消息、图标和颜色
const loadingSteps = [
  {
    message: "Analyzing your resume structure...",
    icon: FileSearch,
    color: "text-blue-500",
  },
  {
    message: "Extracting key information...",
    icon: Cpu,
    color: "text-purple-500",
  },
  {
    message: "Evaluating experience and skills...",
    icon: Brain,
    color: "text-indigo-500",
  },
  {
    message: "Identifying key achievements...",
    icon: Code2,
    color: "text-pink-500",
  },
  {
    message: "Generating personalized insights...",
    icon: Sparkles,
    color: "text-amber-500",
  },
  {
    message: "Analysis complete! ✨",
    icon: CheckCircle,
    color: "text-green-500",
  },
];

interface LoadingProgressProps {
  onComplete?: () => void;
}

export const StepLoading: React.FC<LoadingProgressProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<number[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, currentText]);

  // 打字机效果
  useEffect(() => {
    if (messageIndex >= loadingSteps.length) {
      onComplete?.();
      return;
    }

    const currentMessage = loadingSteps[messageIndex].message;

    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30); // 打字速度

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, messageIndex]);
        setCurrentText("");
        setCharIndex(0);
        setMessageIndex((prev) => prev + 1);
      }, 800); // 完成一行后的停顿时间

      return () => clearTimeout(timer);
    }
  }, [messageIndex, charIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-12 px-4">
      <div
        ref={containerRef}
        className="space-y-3 min-h-[200px] max-h-[300px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {/* 已完成的消息 */}
          {messages.map((stepIndex) => (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                {React.createElement(loadingSteps[stepIndex].icon, {
                  className: `w-4 h-4 ${loadingSteps[stepIndex].color}`,
                })}
              </motion.div>
              <span className="text-gray-700 dark:text-gray-300 font-mono">
                {loadingSteps[stepIndex].message}
              </span>
            </motion.div>
          ))}

          {/* 当前正在输入的消息 */}
          {messageIndex < loadingSteps.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                {React.createElement(loadingSteps[messageIndex].icon, {
                  className: `w-4 h-4 ${loadingSteps[messageIndex].color}`,
                })}
              </motion.div>
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300 font-mono">
                  {currentText}
                </span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-0.5 inline-block w-2 h-4 bg-blue-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
