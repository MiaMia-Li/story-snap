"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function CheckoutButton({
  priceId,
  buttonConfig,
  plan,
}: {
  priceId: string | number;
  buttonConfig: any;
  plan: any;
}) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true); // 添加加载状态

      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
        }),
      });

      const data = await response.json(); // 获取返回的JSON数据

      if (data.url) {
        window.location.assign(data.url); // 使用 assign 进行跳转
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong with the payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={buttonConfig.disabled}
      className={cn("w-full font-medium text-base", {
        "bg-primary hover:bg-primary/90 shadow-lg":
          plan.popular && !buttonConfig.disabled,
        "hover:bg-primary hover:text-primary-foreground":
          !plan.popular && !buttonConfig.disabled,
        "opacity-50 cursor-not-allowed": buttonConfig.disabled,
      })}>
      {buttonConfig.text}
    </Button>
  );
}
