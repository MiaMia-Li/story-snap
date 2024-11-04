import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { RefreshCcw, Upload, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress"; // 确保你有这个组件

interface ImageUploadProps {
  previewImage: string | null;
  getRootProps: () => any;
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
  uploadProgress = 0,
  isUploading = false,
}: ImageUploadProps) {
  return previewImage ? (
    // 图片预览状态
    <div className="relative h-full">
      {/* 图片展示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full">
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-full object-contain"
        />
        {/* 半透明遮罩 */}
        {/* <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px]" /> */}
      </motion.div>

      {/* 重新上传按钮 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button
              variant="secondary"
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Change Image
                </>
              )}
            </Button>
          </div>
          {/* 上传进度显示 */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-64">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-center mt-2 text-muted-foreground">
                {uploadProgress}% uploaded
              </p>
            </motion.div>
          )}
        </motion.div>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6">
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
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-10 w-10 text-primary" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Drop your image here or click to browse
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supports PNG, JPG, JPEG, WEBP (max 10MB)
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* 拖拽提示 */}
      <AnimatePresence>
        {isDragActive && !isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm
                             flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-background/95 shadow-lg rounded-xl p-6">
              <p className="text-lg font-medium text-primary">
                Drop to create magic! ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
