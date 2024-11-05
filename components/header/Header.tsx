import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

import UserLogin from "./UserLogin";
import UserMenu from "./UserMenu";
import { auth } from "@/auth";
import { getCredits } from "@/lib/credits";
import { Separator } from "@/components/ui/separator";

const Header = async () => {
  const session = await auth();
  let credits = 0;
  if (session?.user.id) {
    credits = await getCredits();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100/20 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-blue-900/20 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
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
          <span className="text-2xl font-bold font-mono">StorySnap</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* User Section */}
          <div className="relative">
            {!session?.user.name ? (
              <div className="animate-fade-in">
                <UserLogin />
              </div>
            ) : (
              <div className="animate-fade-in flex items-center gap-2">
                {/* <Link href="/generate" className="text-md hover:text-primary">
                  GenStory
                </Link>
                <Separator orientation="vertical" className="h-6 mx-2" /> */}
                <Link href="pricing" className="text-md hover:text-primary">
                  {credits} credits
                </Link>
                <Separator orientation="vertical" className="h-6 mx-2" />
                <UserMenu />
              </div>
            )}
          </div>
          {/* Theme Toggle Button */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900">
            <ThemeButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
