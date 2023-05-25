import { Adapter } from "next-auth/adapters";
import type { dbType } from "./client";
import {
  TSession,
  TUser,
  Accounts,
  Sessions,
  Users,
  VerificationTokens,
} from "../../../drizzle/schema";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";

export const DrizzleAdapter = (db: dbType): Adapter => {
  return {
    createUser: async (user) => {
      const id = createId();
      await db.insert(Users).values({ ...user, id });

      return (await db
        .select({
          id: Users.id,
          email: Users.email,
          emailVerified: Users.emailVerified,
          name: Users.name,
        })
        .from(Users)
        .where(eq(Users.id, id))
        .then((res) => res[0])) as TUser;
    },
    getUser: async (id) => {
      return db
        .select()
        .from(Users)
        .where(eq(Users.id, id))
        .then((res) => res[0] || null);
    },
    getUserByEmail: async (email) => {
      return db
        .select()
        .from(Users)
        .where(eq(Users.email, email))
        .then((res) => res[0] || null);
    },
    getUserByAccount: async (account) => {
      const user =
        (await db
          .select()
          .from(Users)
          .innerJoin(
            Accounts,
            and(
              eq(Accounts.providerAccountId, account.providerAccountId),
              eq(Accounts.provider, account.provider)
            )
          )
          .then((res) => res[0])) ?? null;

      return user?.users ?? null;
    },
    updateUser: async (user) => {
      if (!user.id) {
        throw new Error("No user id.");
      }

      await db.update(Users).set(user).where(eq(Users.id, user.id));

      return (await db
        .select()
        .from(Users)
        .where(eq(Users.id, user.id))
        .then((res) => res[0])) as TUser;
    },
    deleteUser: async (id) => {
      await db
        .delete(Users)
        .where(eq(Users.id, id))
        .then((res) => res[0]);
    },
    linkAccount: async (account) => {
      await db
        .insert(Accounts)
        .values(account)
        .then((res) => res[0]);
    },
    unlinkAccount: async (account) => {
      await db
        .delete(Accounts)
        .where(
          and(
            eq(Accounts.providerAccountId, account.providerAccountId),
            eq(Accounts.provider, account.provider)
          )
        );

      return undefined;
    },
    createSession: async (data) => {
      await db.insert(Sessions).values(data);

      return (await db
        .select()
        .from(Sessions)
        .where(eq(Sessions.sessionToken, data.sessionToken))
        .then((res) => res[0])) as TSession;
    },
    getSessionAndUser: async (sessionToken) => {
      return db
        .select({
          session: Sessions,
          user: Users,
        })
        .from(Sessions)
        .where(eq(Sessions.sessionToken, sessionToken))
        .innerJoin(Users, eq(Users.id, Sessions.userId))
        .then((res) => res[0] || null);
    },
    updateSession: async (data) => {
      await db
        .update(Sessions)
        .set(data)
        .where(eq(Sessions.sessionToken, data.sessionToken));

      return db
        .select()
        .from(Sessions)
        .where(eq(Sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },
    deleteSession: async (sessionToken) => {
      await db.delete(Sessions).where(eq(Sessions.sessionToken, sessionToken));
    },
    createVerificationToken: async (token) => {
      await db.insert(VerificationTokens).values(token);

      return db
        .select()
        .from(VerificationTokens)
        .where(eq(VerificationTokens.identifier, token.identifier))
        .then((res) => res[0]);
    },
    useVerificationToken: async (token) => {
      try {
        const deletedToken = await db
          .select()
          .from(VerificationTokens)
          .where(
            and(
              eq(VerificationTokens.identifier, token.identifier),
              eq(VerificationTokens.token, token.token)
            )
          )
          .then((res) => res[0] || null);

        await db
          .delete(VerificationTokens)
          .where(
            and(
              eq(VerificationTokens.identifier, token.identifier),
              eq(VerificationTokens.token, token.token)
            )
          );

        return deletedToken;
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
  };
};
