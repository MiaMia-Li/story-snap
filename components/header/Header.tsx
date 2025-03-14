import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

import UserLogin from "./UserLogin";
import UserMenu from "./UserMenu";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import Credits from "./Credits";
import { LangButton } from "./LangButton";

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src="/penguin.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="md:text-2xl text-xl font-bold">
            Snap<span className="text-primary">Story</span>
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* User Section */}
          <div className="relative">
            {!session?.user.id ? (
              <div className="animate-fade-in">
                <UserLogin />
              </div>
            ) : (
              <div className="animate-fade-in flex items-center gap-2">
                <div className="flex items-center">
                  <Link
                    href="/generate-story"
                    className="text-md hover:text-primary hidden md:block">
                    GenStory
                  </Link>
                  <Separator
                    orientation="vertical"
                    className="h-6 mx-2 hidden md:block"
                  />
                  <Credits />
                  <Separator orientation="vertical" className="h-6 mx-2" />
                </div>
                <UserMenu />
              </div>
            )}
          </div>
          {/* Theme Toggle Button */}
          <div className="hidden md:flex ">
            <ThemeButton />
            <LangButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
