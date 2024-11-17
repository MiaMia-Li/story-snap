// components/FormSection.jsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

import { useDropzone } from "react-dropzone";
import { useAuth } from "@/contexts/auth";

// import { ImageStyleSelector } from "./ImageStyleSelector";
import { ImageUploadSingle } from "./ImageUploadSingle";
import { LanguageSelector } from "./LangSelector";

import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import ToneSelector from "./ToneSelector";

import { StyleSelector } from "./ImageStyle";
import { useParams } from "next/dist/client/components/navigation";
import { TEMPLATE_IMAGES } from "@/config/story";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
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

  const t = useTranslations("generateStory");
  const locale = useLocale();
  const [imageStyle, setImageStyle] = useState("");
  const [language, setLanguage] = useState<Locale>(locale as Locale);
  const [isUploading, setIsUploading] = useState(false);
  const { requireAuth } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("");

  // Define tone options
  const toneOptions = [
    { value: "professional", label: t("tone.professional") },
    { value: "friendly", label: t("tone.friendly") },
    { value: "humorous", label: t("tone.humorous") },
    { value: "formal", label: t("tone.formal") },
    { value: "casual", label: t("tone.casual") },
    { value: "enthusiastic", label: t("tone.enthusiastic") },
    { value: "empathetic", label: t("tone.empathetic") },
    { value: "direct", label: t("tone.direct") },
  ];

  const styleOptions = [
    {
      id: "realistic",
      name: t("imgStyle.realistic"),
      thumbnail: TEMPLATE_IMAGES.get("realistic")?.images[0],
    },
    {
      id: "anime",
      name: t("imgStyle.anime"),
      thumbnail: TEMPLATE_IMAGES.get("anime")?.images[0],
    },
    {
      id: "digital_art",
      name: t("imgStyle.digital_art"),
      thumbnail: TEMPLATE_IMAGES.get("digital_art")?.images[0],
    },
    {
      id: "oil_painting",
      name: t("imgStyle.oil_painting"),
      thumbnail: TEMPLATE_IMAGES.get("oil_painting")?.images[0],
    },
    {
      id: "watercolor",
      name: t("imgStyle.watercolor"),
      thumbnail: TEMPLATE_IMAGES.get("watercolor")?.images[0],
    },
    {
      id: "3d_render",
      name: t("imgStyle.3d_render"),
      thumbnail: TEMPLATE_IMAGES.get("3d_render")?.images[0],
    },
    {
      id: "pixel_art",
      name: t("imgStyle.pixel_art"),
      thumbnail: TEMPLATE_IMAGES.get("pixel_art")?.images[0],
    },
    {
      id: "comic",
      name: t("imgStyle.comic"),
      thumbnail: TEMPLATE_IMAGES.get("comic")?.images[0],
    },
    {
      id: "fantasy",
      name: t("imgStyle.fantasy"),
      thumbnail: TEMPLATE_IMAGES.get("fantasy")?.images[0],
    },
    {
      id: "cyberpunk",
      name: t("imgStyle.cyberpunk"),
      thumbnail: TEMPLATE_IMAGES.get("cyberpunk")?.images[0],
    },
    {
      id: "minimalist",
      name: t("imgStyle.minimalist"),
      thumbnail: TEMPLATE_IMAGES.get("minimalist")?.images[0],
    },
    {
      id: "cinematic",
      name: t("imgStyle.cinematic"),
      thumbnail: TEMPLATE_IMAGES.get("cinematic")?.images[0],
    },
  ];

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
      keyword,
      tone,
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
      {/* <ImageStyleSelector
        selectedStyle={imageStyle}
        onStyleSelect={setImageStyle}
      /> */}
      {/* 图片风格选择 */}
      <StyleSelector
        selectedStyle={imageStyle}
        onStyleSelect={setImageStyle}
        styleOptions={styleOptions}
      />
      <div className="space-y-2">
        <h3 className="font-semibold">{t("storyLanguage")}</h3>
        <LanguageSelector
          language={language}
          handleLanguageChange={setLanguage}
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{t("storyTone")}</h3>
        <ToneSelector
          toneOptions={toneOptions}
          tone={tone}
          handleToneChange={setTone}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">{t("storyKeywords")}</h3>
        <Textarea
          placeholder="Enter a keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

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
                <span className="animate-pulse">{t("craftingStory")}</span>
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                {t("generateButton")}
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
          {t("creditConsumption")}
        </p>
      </div>
    </div>
  );
}
