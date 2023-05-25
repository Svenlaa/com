import { env } from "../../env/server.mjs";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var db: MySql2Database | undefined;
}

const connection = mysql.createPool(env.DATABASE_URL);

export const db = global.db || drizzle(connection);
export type dbType = typeof db;

if (env.NODE_ENV !== "production") {
  global.db = db;
}
