import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/email";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      from: `SnapStory <support@snapstoryai.com>`,
      sendVerificationRequest,
    }),
    GitHub,
    Google,
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    // error: "/auth/error",
  },
  debug: process.env.NODE_ENV !== "production",
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
      session.user.name = session.user.name || session.user.email.split("@")[0];
      return session;
    },
  },
});
