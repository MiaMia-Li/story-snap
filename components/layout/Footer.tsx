import Link from "next/link";
import { Button } from "../ui/button";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
export default function Footer() {
  const socialLinks = [
    {
      icon: <TwitterLogoIcon className="h-4 w-4" />,
      href: "https://x.com/snapstoryAI",
      label: "Twitter",
    },
    {
      icon: <DiscordLogoIcon className="h-4 w-4" />,
      href: "https://discord.gg/z5NbSzm9",
      label: "Discord",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      href: "/feedback",
      label: "Feedback",
    },
  ];

  const navLinks = [
    {
      href: "/generate-story",
      label: "Features",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/examples",
      label: "Examples",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-10">
      <div className="mx-auto max-w-7xl justify-between px-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Logo and Description Column */}
        <div className="space-y-4">
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
            <span className="md:text-2xl text-xl font-bold">SnapStory</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <Link
              href="https://pagegen.ai"
              target="_blank"
              className="text-primary hover:text-primary/80 transition-colors mr-6">
              pagegen
            </Link>
            {/* © {new Date().getFullYear()} All Rights Reserved */}
          </p>
          <p className="text-sm text-muted-foreground">
            Transform your images into engaging stories with the power of AI.
          </p>
        </div>
        <div className="space-y-4">
          {/* Product Column */}
          <div className="space-y-2">
            <h4 className="font-semibold">Product</h4>
            <ul className="flex space-x-6 text-sm">
              {navLinks.map((nav) => (
                <li>
                  <Link
                    href={nav.href}
                    className="text-muted-foreground hover:text-primary">
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="flex space-x-6 text-sm">
              {" "}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              {/* <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-primary">
                    Licenses
                  </Link>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* Social Links */}
      <div className="mt-6 flex flex-col items-center space-y-4 mx-auto max-w-7xl">
        <div className="flex space-x-6">
          {socialLinks.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              aria-label={social.label}>
              <Button variant="ghost" size="icon">
                {social.icon}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-6 border-t pt-6 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {""}
            SnapStory. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
