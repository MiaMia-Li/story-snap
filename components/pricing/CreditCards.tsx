import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Package, Zap } from "lucide-react";
import CheckoutButton from "./CheckoutButton";

export default function CreditCards({ packagePlans }: { packagePlans: any }) {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Purchase Credits
        </h2>
        <p className="text-muted-foreground">
          Choose a package that fits your needs
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {packagePlans.map((pkg: any) => (
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
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{pkg.name}</CardTitle>
                <span className="text-2xl font-bold text-foreground">
                  ${pkg.price}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap
                  className={`h-4 w-4 ${pkg.popular ? "text-primary" : ""}`}
                />
                <span>{pkg.credits} Credits</span>
              </div>

              <CheckoutButton
                priceId={pkg.priceId}
                buttonConfig={{
                  text: "Purchase",
                  className: `w-full ${
                    pkg.popular
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`,
                }}
                plan={pkg}
              />

              {pkg.bonus && (
                <div className="text-xs text-center text-green-600">
                  + {pkg.bonus} Bonus Credits
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
