import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { ImageUploadSingle } from "../story/ImageUploadSingle";
import { uploadFile } from "@/utils";

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
  keyword: string;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function VideoForm({
  onGenerate,
  isLoading,
  credits,
}: FormSectionProps) {
  // State
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [keyword, setKeyword] = useState("");

  // Hooks
  const t = useTranslations("generateStory");
  const { requireAuth } = useAuth();

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      const data = await uploadFile(file);
      if (!data.url) {
        throw new Error("Failed to get upload URL");
      }
      return data.url;
    } catch (error) {
      console.error("Upload image error:", error);
      throw error;
    }
  }, []);

  const handleImageDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedImages.length + acceptedFiles.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      setIsUploading(true);

      try {
        const newImages = await Promise.all(
          acceptedFiles.map(async (file) => {
            try {
              const url = await uploadImage(file);
              return {
                file,
                preview: URL.createObjectURL(file),
                url,
              };
            } catch (error) {
              // 单个文件上传失败时，显示具体错误但继续处理其他文件
              toast.error(
                `Failed to upload ${file.name}: ${(error as Error).message}`
              );
              return null;
            }
          })
        );

        // 过滤掉上传失败的图片
        const successfulUploads = newImages.filter(
          (image): image is NonNullable<typeof image> => image !== null
        );

        if (successfulUploads.length > 0) {
          setUploadedImages((prev) => [...prev, ...successfulUploads]);
        }

        if (successfulUploads.length < acceptedFiles.length) {
          toast.warning(
            `${
              acceptedFiles.length - successfulUploads.length
            } images failed to upload`
          );
        }
      } catch (error) {
        toast.error("Failed to process images");
        console.error("Image processing failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadedImages.length, uploadImage]
  );

  const handleDropRejected = useCallback((fileRejections: any[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error: { code: string }) => {
        switch (error.code) {
          case "file-too-large":
            toast.error(`${file.name} is too large. Max size is 5MB`);
            break;
          case "file-invalid-type":
            toast.error(
              `${file.name} is not a valid file type. Only JPG, PNG and WebP are allowed`
            );
            break;
          default:
            toast.error(`Error uploading ${file.name}`);
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
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
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

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onGenerate({
        images: uploadedImages,
        keyword,
      });
    },
    [uploadedImages, keyword, onGenerate]
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
            5
          </span>
          <span className="text-muted-foreground">credits</span>
        </div>
      </div>
    </div>
  );
}
