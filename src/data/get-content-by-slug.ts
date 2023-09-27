"use server";

import { db } from "@/infrastructure/db";
import { contentTable } from "@/infrastructure/db/schema";
import { Content } from "@/types/content";
import { eq } from "drizzle-orm";

export async function getContentBySlug(slug: string): Promise<Content> {
  const result = db
    .select({
      slug: contentTable.slug,
      raw: contentTable.raw,
      html: contentTable.html,
    })
    .from(contentTable)
    .where(eq(contentTable.slug, slug))
    .limit(1)
    .get();

  if (!result) {
    throw new Error("Slug do not exists");
  }

  return result;
}
