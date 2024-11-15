// app/pricing/page.tsx
import { auth } from "@/auth";
import { PricingCards } from "@/components/pricing/PricingCards";
import { WhatsIncludes } from "@/components/pricing/WhatsIncludes";
import { EMAIL_ADDRESS } from "@/config/site";
import Link from "next/link";
import React, { useEffect } from "react";

export default async function PricingPage() {
  const session = await auth();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent rounded-3xl" />

          <div className="relative px-4">
            {/* Header Content */}
            <div className="flex flex-col items-center justify-center text-center py-12 md:py-16">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                Every user starts with 5 free credits. Purchase credits once,
                use them anytime. No subscriptions, no hidden fees.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="pb-10 max-w-6xl mx-auto">
              <PricingCards
                userId={session?.user?.id}
                subscriptionPlan={null}
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="px-4 my-8 md:my-12">
          <div className="h-px bg-border" />
        </div>

        {/* Features Section */}
        <section className="px-4">
          <WhatsIncludes />
        </section>

        {/* FAQ Section (Optional) */}
        <section className="px-4 py-12 md:py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team is here to help. Contact us anytime.
            </p>
            <Link
              href={`mailto:${EMAIL_ADDRESS}`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
