import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log("webhook received", request);
}
