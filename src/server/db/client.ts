// src/server/db/client.ts
import { env } from "../../env/server.mjs";
import {
  PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

declare global {
  // eslint-disable-next-line no-var
  var db: PlanetScaleDatabase | undefined;
}
const connection = connect({ url: env.DATABASE_URL });
export const db = global.db || drizzle(connection);

if (env.NODE_ENV !== "production") {
  global.db = db;
}
