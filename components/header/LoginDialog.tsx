// components/auth/login-dialog.tsx
"use client";

import { useAuth } from "@/contexts/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export function LoginDialog() {
  const { showLoginDialog, closeLoginDialog } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: window.location.pathname });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={closeLoginDialog}>
      <DialogContent className="sm:max-w-[420px] border-blue-100/20 dark:border-blue-900/20">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Welcome Back
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Continue with your preferred platform
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleSignIn("google")}
            className="h-11 rounded-lg border-blue-100 bg-white/50 hover:bg-blue-50/50 hover:border-blue-200 dark:border-blue-900/50 dark:bg-white/5 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <FaGoogle
                className={`w-5 h-5 ${
                  isLoading === "google"
                    ? "text-blue-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              />
              <span className="text-sm font-medium">
                {isLoading === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </span>
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleSignIn("github")}
            className="h-11 rounded-lg border-blue-100 bg-white/50 hover:bg-blue-50/50 hover:border-blue-200 dark:border-blue-900/50 dark:bg-white/5 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <FaGithub
                className={`w-5 h-5 ${
                  isLoading === "github"
                    ? "text-gray-400"
                    : "text-gray-900 dark:text-white"
                }`}
              />
              <span className="text-sm font-medium">
                {isLoading === "github"
                  ? "Connecting..."
                  : "Continue with GitHub"}
              </span>
            </div>
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <button
              onClick={() => window.open("/terms", "_blank")}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => window.open("/privacy", "_blank")}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}