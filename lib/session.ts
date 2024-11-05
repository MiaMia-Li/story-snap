import "server-only";

import { cache } from "react";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  return session.user;
});

export const getUser = async (id: string) => {
  const { rows } = await sql`
          SELECT *
          FROM users
          WHERE id = ${id};
        `;
  return {
    ...rows[0],
    id: rows[0].id.toString(),
    emailVerified: rows[0].email_verified,
    email: rows[0].email,
    image: rows[0].image,
  };
};
