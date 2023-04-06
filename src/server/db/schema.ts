import { boolean, mediumint, varchar } from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

export const Run = mysqlTable("Run", {
  id: varchar("id", { length: 191 }).primaryKey(),
  distance: mediumint("distance").notNull(),
  time: mediumint("time"),
  date: varchar("date", { length: 10 }).notNull(),
  yearWeek: varchar("yearWeek", { length: 7 }).notNull(),
  isEvent: boolean("isEvent").default(false).notNull(),
  location: varchar("location", { length: 191 }),
});

//TODO Complete the schema.
