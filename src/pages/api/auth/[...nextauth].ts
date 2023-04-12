import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { env } from "../../../env/server.mjs";
import { DrizzleAdapter } from "./DrizzleAdapter";
import { db } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.isAdmin = user.isAdmin;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
