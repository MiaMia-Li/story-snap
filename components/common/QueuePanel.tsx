// components/QueuePanel.tsx
import { motion } from "framer-motion";
import { useQueueStore } from "@/hooks/useQueueStore";
import { Video, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export const QueuePanel = () => {
  const { tasks, syncServerQueue } = useQueueStore();

  useEffect(() => {
    syncServerQueue();
  }, []);

  const totalSlots = 3;
  console.log("--tasks", tasks);
  const queueTasks =
    tasks &&
    tasks.length > 0 &&
    tasks.filter(
      (task) => task.status === "pending" || task.status === "processing"
    );
  if (tasks.length === 0 || !queueTasks || queueTasks.length === 0) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed bottom-4 right-4 z-30",
        "w-[280px] rounded-xl",
        "bg-background/90 backdrop-blur-sm",
        "border border-border",
        "shadow-lg overflow-hidden"
      )}>
      {/* 主要内容区域 */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div
            className={cn(
              "flex items-center gap-2",
              "px-3 py-1.5 rounded-md",
              "bg-muted"
            )}>
            <Video className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {queueTasks.length}/{totalSlots}
            </span>
          </div>
          <span className="font-medium text-foreground/80">
            {queueTasks.length} {queueTasks.length === 1 ? "job" : "jobs"} in
            queue
          </span>
        </div>

        <div className="flex gap-1.5 items-center">
          {Array.from({ length: totalSlots }).map((_, index) => {
            const task = queueTasks[index];
            return (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1 rounded-full overflow-hidden",
                  "bg-muted"
                )}>
                {task && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        task.status === "completed"
                          ? "100%"
                          : task.status === "processing"
                          ? "70%"
                          : "30%",
                    }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "h-full",
                      task.status === "completed" && "bg-primary",
                      task.status === "processing" && "bg-primary/70",
                      task.status === "pending" && "bg-primary/50"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* View All 链接区域 */}
      {tasks.length > queueTasks.length && (
        <Link
          href="/mine"
          className={cn(
            "flex items-center justify-between",
            "w-full px-4 py-3",
            "bg-primary/5 hover:bg-primary/10",
            "border-t border-primary/10",
            "transition-colors duration-200",
            "group"
          )}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
              View All
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </motion.div>
  );
};
