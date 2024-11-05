// app/payment/success/page.tsx
"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Add additional logic after successful payment if needed
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}>
        <Card className="w-[420px] border-0 shadow-xl bg-white rounded-xl">
          <CardHeader className="pt-8">
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="rounded-full bg-blue-50 p-3">
                <CheckCircle className="h-12 w-12 text-blue-600" />
              </motion.div>
              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Payment Successful
                </h2>
                <p className="text-zinc-500 text-sm">Order #2024-0123</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8">
            <div className="space-y-4">
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-600">Amount paid</span>
                  <span className="font-medium">$199.00</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm text-center">
                A confirmation email has been sent to your inbox
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 px-8 pb-8">
            <Button
              className="w-full bg-black hover:bg-black/90 text-white"
              onClick={() => router.push("/orders")}>
              View Order Details
            </Button>
            <Button
              variant="ghost"
              className="w-full text-zinc-600 hover:text-zinc-900"
              onClick={() => router.push("/")}>
              Return to Homepage
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
