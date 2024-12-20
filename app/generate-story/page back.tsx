"use client";

import { AuthProvider } from "@/contexts/auth";
import { StoryGenerator } from "@/components/story/StoryGenerator";

export default function Home() {
  return (
    <AuthProvider>
      <StoryGenerator />
    </AuthProvider>
  );
}
