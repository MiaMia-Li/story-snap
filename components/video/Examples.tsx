// app/example/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
// import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { VideoPlayer } from "../common/FileWrapper";

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // 减少子元素延迟
      staggerChildren: 0.05, // 减少子元素间隔
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 }, // 稍微减小初始位移
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3, // 缩短动画持续时间
      ease: "easeInOut", // 使用更平滑的缓动函数
    },
  },
  hover: {
    scale: 1.02, // 添加轻微的悬停效果
    transition: {
      duration: 0.2,
    },
  },
};

export default function Examples() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "/api/story/getExample?storyIds=ijHTNytPTz,UDGnd7jOU0,nB3JeX7piB"
        );
        const data = await response.json();
        setStories(data.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4">
        <div className="space-y-4 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-semibold text-foreground">
            🎬 Bring Your Images to Life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base text-muted-foreground">
            Turn your static images into dynamic videos with ease. Let our
            AI-powered tools create stunning motion visuals for you.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 justify-center items-center mt-4 text-sm">
          {[
            " 🎥 AI-Powered Video",
            "⚡️ Instant Results",
            "🎭 Custom Effects",
          ].map((text, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
              {text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((story: any) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}>
              <Link href={`/story/${story.storyId}`}>
                <Card className="group hover:shadow-md transition-all duration-300 overflow-hidden h-full">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    /> */}
                    <VideoPlayer src={story.image} />
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-base leading-tight tracking-tight line-clamp-2">
                        {story.title}
                      </h4>
                      {/* <div className="flex items-center gap-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={story.authorAvatar}
                            alt={story.authorName}
                          />
                          <AvatarFallback>
                            {story.authorName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">
                            {story.authorName}
                          </span>
                          <time
                            dateTime={story.date}
                            className="text-muted-foreground text-[10px]">
                            {new Date(story.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </div>
                      </div> */}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {story.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
