'use server';

import { OWNED_SLUGS_COOKIE_NAME } from '@/constants';
import { db } from '@/infrastructure/db';
import { contentTable } from '@/infrastructure/db/schema';
import { processAndPurifyMarkdown } from '@/lib/process-markdown';
import { Content } from '@/types/content';
import { inArray } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function getOwnedContent(): Promise<Content[]> {
  const ownedSlugs = getOwnedSlugsCookies();

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

function getOwnedSlugsCookies(): string[] {
  const jar = cookies();

  const currentOwnedSlugs = jar.get(OWNED_SLUGS_COOKIE_NAME)?.value?.split(',');

  if (!currentOwnedSlugs) {
    return [];
  }

  return currentOwnedSlugs;
}
