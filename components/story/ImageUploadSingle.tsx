// ImageUpload.tsx
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

interface ImageUploadSingleProps {
  onClearImages: () => void;
  onRemoveImage: (index: number) => void;
  previewImage: Array<{
    file: File;
    preview: string;
  }>;
  getRootProps: (props?: any) => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isUploading: boolean;
}

export function ImageUploadSingle({
  onClearImages,
  onRemoveImage,
  previewImage,
  getRootProps,
  getInputProps,
  isDragActive,
  isUploading,
}: ImageUploadSingleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Upload Reference Image
      </h3>

      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          transition-colors duration-200 cursor-pointer
          hover:border-blue-500 hover:bg-gray-50 dark:hover:border-blue-400 dark:hover:bg-gray-800/50
        `}>
        <input {...getInputProps()} />

        {previewImage.length === 0 ? (
          // Empty state
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDragActive
                ? "Drop the image here..."
                : "Drag & drop an image here, or click to select"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Supports JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        ) : (
          // Preview state
          <div className="space-y-4">
            <div className="relative w-full max-w-[300px] mx-auto">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <Image
                    src={previewImage[0].preview}
                    alt="Upload preview"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <p className="text-sm text-gray-600 truncate max-w-[200px]">
                {previewImage[0].file.name}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(0);
                  }}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 
                    transition-colors duration-200">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
