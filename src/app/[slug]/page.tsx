import { db } from '@/database/db';
import { generateUniqueId } from '@/lib/generate-unique-id';

const getContent = (slug: string) => {
  return db.get(slug);
};

export default function SlugPage(props: { params: { slug: string } }) {
  const content = getContent(props.params.slug);

  return (
    <div>
      {props.params.slug}
      <p>{generateUniqueId()}</p>
      {content && <pre>{content}</pre>}
    </div>
  );
}
