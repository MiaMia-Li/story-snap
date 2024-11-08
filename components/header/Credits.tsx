"use client";

import { useAuth } from "@/contexts/auth";
import Link from "next/link";

export default function Credits() {
  const { credits } = useAuth();

  return (
    <Link className="text-md hover:text-primary" href="/pricing">
      {credits} credits
    </Link>
  );
}
