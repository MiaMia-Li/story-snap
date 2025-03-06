"use client";

import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Crown,
  Sparkles,
  LayoutDashboard,
  ArrowRightToLine,
  ArrowLeftFromLine,
  Video,
  Image,
} from "lucide-react"; // Import icons for toggle
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useSidebarStore } from "@/hooks/useSidebarStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import { QueuePanel } from "../common/QueuePanel";

interface SidebarProps {
  className?: string;
  onToggle: (expanded: boolean) => void; // Callback to notify parent component
}

const navLinks = [
  {
    href: "/generate-story",
    label: "Image Story",
    icon: <Image className="w-5 h-5" />,
  },
  {
    href: "/generate-video",
    label: "Video Story",
    icon: <Video className="w-5 h-5" />,
    isNew: true,
  },
  {
    href: "/mine",
    label: "Mine",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: "/credits",
    label: "Subscribe",
    icon: <Crown className="w-5 h-5" />,
  },
];

const socialLinks = [
  {
    icon: <TwitterLogoIcon className="h-4 w-4" />,
    href: "https://x.com/snapstoryAI",
    label: "Twitter",
  },
  {
    icon: <DiscordLogoIcon className="h-4 w-4" />,
    href: "https://discord.gg/3pu9Vkx2kf",
    label: "Discord",
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    href: "/feedback",
    label: "Feedback",
  },
];

const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: `@SnapStory ${currentYear}`, href: "/" },
];

export function Sidebar({ className, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { expanded, setExpanded, toggleExpanded } = useSidebarStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      onToggle(expanded);
    }
  }, [expanded, onToggle, mounted]);

  if (!mounted) {
    return (
      <aside className={cn("h-screen", className)}>
        {/* 骨架屏或加载状态 */}
      </aside>
    );
  }
  return (
    <>
      <QueuePanel />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col top-[65px]",
          "border-r border-border bg-background/80 backdrop-blur-xl",
          "w-16 transition-all duration-300 ease-in-out py-6",
          expanded ? "w-64" : "",
          className
        )}>
        {/* Menu Area */}
        <nav className="flex-1 space-y-1 p-2 overflow-hidden">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center",
                "rounded-lg px-3 py-2",
                "text-sm font-medium",
                "transition-all duration-100 ease-in-out",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-ring focus-visible:ring-offset-2",
                pathname === item.href && "bg-accent/50 text-primary",
                "relative"
              )}>
              <div className="flex items-center gap-3 w-full">
                {expanded ? (
                  <div className="min-w-[20px]">{item.icon}</div>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="min-w-[20px]">{item.icon}</div>
                      </TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <span
                  className={cn(
                    "whitespace-nowrap opacity-0 transition-all duration-100 ease-in-out flex gap-6",
                    expanded && "opacity-100"
                  )}>
                  <span>{item.label}</span>
                  {item.isNew && <Badge> New</Badge>}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Social Media Buttons */}
        <div
          className={cn(
            "px-2 py-4",
            "transition-all duration-100 ease-in-out"
          )}>
          <div
            className={cn(
              "flex gap-2",
              "transition-all duration-100 ease-in-out",
              expanded ? "flex-row justify-center" : "flex-col items-center"
            )}>
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 rounded-lg",
                  "hover:bg-accent hover:text-accent-foreground",
                  "transition-colors duration-100",
                  "group relative rounded-full border border-border"
                )}>
                {social.icon}
              </Link>
            ))}
            <button
              onClick={toggleExpanded}
              className={cn(
                "p-2 rounded-lg",
                "hover:bg-accent hover:text-accent-foreground",
                "transition-colors duration-100",
                "group relative rounded-full border border-border"
              )}>
              {expanded ? (
                <ArrowLeftFromLine className="w-4 h-4" />
              ) : (
                <ArrowRightToLine className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Footer Links - Only show when expanded */}
        {expanded && (
          <div
            className={cn(
              "px-3 py-4 border-t border-border",
              "text-xs text-muted-foreground",
              "transition-all duration-100 ease-in-out"
            )}>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground transition-colors duration-100 text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
