import { Content } from '@/types/content';

export function Splitview({ html, raw }: Pick<Content, 'raw' | 'html'>) {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 h-full overflow-auto">{raw}</div>
      <div
        className="w-1/2 h-full overflow-auto"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}
