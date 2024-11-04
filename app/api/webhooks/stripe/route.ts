import { headers } from "next/headers";
import Stripe from "stripe";

// import { env } from "@/env.mjs";
// import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  console.log("signature", signature);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log("event", event);
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("session", session);

    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await sql`
  UPDATE users 
  SET 
    stripe_subscription_id   = ${String(subscription.id)},
    stripe_customer_id = ${String(subscription.customer)},
    stripe_price_id = ${String(subscription.items.data[0].price.id)},
    stripe_current_period_end = to_timestamp(${subscription.current_period_end})
  WHERE id = ${session?.metadata?.userId}
`;
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      // // Update the price id and set the new period end.
      // await prisma.user.update({
      //   where: {
      //     stripeSubscriptionId: subscription.id,
      //   },
      //   data: {
      //     stripePriceId: subscription.items.data[0].price.id,
      //     stripeCurrentPeriodEnd: new Date(
      //       subscription.current_period_end * 1000
      //     ),
      //   },
      // });

      await sql`
  UPDATE users 
  SET 
    stripe_price_id = ${String(subscription.items.data[0].price.id)},
    stripe_current_period_end = ${subscription.current_period_end * 1000}
  WHERE stripeSubscriptionId = ${subscription.id}
  `;
    }
  }

  return new Response(null, { status: 200 });
}
