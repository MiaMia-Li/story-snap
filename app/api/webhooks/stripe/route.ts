// app/api/webhooks/stripe/route.ts
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// 定义价格和credits的映射关系
const PRICE_CREDIT_MAP = {
  price_1QHp0UP4SDLjMGpMGREmPNlN: 30, // 基础套餐
  // price_2xxxxxxxxxxxxx: 500, // 进阶套餐
  // price_3xxxxxxxxxxxxx: 1000, // 专业套餐
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

      if (!userId) {
        throw new Error("User ID not found in session metadata");
      }

      // 更新数据库
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          credits: {
            increment: creditsToAdd,
          },
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

// 配置 config 以禁用 body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
