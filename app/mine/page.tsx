// app/stories/page.tsx
"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { useState } from "react";
import StoriesPage from "./StoriesPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };
  const session = useSession();
  console.log("--session", session);
  if (!session.data) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex">
        <Sidebar onToggle={handleSidebarToggle} className="hidden lg:flex" />
        <main
          className={cn(
            "flex-1 transition-all duration-200 w-full h-full",
            isSidebarExpanded ? "lg:ml-64" : "lg:ml-16"
          )}>
          <StoriesPage />
        </main>
      </div>
    </>
  );
}
