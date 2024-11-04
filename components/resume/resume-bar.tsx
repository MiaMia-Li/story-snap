"use client";

import React, { useEffect, useCallback } from "react";
import { ChatProps } from "../chat/chat";
import useChatStore from "@/app/hooks/useChatStore";
import { toast } from "sonner";
import PreviewAttachment from "../preview-attachment";
import FileUploader from "./FileUploader";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizonal } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import MultiFilePicker from "../file-embedder";
import Loading from "../loading";

export default function Resumebar({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  formRef,
  setInput,
}: ChatProps) {
  const attachments = useChatStore((state) => state.attachments);
  const setAttachments = useChatStore((state) => state.setAttachments);
  const [uploadQueue, setUploadQueue] = React.useState<string[]>([]);
  const chatRef = React.useRef<HTMLFormElement>(null);
  const uploadFile = useCallback(
    async (
      file: File
    ): Promise<
      | { url: string; name: string; contentType: string; content: string }
      | undefined
    > => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`/api/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Server error during file upload."
          );
        }

        const { url, pathname, contentType, markdown } = await response.json();
        return { url, name: pathname, contentType, content: markdown };
      } catch (error) {
        console.error("File upload error:", error);
        toast.error((error as Error).message || "Upload failed, try again.");
        return undefined;
      }
    },
    []
  );

  const handleFilesPick = useCallback(
    async (files: File[]) => {
      setUploadQueue(files.map((file) => file.name));
      try {
        const uploadPromises = files.map(uploadFile);
        const uploadedFiles = await Promise.all(uploadPromises);

        const validAttachments = uploadedFiles.filter(
          (
            file
          ): file is {
            url: string;
            name: string;
            contentType: string;
            content: string;
          } => file !== undefined
        );

        setAttachments((current) => [...(current || []), ...validAttachments]);
        setInput && setInput(validAttachments[0].content);
        setTimeout(() => {
          // 找到提交按钮并触发点击事件
          const submitButton = chatRef.current?.querySelector(
            'button[type="submit"]'
          );
          submitButton?.click();
        }, 0);

        // chatRef.current?.submit();
        // handleSubmit("" as unknown as React.FormEvent<HTMLFormElement>);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [uploadFile]
  );
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  return (
    <div>
      <div className="p-4 pb-7 flex justify-between w-full items-center gap-2">
        <AnimatePresence initial={false}>
          <div className="w-full items-center flex relative gap-2">
            <div className="flex flex-col relative w-full bg-accent dark:bg-card rounded-lg">
              <div className="flex w-full">
                <form
                  ref={chatRef}
                  onSubmit={handleSubmit}
                  className="w-full items-center flex relative gap-2">
                  <div className="absolute flex left-3 z-10">
                    <MultiFilePicker
                      disabled={false}
                      onFilesPick={handleFilesPick}
                    />
                  </div>
                  <TextareaAutosize
                    autoComplete="off"
                    value={input}
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    name="message"
                    placeholder={"Listening"}
                    className=" max-h-24 pr-14 pl-14 bg-accent py-[22px] rounded-lg  text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center h-16 resize-none overflow-hidden dark:bg-card"
                  />

                  {!isLoading ? (
                    <div className="flex absolute right-3 items-center">
                      <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="submit"
                        disabled={isLoading || !input?.trim()}>
                        <SendHorizonal className="w-5 h-5 " />
                      </Button>
                    </div>
                  ) : null}
                </form>
              </div>

              <div className="flex px-2 pb-2 gap-2 ">
                {((attachments && attachments.length > 0) ||
                  uploadQueue.length > 0) && (
                  <div className="flex flex-row gap-2">
                    {attachments &&
                      attachments.map((attachment, index) => (
                        <div key={index}>
                          <PreviewAttachment
                            key={attachment.url}
                            attachment={attachment}
                            onDelete={() => {
                              const updatedImages = (attachments: any) =>
                                attachments.filter((_, i) => i !== index);
                              setAttachments(updatedImages(attachments));
                            }}
                          />
                        </div>
                      ))}

                    {uploadQueue.map((filename) => (
                      <PreviewAttachment
                        key={filename}
                        attachment={{
                          url: "",
                          name: filename,
                          contentType: "",
                        }}
                        isUploading={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
