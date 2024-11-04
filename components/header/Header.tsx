import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserLogin from "./UserLogin";
import UserMenu from "./UserMenu";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100/20 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-blue-900/20 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src="/pengiun-logo.png"
            alt="Logo"
            width={150}
            height={60}
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle Button */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900">
            <ThemeButton />
          </div>

          {/* User Section */}
          <div className="relative">
            {!session?.user.id ? (
              <div className="animate-fade-in">
                <UserLogin />
              </div>
            ) : (
              <div className="animate-fade-in">
                <UserMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
