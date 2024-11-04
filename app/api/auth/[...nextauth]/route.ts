import vercelPostgresAdapter from "@/lib/adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: vercelPostgresAdapter(),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({}) {
      // console.log("signIn ", user, account, profile, email, credentials);
      return true;
    },
    // async redirect({ baseUrl }) {
    //   // console.log("redirect", url, baseUrl);
    //   return baseUrl;
    // },
    async session({ session, user }) {
      // console.log("auth session", session , user, token);
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token }) {
      // console.log("jwt", token, user, account, profile, isNewUser);
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
