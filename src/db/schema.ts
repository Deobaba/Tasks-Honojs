import {
    pgTable,
    serial,
    timestamp,
    varchar,
    boolean,
  } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id:  serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  completed: boolean("completed")
    .notNull()
    .default(false),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
 