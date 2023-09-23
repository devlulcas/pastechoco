import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

type Payload = {
  ownedSlugs: string[];
};

const OWNED_SLUGS_COOKIE_NAME = 'owned-slugs';

function getOwnedSlugsCookies(): string[] {
  const jar = cookies();

  const currentOwnedSlugs = jar.get(OWNED_SLUGS_COOKIE_NAME);

  if (!currentOwnedSlugs) {
    return [];
  }

  try {
    const currentOwnedSlugsArray = verify(
      currentOwnedSlugs.value,
      process.env.JWT_SECRET as string
    ) as Payload;

    return currentOwnedSlugsArray.ownedSlugs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function appendToOwnedSlugsCookies(slug: string): void {
  const jar = cookies();

  const currentOwnedSlugs = getOwnedSlugsCookies();

  const currentOwnedSlugsSet = new Set(currentOwnedSlugs);

  currentOwnedSlugsSet.add(slug);

  const currentOwnedSlugsArray = Array.from(currentOwnedSlugsSet);

  const currentOwnedSlugsToken = sign(
    { ownedSlugs: currentOwnedSlugsArray },
    process.env.JWT_SECRET as string
  );

  console.log(OWNED_SLUGS_COOKIE_NAME, currentOwnedSlugsToken);

  jar.set(OWNED_SLUGS_COOKIE_NAME, currentOwnedSlugsToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2),
    path: '/',
    httpOnly: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export const ownedContentCookie = {
  getFrom: getOwnedSlugsCookies,
  appendTo: appendToOwnedSlugsCookies,
};
