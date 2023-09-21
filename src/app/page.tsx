import { generateMemorableId } from '@/lib/generate-memorable-id';
import { newContentSlugAction } from './new-content-slug-action';

export default function HomePage() {
  return (
    <div>
      {generateMemorableId()}
      <form action={newContentSlugAction} method="post">
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols={30} rows={10}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
