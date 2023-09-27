"use server";

import { db } from "@/infrastructure/db";
import { contentTable } from "@/infrastructure/db/schema";
import { ownedContentCookie } from "@/lib/cookies/owned-content-cookie";
import { processAndPurifyMarkdown } from "@/lib/process-markdown";
import { Content } from "@/types/content";
import { inArray } from "drizzle-orm";

export async function getOwnedContent(): Promise<Content[]> {
  const ownedSlugs = ownedContentCookie.getFrom();

  if (ownedSlugs.length === 0) {
    return [];
  }

  const result = db
    .select({
      slug: contentTable.slug,
      raw: contentTable.raw,
      html: contentTable.html,
    })
    .from(contentTable)
    .where(inArray(contentTable.slug, ownedSlugs))
    .all();

  if (!result) {
    return [];
  }

  return result.map((row) => {
    const value = row.raw.substring(0, 520);

    return {
      slug: row.slug,
      raw: value,
      html: processAndPurifyMarkdown(value),
    };
  });
}
