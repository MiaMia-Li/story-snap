// ImageUpload.tsx
import { useDictionary } from "@/contexts/dictionary";
import { X, Upload, Trash2 } from "lucide-react";
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
  const t = useDictionary();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{t.generateStory.uploadImage}</h3>

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
                ? t.generateStory.dropImage
                : t.generateStory.dragDropImage}
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
              <li>{t.generateStory.uploadDescription}</li>
              <li>{t.generateStory.uploadDescription2}</li>
            </ul>
          </div>
        ) : (
          // Preview state
          <div className="space-y-4">
            {/* Header with delete all button */}
            {previewImage.length > 0 && (
              <div className="flex items-center justify-between w-full max-w-[300px] mx-auto px-2">
                <span className="text-sm text-gray-600">
                  {previewImage.length}{" "}
                  {previewImage.length > 1 ? "images" : "image"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearImages();
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:text-red-700 
          bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />{" "}
                  {/* Using Lucide React Trash2 icon */}
                  Delete All
                </button>
              </div>
            )}
            {/* Scrollable image preview container */}
            <div className="relative w-full max-w-[300px] mx-auto">
              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-2">
                  {previewImage.map((img, index) => (
                    <div key={index} className="flex-shrink-0">
                      <div className="relative w-[300px] aspect-square rounded-lg">
                        {isUploading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                          </div>
                        ) : (
                          <Image
                            src={img.preview}
                            alt="Upload preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        )}

                        {/* Image info and delete button overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-white truncate max-w-[200px]">
                              {img.file.name}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveImage(index);
                              }}
                              className="p-1.5 rounded-full bg-white/90 hover:bg-white 
                      transition-colors duration-200">
                              <X className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll indicators */}
              {previewImage.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  {previewImage.map((_, index) => (
                    <div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-white/70"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
