"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import useStyleStore from "@/hooks/useStyleStore";
import { PageHeader } from "./PageHeader";
import { StoryContent } from "./StoryContent";

export function StoryGenerator() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <LoginDialog />
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6">
        <PageHeader />
        <StoryContent />
      </div>
    </main>
  );
}
