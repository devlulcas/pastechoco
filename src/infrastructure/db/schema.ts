import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentTable = sqliteTable("content", {
  id: integer("id"),
  slug: text("slug").primaryKey(),
  raw: text("raw").notNull(),
  html: text("html").notNull(),
});
