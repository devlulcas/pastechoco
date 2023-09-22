import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import sanitizeHtml from 'sanitize-html';

type HTMLString = string;

export function processAndPurifyMarkdown(markdown: string): HTMLString {
  const html = micromark(markdown, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });

  return sanitizeHtml(html);
}
