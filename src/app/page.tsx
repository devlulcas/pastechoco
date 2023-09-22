import { createNewContentServerAction } from '@/data/create-new-content-server-action';
import { getOwnedContent } from '@/data/get-owned-content';

export default async function HomePage() {
  const ownedContent = await getOwnedContent();

  return (
    <div>
      <form action={createNewContentServerAction} method="post">
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols={30} rows={10}></textarea>
        <button type="submit">Send</button>
      </form>

      {ownedContent.map((content) => (
        <div key={content.slug} className="border border-gray-200 p-4 mt-4">
          <a href={content.slug}>{content.slug}</a>
          <div
            dangerouslySetInnerHTML={{
              __html: content.html,
            }}
          />
        </div>
      ))}
    </div>
  );
}
