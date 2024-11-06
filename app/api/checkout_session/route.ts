import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

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
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
      automatic_tax: { enabled: true },
    });

    const data = {
      userId: session.user.id,
      stripeSessionId: checkoutSession.id,
      amount: price.unit_amount ? price.unit_amount / 100 : 0, // Stripe 金额以分为单位
      currency: price.currency,
      status: "pending", // 支付状态：pending, completed, failed
      productName: product.name,
      productId: product.id,
      metadata: {
        priceId: priceId,
        checkoutUrl: checkoutSession.url,
      },
    };
    console.log(data, "----stripe");

    // 创建交易记录
    // await prisma.transaction.create({
    //   data: {
    //     userId: session.user.id,
    //     stripeSessionId: checkoutSession.id,
    //     amount: price.unit_amount ? price.unit_amount / 100 : 0, // Stripe 金额以分为单位
    //     currency: price.currency,
    //     status: "pending", // 支付状态：pending, completed, failed
    //     productName: product.name,
    //     productId: product.id,
    //     metadata: {
    //       priceId: priceId,
    //       checkoutUrl: checkoutSession.url,
    //     },
    //   },
    // });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.statusCode || 500 }
    );
  }
}
