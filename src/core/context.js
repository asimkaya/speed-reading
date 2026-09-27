import { CONTEXT } from './config.js';
import { sentenceStart } from './player.js';

export function sentenceEndIndex(tokens, index) {
  let j = Math.max(index, 0);
  while (j < tokens.length - 1 && !(tokens[j].sentenceEnd || tokens[j].paragraphEnd)) j++;
  return j;
}

/**
 * Words to show around the current one while paused: the previous and the
 * current sentence, trimmed so the current word stays near the top.
 * Returns a half-open range [start, end) and whether text was cut on either side.
 */
export function contextWindow(tokens, index, { maxWords = CONTEXT.maxWords, maxBefore = CONTEXT.maxBefore } = {}) {
  if (tokens.length === 0) return { start: 0, end: 0, cutBefore: false, cutAfter: false };
  const i = Math.min(Math.max(index, 0), tokens.length - 1);
  const current = sentenceStart(tokens, i);
  const naturalStart = current > 0 ? sentenceStart(tokens, current - 1) : current;
  const naturalEnd = sentenceEndIndex(tokens, i) + 1;

  const start = Math.max(naturalStart, i - maxBefore);
  const end = Math.min(naturalEnd, start + maxWords);
  return { start, end, cutBefore: start > naturalStart, cutAfter: end < naturalEnd };
}
