// app/stories/layout.tsx
"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export default function StoriesLayout({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };
  return (
    <div className="flex">
      <Sidebar className="hidden lg:flex" onToggle={handleSidebarToggle} />
      <main
        className={cn(
          "flex-1 transition-all duration-200",
          isSidebarExpanded ? "lg:ml-64" : "lg:ml-16"
        )}>
        {children}
      </main>
    </div>
  );
}
