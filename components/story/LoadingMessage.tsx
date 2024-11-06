import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingMessage = () => {
  const messages = [
    "Brewing magical stories ✨",
    "Gathering stardust ⭐",
    "Spinning tales 📚",
    "Channeling creativity 🎨",
    "Weaving words together 🧵",
  ];

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < messages[messageIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentMessage((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentMessage("");
        setCharIndex(0);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, messageIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12">
      <Card className="bg-gradient-to-br from-primary/5 to-background max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <p className="text-primary min-h-[24px] font-mono">
            {currentMessage}
            <span className="animate-pulse">|</span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoadingMessage;
