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

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.statusCode || 500 }
    );
  }
}
