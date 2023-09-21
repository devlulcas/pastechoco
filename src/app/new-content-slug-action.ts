'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/database/db';
import { generateMemorableId } from '@/lib/generate-memorable-id';

type ContentSlugInput = {
  content: string;
};

function validateNewContentSlugInput(formData: FormData): ContentSlugInput {
  const content = formData.get('content');

  if (typeof content !== 'string') {
    throw new Error('Invalid content');
  }

  if (content.length < 1) {
    throw new Error('Content is too short');
  }

  if (content.length > 1024) {
    throw new Error('Content is too long');
  }

  return { content };
}

export async function newContentSlugAction(formData: FormData) {
  const data = validateNewContentSlugInput(formData);
  const randomSlug = generateMemorableId();
  db.set(randomSlug, data.content);

  const jar = cookies();
  const currentOwnedSlugs = jar.get('owned-slugs');

  if (typeof currentOwnedSlugs === 'string') {
    jar.set('owned-slugs', `${currentOwnedSlugs},${randomSlug}`, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
      path: '/',
    });
  }

  redirect(`/${randomSlug}`);
}
