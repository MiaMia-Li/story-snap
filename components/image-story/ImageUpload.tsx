"use client";

import { useState } from "react";
import { Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageChange: (imageUrl: string | null) => void;
}

export default function ImageUploader({ onImageChange }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File) => {
    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // 验证文件大小（5MB）
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size should be less than 5MB");
      return;
    }

    try {
      setIsLoading(true);

      // 创建 FormData
      const formData = new FormData();
      formData.append("file", file);

      // 发送上传请求
      const response = await fetch("/api/images/worker", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // 设置图片URL和触发回调
      setImage(data.url);
      onImageChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-muted/50"
      } transition-colors`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        style={{ display: image ? "none" : "block" }}
        disabled={isLoading}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {image ? (
        <div className="relative p-4">
          <img
            src={image}
            alt="Upload"
            className="max-h-[200px] mx-auto rounded-md"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {/* 重新上传按钮 */}
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-110"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    uploadImage(file);
                  }
                };
                input.click();
              }}
              disabled={isLoading}>
              <Upload className="h-4 w-4" />
            </Button>

            {/* 删除按钮 */}
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-110 hover:text-red-500"
              onClick={removeImage}
              disabled={isLoading}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drop your image here or click to upload
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum file size: 5MB
          </p>
        </div>
      )}
    </div>
  );
}
