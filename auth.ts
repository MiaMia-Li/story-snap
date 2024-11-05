import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./lib/session";

declare module "next-auth" {
  interface Session {
    user: {
      stripePriceId?: string;
      stripeCurrentPeriodEnd?: Date;
      level?: number;
    } & DefaultSession["user"];
  }

  interface User {
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
    level?: number;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        const currentUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        if (currentUser && currentUser.credits === null) {
          await prisma.user.update({
            where: { id: token.sub },
            data: { credits: 5 },
          });
        }
        console.log("--currentUser", currentUser);

        if (currentUser) {
          session.user.level = currentUser.level;
          session.user.stripePriceId = currentUser.stripePriceId;
          session.user.stripeCurrentPeriodEnd =
            currentUser.stripeCurrentPeriodEnd;
        }
      }
      return session;
    },
  },
});
