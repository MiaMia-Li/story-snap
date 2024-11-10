import { Share } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ShareButton = ({ shareUrl }: { shareUrl: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // 彩带粒子配置 - 增加数量和多样性
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    rotate: i * 30 + "deg", // 更密集的角度分布
    x: Math.cos((i * 30 * Math.PI) / 180) * 40,
    y: Math.sin((i * 30 * Math.PI) / 180) * 40,
    width: Math.random() * 3 + 2, // 随机宽度
    delay: Math.random() * 0.2, // 随机延迟
  }));

  return (
    <div className="relative">
      {/* 彩带动画 */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
            rotate: particle.rotate,
            opacity: 0,
          }}
          animate={
            isAnimating
              ? {
                  scale: [0, 1, 0],
                  x: [0, particle.x, particle.x * 2],
                  y: [0, particle.y, particle.y * 2],
                  opacity: [0, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: particle.delay,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            style={{ width: particle.width }}
            className={`
              h-1 rounded-full
              ${
                i % 3 === 0
                  ? "bg-pink-400"
                  : i % 3 === 1
                  ? "bg-purple-400"
                  : "bg-blue-400"
              }
              opacity-80
            `}
          />
        </motion.div>
      ))}

      {/* 按钮 */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={handleShare}
          className="relative bg-white hover:bg-gray-50 border-2 hover:border-pink-200 transition-colors">
          <motion.div
            animate={
              isAnimating
                ? {
                    rotate: [0, 15, -15, 0],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}>
            <Share className="w-4 h-4 mr-2" />
          </motion.div>
          Share
        </Button>
      </motion.div>
    </div>
  );
};

export default ShareButton;
