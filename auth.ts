import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

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

        if (currentUser) {
          session.user.credits = currentUser.credits ?? undefined;
          session.user.stripePriceId = currentUser.stripePriceId;
        }
      }
      return session;
    },
  },
});
