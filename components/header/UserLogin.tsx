"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import EmailSign from "./EmailSign";

interface UserLoginProps {
  buttonText?: string;
  buttonClassName?: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function UserLogin({
  buttonText = "Sign in",
  buttonClassName,
  buttonVariant = "default",
}: UserLoginProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className={cn(
            "rounded-full bg-gradient-to-r from-primary to-primary/80",
            "text-primary-foreground hover:from-primary/90 hover:to-primary/70",
            "dark:from-primary/90 dark:to-primary/70",
            buttonClassName
          )}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] border-border/20 dark:border-border/20">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary/90 dark:to-primary/70">
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
            className={cn(
              "h-11 rounded-lg border-border",
              "bg-background/50 hover:bg-accent/50",
              "hover:border-border/80",
              "dark:border-border/50 dark:bg-background/5",
              "dark:hover:bg-accent/20 dark:hover:border-border/80",
              "transition-all duration-200"
            )}>
            <div className="flex items-center justify-center gap-3">
              <FaGoogle
                className={cn(
                  "w-5 h-5",
                  isLoading === "google"
                    ? "text-foreground/40"
                    : "text-foreground dark:text-foreground/90"
                )}
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
            className={cn(
              "h-11 rounded-lg border-border",
              "bg-background/50 hover:bg-accent/50",
              "hover:border-border/80",
              "dark:border-border/50 dark:bg-background/5",
              "dark:hover:bg-accent/20 dark:hover:border-border/80",
              "transition-all duration-200"
            )}>
            <div className="flex items-center justify-center gap-3">
              <FaGithub
                className={cn(
                  "w-5 h-5",
                  isLoading === "github"
                    ? "text-foreground/40"
                    : "text-foreground dark:text-foreground/90"
                )}
              />
              <span className="text-sm font-medium">
                {isLoading === "github"
                  ? "Connecting..."
                  : "Continue with GitHub"}
              </span>
            </div>
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">
              OR Sign in with Email{" "}
            </span>
          </div>
          <EmailSign />

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <button
              onClick={() => window.open("/terms-of-service", "_blank")}
              className="text-primary hover:text-primary/90 dark:text-primary/90 dark:hover:text-primary/80 transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => window.open("/privacy-policy", "_blank")}
              className="text-primary hover:text-primary/90 dark:text-primary/90 dark:hover:text-primary/80 transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
