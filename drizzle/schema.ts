import { InferModel } from "drizzle-orm";
import {
  boolean,
  int,
  mediumint,
  mysqlTable,
  text,
  primaryKey,
  timestamp,
  varchar,
  date,
} from "drizzle-orm/mysql-core";
import { ProviderType } from "next-auth/providers";

const string = (name: string) => varchar(name, { length: 255 });

export type TAccount = InferModel<typeof Accounts>;
export type TSession = InferModel<typeof Sessions>;
export type TUser = InferModel<typeof Users>;
export type TVerificationToken = InferModel<typeof VerificationTokens>;
export type TRun = InferModel<typeof Runs>;

export type Schema = {
  users: typeof Users;
  accounts: typeof Accounts;
  sessions: typeof Sessions;
  verificationTokens: typeof VerificationTokens;
  runs: typeof Runs;
};

export const Users = mysqlTable("users", {
  id: string("id").notNull().primaryKey(),
  name: string("name"),
  email: string("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: string("image"),
  isAdmin: boolean("isAdmin").default(false).notNull(),
});

export const Accounts = mysqlTable(
  "accounts",
  {
    userId: string("userId")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    type: string("type").$type<ProviderType>().notNull(),
    provider: string("provider").notNull(),
    providerAccountId: string("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: string("token_type"),
    scope: string("scope"),
    id_token: text("id_token"),
    session_state: string("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const Sessions = mysqlTable("sessions", {
  sessionToken: string("sessionToken").notNull().primaryKey(),
  userId: string("userId")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const VerificationTokens = mysqlTable(
  "verificationTokens",
  {
    identifier: string("identifier").notNull(),
    token: string("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const Runs = mysqlTable("runs", {
  id: string("id").primaryKey(),
  distance: mediumint("distance").notNull(),
  time: mediumint("time"),
  date: date("date").notNull(),
  yearWeek: varchar("yearWeek", { length: 7 }).notNull(),
  isEvent: boolean("isEvent").default(false).notNull(),
  location: string("location"),
});
