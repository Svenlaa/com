import {
  boolean,
  mediumint,
  text,
  varchar,
} from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

export const tbRuns = mysqlTable("Run", {
  id: text("id").primaryKey(),
  distance: mediumint("distance").notNull(),
  time: mediumint("time"),
  date: varchar("date", { length: 10 }).notNull(),
  yearWeek: varchar("yearWeek", { length: 7 }).notNull(),
  isEvent: boolean("isEvent").default(false).notNull(),
  location: text("location"),
});

//TODO Complete the schema.
