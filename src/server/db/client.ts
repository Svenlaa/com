// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import {
  PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;

  // eslint-disable-next-line no-var
  var db: PlanetScaleDatabase | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const connection = connect({ url: env.DATABASE_URL });
export const db = global.db || drizzle(connection);

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.db = db;
}
