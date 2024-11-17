// components/pricing.tsx
"use client";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserSubscriptionPlan } from "@/types";
import CheckoutButton from "./CheckoutButton";
import { useDictionary } from "@/contexts/dictionary";

export function PricingCards({
  userId,
  subscriptionPlan,
}: {
  userId: string | undefined;
  subscriptionPlan?: UserSubscriptionPlan | null;
}) {
  const t = useDictionary();

  const PACKAGE_PLANS = [
    {
      id: "basic",
      name: "Starter Pack",
      credits: 30,
      price: 9,
      pricePerCredit: "0.30",
      features: [
        t.pricing.features.highQualityGeneration,
        t.pricing.features.allStoriesAvailable,
        t.pricing.features.noTimeLimit,
        t.pricing.features.emailSupport,
      ],
      popular: false,
      priceId: process.env.NEXT_PUBLIC_PRICE_30,
    },
    {
      id: "pro",
      name: "Professional Pack",
      credits: 100,
      price: 19,
      pricePerCredit: "0.19",
      features: [
        t.pricing.features.highQualityGeneration,
        t.pricing.features.allStoriesAvailable,
        t.pricing.features.noTimeLimit,
        t.pricing.features.emailSupport,
      ],
      popular: true,
      priceId: process.env.NEXT_PUBLIC_PRICE_100,
    },
    {
      id: "business",
      name: "Business Pack",
      credits: 200,
      price: 29,
      pricePerCredit: "0.15",
      features: [
        t.pricing.features.highQualityGeneration,
        t.pricing.features.allStoriesAvailable,
        t.pricing.features.noTimeLimit,
        t.pricing.features.emailSupport,
      ],
      popular: false,
      priceId: process.env.NEXT_PUBLIC_PRICE_200,
    },
  ];

  const getButtonConfig = (planId: string) => {
    if (!userId) {
      return {
        text: t.pricing.signButton,
        disabled: true,
        tooltip: "Please sign in to purchase credits",
      };
    }

    if (subscriptionPlan?.isPro && planId === subscriptionPlan.planId) {
      return {
        text: "Current Plan",
        disabled: true,
        tooltip: "This is your current plan",
      };
    }

    if (subscriptionPlan?.credits === 0) {
      return {
        text: "Pay Now",
        disabled: false,
        tooltip: "Purchase more credits",
      };
    }

    return {
      text: t.pricing.buyButton,
      disabled: false,
      tooltip: "Add additional credits to your account",
    };
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 items-start">
      {PACKAGE_PLANS.map((plan) => {
        const buttonConfig = getButtonConfig(plan.name);
        return (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col transition-all duration-200 hover:shadow-lg",
              {
                "border-2 border-primary": plan.popular,
              }
            )}>
            <CardHeader className="space-y-2">
              {plan.popular && (
                <Badge
                  className="w-fit bg-primary/10 text-primary border-primary mb-2"
                  variant="outline">
                  <Zap className="mr-1 h-3 w-3 fill-primary" />
                  {t.pricing.best}
                </Badge>
              )}
              <CardTitle className="text-2xl font-bold">
                {plan.credits} {t.pricing.credits}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-6">
                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      USD
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.per} {plan.pricePerCredit} {t.pricing.credits}
                  </p>
                </div>

                {/* Credits Badge */}
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Badge variant="secondary" className="px-3 py-1">
                    {plan.credits} {t.pricing.credits}
                  </Badge>
                  <span className="text-sm">{t.pricing.onetime}</span>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="h-px bg-border" />
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-8">
              <div className="w-full relative group">
                <CheckoutButton
                  priceId={plan.priceId}
                  buttonConfig={buttonConfig}
                  plan={plan}
                />
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
