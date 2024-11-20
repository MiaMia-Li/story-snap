// components/FormSection.tsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useAuth } from "@/contexts/auth";
import { ImageUploadSingle } from "./ImageUploadSingle";
import { LanguageSelector } from "./LangSelector";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import ToneSelector from "./ToneSelector";
import { StyleSelector } from "./ImageStyle";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";

// Types
interface UploadedImage {
  file: File;
  preview: string;
  base64?: string;
}

interface FormSectionProps {
  onGenerate: (formData: FormData) => void;
  isLoading: boolean;
  credits: number;
}

interface FormData {
  images: UploadedImage[];
  imageStyles: string[];
  language: Locale;
  keyword: string;
  tone: string;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FormSection({
  onGenerate,
  isLoading,
  credits,
}: FormSectionProps) {
  // State
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageStyles, setImageStyles] = useState<string[]>([]);
  const [language, setLanguage] = useState<Locale>(useLocale() as Locale);
  const [isUploading, setIsUploading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("");

  // Hooks
  const t = useTranslations("generateStory");
  const { requireAuth } = useAuth();

  // Constants
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

  // Utility functions
  const toBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }, []);

  // Handlers
  const handleImageDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedImages.length + acceptedFiles.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
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
        console.error("Image processing failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadedImages.length, toBase64]
  );

  const handleDropRejected = useCallback((fileRejections: any[]) => {
    fileRejections.forEach(({ errors }) => {
      errors.forEach((error: { code: string }) => {
        if (error.code === "file-too-large") {
          toast.error("File size cannot exceed 5MB");
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) =>
      requireAuth(() => handleImageDrop(acceptedFiles)),
    onDropRejected: handleDropRejected,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    maxFiles: MAX_IMAGES,
  });

  const handleRemoveImage = useCallback((index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const handleStyleChange = useCallback((styleIds: string[]) => {
    setImageStyles(styleIds);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onGenerate({
        images: uploadedImages,
        imageStyles,
        language,
        keyword,
        tone,
      });
    },
    [uploadedImages, imageStyles, language, keyword, tone, onGenerate]
  );

  // Render helpers
  const renderButton = () => (
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
  );

  return (
    <div className="space-y-6">
      <ImageUploadSingle
        onClearImages={() => setUploadedImages([])}
        onRemoveImage={handleRemoveImage}
        previewImage={uploadedImages}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isUploading={isUploading}
      />

      <StyleSelector
        selectedStyles={imageStyles}
        onStyleSelect={handleStyleChange}
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
          placeholder={t("enterKeyword")}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">{renderButton()}</div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Cost:</span>
          <span className="font-mono text-lg font-semibold text-foreground">
            {imageStyles.length}
          </span>
          <span className="text-muted-foreground">credits</span>
        </div>
      </div>
    </div>
  );
}
