import { Splitview } from '@/components/split-view';
import { getContentBySlug } from '@/data/get-content-by-slug';

export default async function SlugPage(props: { params: { slug: string } }) {
  const content = await getContentBySlug(props.params.slug);

  return (
    <div>
      <h1>{content.slug}</h1>
      <Splitview {...content} />
    </div>
  );
}
