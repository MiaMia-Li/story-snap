// components/CopyButton.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  content: string;
  className?: string;
}

export const CopyButton = ({ content, className = "" }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success("Copied to clipboard");

      // Reset copy status after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy. Please try again.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className={`h-8 w-8 ${className}`}>
      {isCopied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};
