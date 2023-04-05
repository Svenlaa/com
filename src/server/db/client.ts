// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import mysql from "mysql2/promise";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;

  // eslint-disable-next-line no-var
  var db: MySql2Database;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const poolConnection = mysql.createPool(env.DATABASE_URL);
export const db = drizzle(poolConnection);

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.db = db;
}
