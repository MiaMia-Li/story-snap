import React from "react";
import { Message, useChat } from "ai/react";
import ChatList from "./chat-list";
import { ChatRequestOptions } from "ai";
import { v4 as uuidv4 } from "uuid";
import ResumeBar from "../resume/resume-bar";

export interface ChatProps {
  chatId?: string;
  setSelectedModel?: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  loadingSubmit?: boolean;
  error: undefined | Error;
  stop: () => void;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: string;
  }) => void;
  formRef: React.RefObject<HTMLFormElement>;
  isMobile?: boolean;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  setMessages: (messages: Message[]) => void;
}

export default function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  setSelectedModel,
  chatId,
  loadingSubmit,
  formRef,
  isMobile,
  addToolResult,
  setInput,
  setMessages,
}: ChatProps) {
  return (
    <div className="flex flex-col justify-between w-full h-full ">
      {/* <ChatTopbar
        setSelectedModel={setSelectedModel}
        isLoading={isLoading}
        chatId={chatId}
        messages={messages}
        setMessages={setMessages}
      /> */}

      <ChatList
        addToolResult={addToolResult}
        setSelectedModel={setSelectedModel}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        loadingSubmit={loadingSubmit}
        error={error}
        stop={stop}
        formRef={formRef}
        isMobile={isMobile}
        setMessages={setMessages}
      />

      {/* <ResumeBar
        addToolResult={addToolResult}
        // setSelectedModel={setSelectedModel}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
        formRef={formRef}
        setInput={setInput}
        setMessages={setMessages}
      /> */}
    </div>
  );
}
