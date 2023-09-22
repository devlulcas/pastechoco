import { Splitview } from '@/components/split-view';
import { getContentBySlug } from '@/data/get-content-by-slug';

export default async function SlugPage(props: { params: { slug: string } }) {
  const content = await getContentBySlug(props.params.slug);

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 my-2 w-full">
        {content.slug}
      </h1>

      <Splitview {...content} />
    </>
  );
}
