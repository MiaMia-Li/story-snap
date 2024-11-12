// components/FormSection.jsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

import { useDropzone } from "react-dropzone";
import { useAuth } from "@/contexts/auth";

import { ImageStyleSelector } from "./ImageStyleSelector";
import { ImageUploadSingle } from "./ImageUploadSingle";
import { LanguageSelector } from "./LangSelector";
import { Language } from "@/types";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
export function FormSection({
  onGenerate,
  isLoading,
}: {
  onGenerate: (formData: any) => void;
  isLoading: boolean;
}) {
  const [uploadedImages, setUploadedImages] = useState<
    {
      file: File;
      preview: string;
    }[]
  >([]);
  const [imageStyle, setImageStyle] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [isUploading, setIsUploading] = useState(false);
  const { requireAuth } = useAuth();

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 处理图片拖拽上传
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (uploadedImages.length + acceptedFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setIsUploading(true);
    try {
      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => ({
          file,
          preview: URL.createObjectURL(file),
          base64: await toBase64(file),
        }))
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      toast.error("Image processing failed");
      console.error("Image processing failed", error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => requireAuth(() => onDrop(acceptedFiles)),
    onDropRejected: (fileRejections) => {
      console.log("--fileRejections-", fileRejections);
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            toast.error("File size cannot exceed 5MB");
          }
        });
      });
    },
    maxSize: 5242880, // 5MB in bytes
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate({
      images: uploadedImages,
      imageStyle,
      language,
    });
  };

  return (
    <div className="space-y-8">
      {/* 图片上传区域 */}
      <ImageUploadSingle
        onClearImages={() => setUploadedImages([])}
        onRemoveImage={removeImage}
        previewImage={uploadedImages}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isUploading={isUploading}
      />

      {/* 图片风格选择 */}
      <ImageStyleSelector
        selectedStyle={imageStyle}
        onStyleSelect={setImageStyle}
      />
      <LanguageSelector
        language={language}
        handleLanguageChange={setLanguage}
      />

      {/* 生成按钮区域 */}
      <div className="space-y-4">
        <Button
          className="w-full h-12 group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            requireAuth(() =>
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
            );
          }}
          disabled={isLoading}>
          <div className="relative flex items-center justify-center">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="animate-pulse">Crafting your story...</span>
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Generate Story
              </>
            )}
          </div>
          {/* Enhanced Sparkle Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                "linear-gradient(45deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)",
              ],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        </Button>
        <p className="text-sm text-gray-500 text-center">
          This will consume 1 credit
        </p>
      </div>
    </div>
  );
}
