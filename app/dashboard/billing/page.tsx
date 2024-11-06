// app/dashboard/billing/page.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Coins,
  ArrowUpCircle,
  ArrowDownCircle,
  Zap,
  Package,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CreditCards from "@/components/pricing/CreditCards";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
}

interface Transaction {
  id: string;
  date: string;
  type: "credit_purchase" | "credit_usage";
  amount: number;
  description: string;
  creditsAmount: number;
}

export default function BillingPage() {
  const session = useSession();
  const [currentCredits, setCurrentCredits] = useState(
    session?.data?.user?.credits
  );

  // Transaction history
  const transactions: Transaction[] = [
    {
      id: "txn_1",
      date: "2024-01-06",
      type: "credit_purchase",
      amount: 45,
      description: "Purchased Professional Credit Pack",
      creditsAmount: 500,
    },
    {
      id: "txn_2",
      date: "2024-01-05",
      type: "credit_usage",
      amount: 0,
      description: "Generated Story with Images",
      creditsAmount: -10,
    },
    {
      id: "txn_3",
      date: "2024-01-04",
      type: "credit_usage",
      amount: 0,
      description: "Generated Story with Images",
      creditsAmount: -10,
    },
  ];

  return (
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
                {currentCredits} Credits
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
      <CreditCards />

      {/* Transaction History */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Your recent credit purchases and usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {transaction.type === "credit_purchase" ? (
                    <ArrowUpCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-8 w-8 text-blue-500" />
                  )}
                  <div className="space-y-1">
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{transaction.id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${
                      transaction.type === "credit_purchase"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}>
                    {transaction.type === "credit_purchase" ? "+" : ""}
                    {transaction.creditsAmount} Credits
                  </div>
                  {transaction.amount > 0 && (
                    <div className="text-sm text-muted-foreground">
                      ${transaction.amount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
