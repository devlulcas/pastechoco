import { Content } from '@/types/content';

export function Splitview({ html, raw }: Pick<Content, 'raw' | 'html'>) {
  return (
    <div className="border rounded h-full w-full lg:w-[98vw] lg:h-[80vh] flex lg:flex-row gap-2 p-2 overflow-hidden">
      <pre className="border rounded p-2 w-full h-1/2 max-h-[50dvh] lg:max-h-screen lg:h-full overflow-auto">{raw}</pre>
      <div
        className="border rounded p-2 w-full h-1/2 max-h-[50dvh] lg:max-h-screen lg:h-full overflow-auto"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}
