'use server';

import { OWNED_SLUGS_COOKIE_NAME } from '@/constants';
import { db } from '@/infrastructure/db';
import { contentTable } from '@/infrastructure/db/schema';
import { generateMemorableId } from '@/lib/generate-memorable-id';
import { processAndPurifyMarkdown } from '@/lib/process-markdown';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createNewContentServerAction(
  formData: FormData
): Promise<void> {
  const data = validateNewContentInput(formData);

  const newSlug = await createNewContent(data);

  appendToOwnedSlugsCookie(newSlug);
  revalidatePath('/');
  revalidatePath(`/${newSlug}`);
  redirect(`/${newSlug}`);
}

async function createNewContent(raw: string): Promise<string> {
  const slug = generateMemorableId();
  const contentInDb = db
    .select({ slug: contentTable.slug })
    .from(contentTable)
    .where(eq(contentTable.slug, slug))
    .limit(1)
    .get();

  if (contentInDb) {
    throw new Error('Slug already exists');
  }

  const html = processAndPurifyMarkdown(raw);

  try {
    await db.insert(contentTable).values({ slug, raw, html }).execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create new content');
  }

  return slug;
}

function validateNewContentInput(formData: FormData): string {
  const content = formData.get('content');

  if (typeof content !== 'string') {
    throw new Error('Invalid content');
  }

  if (content.length < 1) {
    throw new Error('Content is too short');
  }

  if (content.length > 2080) {
    throw new Error('Content is too long');
  }

  return content;
}

function appendToOwnedSlugsCookie(slug: string): void {
  const jar = cookies();
  const currentOwnedSlugs = jar.get(OWNED_SLUGS_COOKIE_NAME)?.value?.split(',');
  const currentOwnedSlugsSet = new Set(currentOwnedSlugs);
  
  currentOwnedSlugsSet.add(slug);

  const currentOwnedSlugsArray = Array.from(currentOwnedSlugsSet);

  const currentOwnedSlugsString = currentOwnedSlugsArray.join(',');

  console.log(OWNED_SLUGS_COOKIE_NAME, currentOwnedSlugsString)

  jar.set(OWNED_SLUGS_COOKIE_NAME, currentOwnedSlugsString, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2),
  });
}
