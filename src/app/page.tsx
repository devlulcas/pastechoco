import { createNewContentServerAction } from '@/data/create-new-content-server-action';
import { getOwnedContent } from '@/data/get-owned-content';
import Link from 'next/link';

export default async function HomePage() {
  const ownedContent = await getOwnedContent();

  return (
    <div className="flex flex-col gap-4 p-4 border container my-2 rounded">
      <form
        action={createNewContentServerAction}
        method="post"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            className="border p-4 w-full rounded"
            name="content"
            id="content"
            cols={30}
            rows={10}
          />
        </div>

        <button
          className="bg-neutral-800 hover:bg-neutral-900 text-neutral-50 font-bold py-2 px-4 rounded w-fit"
          type="submit"
        >
          Send
        </button>
      </form>

      {ownedContent.length ? (
        <ul className="flex flex-col gap-2">
          {ownedContent.map((content) => (
            <li key={content.slug} className="border p-2 w-full rounded">
              <Link
                className="bg-neutral-200 text-neutral-700 hover:text-neutral-800 border rounded px-2 py-1"
                href={content.slug}
              >
                {content.slug}
              </Link>

              <div
                dangerouslySetInnerHTML={{
                  __html: content.html,
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">You have no content yet.</p>
      )}
    </div>
  );
}
