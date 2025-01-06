import { toast } from "sonner";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/images/worker", {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("File upload error:", error);
    toast.error((error as Error).message);
    return undefined;
  }
};

// 工具函数
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 辅助函数：判断是否为视频URL
export const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

// 辅助函数：将媒体字符串分割并分类
export const parseMediaUrls = (mediaString: string) => {
  if (!mediaString) return { videos: [], images: [] };

  const urls = mediaString.split(",").filter(Boolean);
  return urls.reduce(
    (acc, url) => {
      if (isVideoUrl(url)) {
        acc.videos.push(url);
      } else {
        acc.images.push(url);
      }
      return acc;
    },
    { videos: [] as string[], images: [] as string[] }
  );
};
