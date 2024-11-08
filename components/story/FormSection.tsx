// components/FormSection.jsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/auth";

import { ImageStyleSelector } from "./ImageStyleSelector";
import ImageUpload from "./ImageUpload";
import { ImageUploadSingle } from "./ImageUploadSingle";
import { LanguageSelector } from "./LangSelector";
import { Language } from "@/types";
export function FormSection({
  onGenerate,
}: {
  onGenerate: (formData: any) => void;
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

  // 处理图片拖拽上传
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => requireAuth(() => onDrop(acceptedFiles)),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
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
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }}
          className="w-full h-12 text-lg font-medium">
          Generate Image
        </Button>
        <p className="text-sm text-gray-500 text-center">
          This will consume 1 credit
        </p>
      </div>
    </div>
  );
}
