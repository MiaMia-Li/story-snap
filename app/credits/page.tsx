// app/dashboard/billing/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Coins } from "lucide-react";
import Link from "next/link";
import CreditCards from "@/components/pricing/CreditCards";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { LoginDialog } from "@/components/header/LoginDialog";

export default function BillingPage() {
  const { refreshCredits, credits } = useAuth();

  const PACKAGE_PLANS = [
    {
      id: "basic",
      name: "Starter Pack",
      credits: 30,
      price: 9,
      pricePerCredit: "0.30",

      popular: false,
      priceId: process.env.NEXT_PUBLIC_PRICE_30,
    },
    {
      id: "pro",
      name: "Professional Pack",
      credits: 100,
      price: 19,
      pricePerCredit: "0.19",

      popular: true,
      priceId: process.env.NEXT_PUBLIC_PRICE_100,
    },
    {
      id: "business",
      name: "Business Pack",
      credits: 200,
      price: 29,
      pricePerCredit: "0.15",

      popular: false,
      priceId: process.env.NEXT_PUBLIC_PRICE_200,
    },
  ];

  return (
    <AuthProvider>
      <LoginDialog />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Credits & Billing</h1>
        </div>

        {/* Current Credits Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Coins className="h-6 w-6 text-yellow-500" />
                  {credits} Credits
                </h2>
                <p className="text-sm text-muted-foreground">
                  Available credits for generating stories
                </p>
              </div>
              <Link href="/pricing">
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy More Credits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Credit Packages */}
        <CreditCards packagePlans={PACKAGE_PLANS} />
      </div>
    </AuthProvider>
  );
}
