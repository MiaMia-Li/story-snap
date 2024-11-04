import Stripe from "stripe";

// import { env } from "@/env.mjs"

console.log("process.env.STRIPE_API_KEY", process.env.STRIPE_API_KEY);

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});
