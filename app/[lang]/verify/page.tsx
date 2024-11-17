// app/check-email/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
export default function CheckEmailPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="container relative max-w-screen-xl mx-auto px-4">
        <Card className="w-full max-w-[520px] mx-auto">
          <CardHeader className="space-y-6 flex flex-col items-center pb-8 pt-12">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/penguin.png"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            <div className="space-y-4 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                Check your email
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground max-w-sm">
                A sign in link has been sent to your email address. Please check
                your inbox and click the link to continue.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4 pb-12">
            <Link href="/" className="w-full max-w-[280px]">
              <Button variant="default" className="w-full">
                Back to home
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80">
                try another email address
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
