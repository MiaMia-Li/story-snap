// app/stories/page.tsx
"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { useState } from "react";
import StoriesPage from "./StoriesPage";
import { useSession } from "next-auth/react";
import { BookOpenIcon } from "lucide-react";
import UserLogin from "@/components/header/UserLogin";

export default function Page() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };
  const session = useSession();
  const LoginPrompt = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 p-6 bg-muted rounded-full inline-block">
          <BookOpenIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3">
          Sign in to View Your Stories
        </h2>
        <p className="text-muted-foreground mb-6">
          Please sign in to access your personal story collection and start
          creating amazing AI-generated stories.
        </p>
        <UserLogin
          buttonText="Sign In to Continue"
          buttonClassName="hover:scale-105 transition-transform duration-200"
          buttonVariant="default"
        />
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar onToggle={handleSidebarToggle} className="hidden lg:flex" />
      <main
        className={cn(
          "flex-1 transition-all duration-200 w-full h-full",
          isSidebarExpanded ? "lg:ml-64" : "lg:ml-16"
        )}>
        {/* <StoriesPage /> */}
        {!session.data ? <LoginPrompt /> : <StoriesPage />}
      </main>
    </div>
  );
}
