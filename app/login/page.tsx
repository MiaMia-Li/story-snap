"use client";

import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
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
      console.log("searchParams.callbackUrl", searchParams.callbackUrl || "/");
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: searchParams.callbackUrl || "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Brief Introduction */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Image
              src="/penguin.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Create Stunning Stories with AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your ideas into captivating stories and illustrations.
              Our AI-powered platform helps you craft unique narratives with
              matching visuals in seconds.
            </p>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <Card className="backdrop-blur-xl bg-card/80">
          <CardHeader className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading !== null}
              onClick={() => handleSignIn("google")}
              className="w-full h-11">
              <div className="flex items-center justify-center gap-3">
                <FaGoogle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>
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
              className="w-full h-11">
              <div className="flex items-center justify-center gap-3">
                <FaGithub className="w-5 h-5" />
                <span>
                  {isLoading === "github"
                    ? "Connecting..."
                    : "Continue with GitHub"}
                </span>
              </div>
            </Button>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-muted-foreground px-6">
              By continuing, you agree to our{" "}
              <Link
                href="terms-of-service"
                className="underline hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="privacy-policy"
                onClick={() => router.push("/privacy")}
                className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
