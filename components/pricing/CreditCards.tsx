import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { PACKAGE_PLANS } from "./PricingCards";
import CheckoutButton from "./CheckoutButton";

export default function CreditCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Purchase Credits</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {PACKAGE_PLANS.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative ${pkg.popular ? "border-primary" : ""}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">${pkg.price}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{pkg.credits} Credits</span>
              </div>
              <CheckoutButton
                priceId={pkg.priceId}
                buttonConfig={{
                  text: "Purchase",
                  disabled: false,
                }}
                plan={pkg}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
