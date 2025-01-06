import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QueueTask, TaskStatus, TaskType } from "@/types";
import { sleep } from "@/utils";
import { updateStory } from "@/utils/story";

interface QueueStore {
  tasks: QueueTask[];
  maxConcurrentTasks: number;
  addTask: (params: {
    type: TaskType;
    id: string;
    userId?: string;
    pollingId: string;
  }) => Promise<QueueTask | null>;
  updateTaskStatus: (
    pollingId: string,
    status: TaskStatus,
    progress?: number
  ) => Promise<void>;
  removeTask: (id: string) => void;
  clearQueue: () => void;
  syncServerQueue: () => Promise<void>;
}

export const useQueueStore = create<QueueStore>()((set, get) => ({
  tasks: [],
  maxConcurrentTasks: 3,

  addTask: async ({ type, id, userId, pollingId }) => {
    try {
      const response = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, pollingId, type, id }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask: QueueTask = {
        id,
        type,
        status: "pending",
        progress: 0,
        createdAt: new Date(),
        userId,
        pollingId: pollingId,
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));

      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      return null;
    }
  },

  updateTaskStatus: async (pollingId, status, progress = 0) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.pollingId === pollingId ? { ...task, status, progress } : task
      ),
    }));
    if (status == "completed") {
      try {
        const response = await fetch("/api/queue/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pollingId, status: "completed" }),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }
      } catch (error) {
        console.error("Error update task:", error);
      }
    }
  },

  removeTask: (pollingId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.pollingId !== pollingId),
    }));
  },

  clearQueue: () => {
    set({ tasks: [] });
  },

  syncServerQueue: async () => {
    try {
      const response = await fetch(`/api/queue/status`);
      if (!response.ok) {
        throw new Error("Failed to sync server queue");
      }

      const serverTasks = await response.json();
      set({ tasks: serverTasks.queue });

      // Filter out completed tasks
      const pendingTasks = serverTasks.queue.filter(
        (task: QueueTask) => task.status !== "completed"
      );

      // Process each pending task
      const processedTasks = await Promise.all(
        pendingTasks.map(async (task: QueueTask) => {
          try {
            // Polling function for individual task
            const pollTask = async () => {
              try {
                const pollResponse = await fetch(
                  `/api/minivideo/${task.pollingId}`
                );

                if (!pollResponse.ok) {
                  throw new Error(`Polling failed for task ${task.pollingId}`);
                }

                const updatedTask = await pollResponse.json();

                // Continue polling until task is completed or failed
                if (
                  updatedTask.status === "pending" ||
                  updatedTask.status === "processing"
                ) {
                  await sleep(5000); // Wait before next poll
                  return pollTask(); // Recursive polling
                }

                return updatedTask;
              } catch (pollError) {
                console.error(
                  `Polling error for task ${task.pollingId}:`,
                  pollError
                );
                throw pollError;
              }
            };

            // Start polling for the task
            const finalTask = await pollTask();
            updateStory(task.id, finalTask.video);
            get().updateTaskStatus(task.pollingId, "completed");

            return finalTask;
          } catch (taskError) {
            console.error(
              `Error processing task ${task.pollingId}:`,
              taskError
            );
            get().updateTaskStatus(task.pollingId, "failed");
          }
        })
      );

      // Update the state with processed tasks
      // set({ tasks: processedTasks });
    } catch (error) {
      console.error("Error syncing queue:", error);
    }
  },
}));
