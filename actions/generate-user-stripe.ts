"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = "https://chat-ai-rho-one.vercel.app/pricing";

export async function generateUserStripe(
  priceId: string
): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    console.log("user", user);

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    console.log("subscriptionPlan", subscriptionPlan);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to generate user stripe session", { cause: error });
  }

  // no revalidatePath because redirect
  redirect(redirectUrl);
}
