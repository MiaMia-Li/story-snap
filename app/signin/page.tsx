"use client";

import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiAtLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

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
      console.log("searchParams.callbackUrl", searchParams.callbackUrl);
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: searchParams.callbackUrl });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Brief Introduction */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <RiAtLine className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Resume Pro
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Transform Your Resume with AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Intelligent resume analysis and interview question generation
              powered by AI. Enhance your job application process with our
              advanced tools.
            </p>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading !== null}
                onClick={() => handleSignIn("google")}
                className="w-full h-11 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
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
                className="w-full h-11 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
                  <span>
                    {isLoading === "github"
                      ? "Connecting..."
                      : "Continue with GitHub"}
                  </span>
                </div>
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => router.push("/demo")}>
                Try Demo Version
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
