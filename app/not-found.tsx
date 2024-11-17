// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Elegant 404 Display */}
            <div className="relative">
              <div className="relative">
                <h1 className="text-[130px] md:text-[180px] font-bold text-primary/10 leading-none select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-light text-primary">
                  Page Not Found
                </div>
              </div>
            </div>

            {/* Elegant Message */}
            <div className="space-y-6 max-w-xl">
              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
                The page you&apos;re looking for seems to have wandered off into
                the digital sunset.
              </p>
              <p className="text-muted-foreground">
                Let us guide you back to familiar territory.
              </p>
            </div>

            {/* Elegant Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button className="min-w-[200px] h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Return Home
                </Button>
              </Link>
              {/* <Link href="/sitemap">
                <Button
                  variant="outline"
                  className="min-w-[200px] h-12 border-primary/20 hover:bg-primary/5">
                  View Sitemap
                </Button>
              </Link> */}
            </div>
          </div>

          {/* Right Side - Elegant Illustration */}
          <div className="hidden lg:block">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Elegant Abstract Design */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Circular Design Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary/15 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/10 rounded-full" />

                    {/* Decorative Dots */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />

                    {/* Center Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
