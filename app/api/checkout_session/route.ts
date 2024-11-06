import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// 定义价格和credits的映射关系
const PRICE_CREDIT_MAP = {
  [process.env.NEXT_PUBLIC_PRICE_30!]: { credits: 30, bill: 9 },
  [process.env.NEXT_PUBLIC_PRICE_100!]: { credits: 100, bill: 19 },
  [process.env.NEXT_PUBLIC_PRICE_200!]: { credits: 200, bill: 29 },
};

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) throw new Error("Stripe secret key is not defined");

const stripe = new Stripe(stripeKey);

export async function POST(request: Request) {
  try {
    const session = await auth();
    const { priceId } = await request.json();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    // 获取价格信息
    const price = await stripe.prices.retrieve(priceId);
    const product = await stripe.products.retrieve(price.product as string);

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment/success?priceId=${priceId}&credits=${PRICE_CREDIT_MAP[priceId].credits}&bill=${PRICE_CREDIT_MAP[priceId].bill}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.statusCode || 500 }
    );
  }
}
