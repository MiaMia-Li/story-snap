"use client";

import { LoginDialog } from "@/components/header/LoginDialog";
import { AuthProvider } from "@/contexts/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LoginDialog />
      {children}
    </AuthProvider>
  );
}
