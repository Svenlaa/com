import {
  boolean,
  datetime,
  int,
  mediumint,
  text,
  varchar,
} from "drizzle-orm/mysql-core/columns";
import { uniqueIndex } from "drizzle-orm/mysql-core/indexes";
import { mysqlTable } from "drizzle-orm/mysql-core/table";
import { InferModel } from "drizzle-orm";

const string = (name: string) => varchar(name, { length: 255 });

export type TExample = InferModel<typeof Example>;
export type TAccount = InferModel<typeof Account>;
export type TSession = InferModel<typeof Session>;
export type TUser = InferModel<typeof User>;
export type TVerificationToken = InferModel<typeof VerificationToken>;
export type TRun = InferModel<typeof Run>;

export const Example = mysqlTable("Example", {
  id: string("id").primaryKey().notNull(),
  createdAt: datetime("createdAt", { fsp: 3 }).default(new Date()).notNull(),
  updatedAt: datetime("updatedAt", { fsp: 3 }).notNull(),
});

export const Account = mysqlTable(
  "Account",
  {
    id: string("id").notNull().primaryKey(),
    userId: string("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: string("type"),
    provider: string("provider").notNull(),
    providerAccountId: string("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: string("token_type"),
    scope: string("scope"),
    idToken: text("id_token"),
    sessionState: string("session_state"),
  },
  (table) => ({
    Account_provider_providerAccountId_key: uniqueIndex(
      " Account_provider_providerAccountId_key"
    ).on(table.provider, table.providerAccountId),
  })
);

export const Session = mysqlTable(
  "Session",
  {
    id: string("id").notNull().primaryKey(),
    sessionToken: string("sessionToken").notNull(),
    userId: string("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: datetime("expires", { fsp: 3 }).notNull(),
  },
  (table) => ({
    Session_sessionToken_key: uniqueIndex("Session_sessionToken_key").on(
      table.sessionToken
    ),
  })
);

export const User = mysqlTable(
  "User",
  {
    id: string("id").notNull().primaryKey(),
    name: string("name"),
    email: string("email"),
    emailVerified: datetime("emailVerified", { fsp: 3 }),
    image: string("image"),
    isAdmin: boolean("isAdmin").default(false).notNull(),
  },
  (table) => ({
    User_email_key: uniqueIndex("User_email_key").on(table.email),
  })
);

export const VerificationToken = mysqlTable(
  "VerificationToken",
  {
    id: string("identifier").notNull(),
    token: string("token").notNull(),
    expires: datetime("expires", { fsp: 3 }).notNull(),
  },
  (table) => ({
    VerificationToken_identifier_token_key: uniqueIndex(
      "VerificationToken_identifier_token_key"
    ).on(table.id, table.token),
    VerificationToken_token_key: uniqueIndex("VerificationToken_token_key").on(
      table.token
    ),
  })
);

export const Run = mysqlTable("Run", {
  id: string("id").primaryKey(),
  distance: mediumint("distance").notNull(),
  time: mediumint("time"),
  date: varchar("date", { length: 10 }).notNull(),
  yearWeek: varchar("yearWeek", { length: 7 }).notNull(),
  isEvent: boolean("isEvent").default(false).notNull(),
  location: string("location"),
});
