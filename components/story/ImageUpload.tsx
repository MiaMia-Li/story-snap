import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { RefreshCcw, Upload, Loader2, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import Image from "next/image";

interface ImageUploadProps {
  previewImage: string[] | null;
  getRootProps: () => any;
  onClearImages: () => void;
  onRemoveImage: (index: number) => void;
  getInputProps: () => any;
  isDragActive: boolean;
  uploadProgress?: number; // 新增：上传进度
  isUploading?: boolean; // 新增：是否正在上传
}

export default function ImageUpload({
  previewImage,
  getRootProps,
  getInputProps,
  isDragActive,
  onClearImages,
  onRemoveImage,
  uploadProgress = 0,
  isUploading = false,
}: ImageUploadProps) {
  return previewImage && previewImage.length > 0 ? (
    // 图片预览状态
    <div className="h-full w-full relative">
      <div className="h-full w-full overflow-x-auto scrollbar-hide">
        <div className="relative h-full min-w-full flex items-center justify-start px-4">
          {previewImage.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative",
                "w-[260px]",
                "h-[90%]",
                "flex-shrink-0",
                "mx-2",
                "bg-white",
                "rounded-xl",
                "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                "border-[1px] border-gray-100",
                "transition-all duration-200 ease-out",
                "group",
                "hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
                "hover:-translate-y-1"
              )}>
              {/* 删除按钮 - 右上角 */}
              <button
                onClick={() => onRemoveImage(index)} // 需要添加这个回调函数
                className={cn(
                  "absolute -top-2 -right-2 z-10",
                  "w-6 h-6",
                  "bg-red-500 hover:bg-red-600",
                  "rounded-full",
                  "flex items-center justify-center",
                  "text-white",
                  "shadow-lg",
                  "transition-all duration-200",
                  "opacity-0 group-hover:opacity-100", // hover时显示
                  "transform scale-90 group-hover:scale-100"
                )}>
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-full p-2">
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-contain rounded-lg"
                  priority={index === 0}
                />

                <div
                  className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md 
                          text-white px-2 py-1 rounded-md text-xs font-medium">
                  {index + 1}/{previewImage.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 顶部操作栏 */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* 清空按钮 */}
        {previewImage.length > 0 && (
          <button
            onClick={onClearImages} // 需要添加这个回调函数
            className={cn(
              "px-3 py-1.5",
              "bg-red-500 hover:bg-red-600",
              "text-white text-sm font-medium",
              "rounded-full",
              "flex items-center gap-2",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-200"
            )}>
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}

        {/* 图片数量提示 */}
        {previewImage.length > 1 && (
          <div
            className="bg-black/50 backdrop-blur-md 
                    text-white px-3 py-1.5 rounded-full 
                    text-sm font-medium">
            {previewImage.length} images
          </div>
        )}
      </div>
    </div>
  ) : (
    // 上传状态
    <div
      {...getRootProps()}
      className={cn(
        "h-full",
        "border-2 border-dashed border-primary/25 hover:border-primary/50",
        "transition-all duration-300",
        isDragActive && "bg-primary/5",
        isUploading && "pointer-events-none opacity-50"
      )}>
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6">
          {isUploading ? (
            // 上传中状态
            <div className="space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Uploading your image...
                </h3>
                <div className="w-64 mx-auto space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {uploadProgress}% uploaded
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // 默认上传界面
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Drop your image here or click to browse,max 10 images
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supports PNG, JPG, JPEG, WEBP (max 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 拖拽提示 */}

      {isDragActive && !isUploading && (
        <div
          className="absolute inset-0 bg-primary/10 backdrop-blur-sm
                             flex items-center justify-center pointer-events-none">
          <div className="bg-background/95 shadow-lg rounded-xl p-6">
            <p className="text-lg font-medium text-primary">
              Drop to create magic! ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
