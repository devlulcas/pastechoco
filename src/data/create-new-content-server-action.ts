'use server';

import { db } from '@/infrastructure/db';
import { contentTable } from '@/infrastructure/db/schema';
import { ownedContentCookie } from '@/lib/cookies/owned-content-cookie';
import { generateMemorableId } from '@/lib/generate-memorable-id';
import { processAndPurifyMarkdown } from '@/lib/process-markdown';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createNewContentServerAction(
  formData: FormData
): Promise<void> {
  const data = validateNewContentInput(formData);

  const newSlug = await createNewContent(data);

  ownedContentCookie.appendTo(newSlug);
  revalidatePath('/');
  revalidatePath(`/${newSlug}`);
  redirect(`/${newSlug}`);
}

async function createNewContent(raw: string): Promise<string> {
  const slug = generateMemorableId();
  const results = db
    .select({ slug: contentTable.slug })
    .from(contentTable)
    .where(eq(contentTable.slug, slug))
    .limit(1)
    .get();

  if (results) {
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
