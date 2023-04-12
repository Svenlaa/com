import { boolean, mediumint, varchar } from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

const string = (name: string) => varchar(name, { length: 191 });

export const Run = mysqlTable("Run", {
  id: string("id").primaryKey(),
  distance: mediumint("distance").notNull(),
  time: mediumint("time"),
  date: varchar("date", { length: 10 }).notNull(),
  yearWeek: varchar("yearWeek", { length: 7 }).notNull(),
  isEvent: boolean("isEvent").default(false).notNull(),
  location: string("location"),
});

//TODO Complete the schema.
