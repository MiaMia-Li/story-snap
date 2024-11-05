import NextAuth from "next-auth";
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

        if (currentUser && currentUser.credits === null) {
          await prisma.user.update({
            where: { id: token.sub },
            data: { credits: 5 },
          });
        }
        // const user = await getUserById(session.user.id);
        // if (user) {
        //   session.user.level = user.level;
        //   session.user.stripePriceId = user.stripePriceId;
        //   session.user.stripeCurrentPeriodEnd = user.stripeCurrentPeriodEnd;
        // }
      }
      return session;
    },
  },
});
