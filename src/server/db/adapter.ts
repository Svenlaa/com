import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";
import { db as dbType } from "./client";
import { Account, Session, User } from "./schema";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm/expressions";

function pretend<T>(data: unknown): T {
  return data as T;
}

export const DrizzleAdapter = (db: typeof dbType): Adapter => {
  return {
    createUser: async (data) => {
      const id = createId();
      await db
        .insert(User)
        .values({ ...data, id: createId() })
        .execute();
      const res = await db.select().from(User).where(eq(User.id, id));
      return pretend<AdapterUser>(res);
    },
    getUser: async (id) => {
      const res = await db
        .select({
          id: User.id,
          isAdmin: User.isAdmin,
          email: User.email,
          emailVerified: User.emailVerified,
        })
        .from(User)
        .where(eq(User.id, id))
        .execute();
      return pretend<AdapterUser>(res);
    },
    getSessionAndUser: async (sessionToken) => {
      const res = await db
        .select({ session: Session, user: User })
        .from(Session)
        .where(eq(Session.sessionToken, sessionToken))
        .innerJoin(User, eq(User.id, Session.userId))
        .execute();
      return pretend<{ session: AdapterSession; user: AdapterUser }>(res[0]);
    },
    getUserByAccount: async (account) => {
      const res = await db
        .select({
          id: User.id,
          email: User.email,
          emailVerified: User.emailVerified,
          image: User.image,
          name: User.name,
        })
        .from(User)
        .innerJoin(
          Account,
          and(
            eq(Account.providerAccountId, account.providerAccountId),
            eq(Account.provider, account.provider)
          )
        )
        .execute();
      return pretend<AdapterUser>(res[0]);
    },
    createSession: async (session) => {
      const id = createId();
      await db
        .insert(Session)
        .values({ ...session, id })
        .execute();
      const res = await db.select().from(Session).where(eq(Session.id, id));
      return pretend<AdapterSession>(res[0]);
    },
    getUserByEmail: async (email) => {
      const res = await db.select().from(User).where(eq(User.email, email));
      return pretend<AdapterUser>(res[0]);
    },
    deleteSession: async (sessionToken) => {
      await db
        .delete(Session)
        .where(eq(Session.sessionToken, sessionToken))
        .execute();
      return;
    },
    updateUser: () => pretend<AdapterUser>(null),
    updateSession: () => pretend<AdapterSession>(null),
    linkAccount: () => pretend<AdapterAccount>(null),
  };
};
