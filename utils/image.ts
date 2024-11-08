import { toast } from "sonner";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("File upload error:", error);
    toast.error((error as Error).message);
    return undefined;
  }
};
