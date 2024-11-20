// app/api/webhooks/stripe/route.ts
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// 配置
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// 定义价格和credits的映射关系
const PRICE_CREDIT_MAP = {
  [process.env.NEXT_PUBLIC_PRICE_30!]: 30,
  [process.env.NEXT_PUBLIC_PRICE_100!]: 100,
  [process.env.NEXT_PUBLIC_PRICE_200!]: 200,
};

export async function POST(req: Request) {
  console.log("webhook received");
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    // 验证 webhook 签名
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // 处理支付成功事件
  if (event.type === "checkout.session.completed") {
    try {
      // 获取价格ID
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const priceId = lineItems.data[0]?.price?.id;

      if (!priceId) {
        throw new Error("Price ID not found");
      }

      // 获取对应的 credits
      const creditsToAdd =
        PRICE_CREDIT_MAP[priceId as keyof typeof PRICE_CREDIT_MAP];

      if (!creditsToAdd) {
        throw new Error("Invalid price ID");
      }

      // 获取用户ID (从session的metadata中)
      const userId = session.metadata?.userId;
      console.log("userId", userId);

      if (!userId) {
        throw new Error("User ID not found in session metadata");
      }

      // 更新数据库
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          stripePriceId: true,
        },
      });
      console.log("user", user);

      const updatedStripePriceId = user?.stripePriceId
        ? `${user.stripePriceId},${priceId}` // 如果已有值，添加逗号和新值
        : priceId; // 如果是第一个值，直接使用

      console.log("updatedStripePriceId", updatedStripePriceId);

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          credits: {
            increment: creditsToAdd,
          },
          stripePriceId: updatedStripePriceId,
        },
      });

      console.log(
        `Successfully added ${creditsToAdd} credits to user ${userId}`
      );
    } catch (error) {
      console.error("Error processing webhook:", error);
      return NextResponse.json(
        { error: "Error processing webhook" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
