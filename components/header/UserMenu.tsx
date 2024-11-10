"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircledIcon,
  RocketIcon,
  ExitIcon,
  GearIcon,
  MixIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import useUserStore from "@/app/hooks/useUserStore";
import Link from "next/link";
import { motion } from "framer-motion"; // 可选：添加动画效果
import { Button } from "../ui/button";
import Credits from "./Credits";

interface User {
  id: string | undefined;
  name: string | undefined;
  email?: string | undefined;
  image: string | undefined;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

const MenuItem = ({
  icon,
  label,
  href,
  onClick,
  variant = "default",
}: MenuItemProps) => {
  const content = (
    <div
      className={`flex w-full gap-2.5 items-center cursor-pointer text-sm ${
        variant === "danger"
          ? "text-red-600 dark:text-red-400"
          : "text-gray-700 dark:text-gray-200"
      }`}>
      {icon}
      {label}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="w-full">
        <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-900/20">
          {content}
        </DropdownMenuItem>
      </Link>
    );
  }

  return (
    <DropdownMenuItem
      asChild
      onClick={onClick}
      className="focus:bg-blue-50 dark:focus:bg-blue-900/20">
      {content}
    </DropdownMenuItem>
  );
};

export default function UserMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image ?? undefined,
      } as User);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [session, setUser]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border border-blue-100 hover:bg-blue-50/50 dark:border-blue-900 dark:hover:bg-blue-900/20">
          <Avatar className="h-9 w-9 transition-all">
            <AvatarImage
              src={user?.image}
              alt={user?.name || "User avatar"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-500 dark:to-indigo-500">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 border-blue-100/20 dark:border-blue-900/20">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-blue-100/20 dark:bg-blue-900/20" />
        <DropdownMenuGroup>
          <div className="space-y-1">
            <MenuItem
              icon={<RocketIcon className="h-4 w-4" />}
              label="Buy Credits"
              href="/pricing"
            />
            <MenuItem
              icon={<PersonIcon className="h-4 w-4" />}
              label="Generate Story"
              href="/generate-story"
            />
            <MenuItem
              icon={<MixIcon className="h-4 w-4" />}
              label="Dashboard"
              href="/dashboard"
            />
            {/* <MenuItem
            icon={<GearIcon className="h-4 w-4" />}
            label="Settings"
            href="/settings"
          /> */}
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-blue-100/20 dark:bg-blue-900/20" />

        <MenuItem
          icon={<ExitIcon className="h-4 w-4" />}
          label="Sign out"
          onClick={handleSignOut}
          variant="danger"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
