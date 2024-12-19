"use client";

import { VideoGenerator } from "@/components/video/VideoGenerator";
import { AuthProvider } from "@/contexts/auth";

export default function Home() {
  return (
    <AuthProvider>
      <VideoGenerator />
    </AuthProvider>
  );
}
