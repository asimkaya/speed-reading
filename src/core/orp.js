const WORD_CHAR = /[\p{L}\p{N}]/u;

export function orpLetterIndex(letterCount) {
  if (letterCount <= 1) return 0;
  if (letterCount <= 5) return 1;
  if (letterCount <= 9) return 2;
  if (letterCount <= 13) return 3;
  return 4;
}

/** Index (in code points) of the focus character, skipping surrounding punctuation. */
export function orpIndex(text) {
  const chars = Array.from(text);
  const letterPositions = [];
  chars.forEach((ch, i) => {
    if (WORD_CHAR.test(ch)) letterPositions.push(i);
  });
  if (letterPositions.length === 0) return Math.floor((chars.length - 1) / 2);
  return letterPositions[orpLetterIndex(letterPositions.length)];
}

export function splitAtOrp(text) {
  const chars = Array.from(text);
  if (chars.length === 0) return { before: '', pivot: '', after: '' };
  const i = orpIndex(text);
  return {
    before: chars.slice(0, i).join(''),
    pivot: chars[i],
    after: chars.slice(i + 1).join(''),
  };
}

export function letterCount(text) {
  let n = 0;
  for (const ch of text) if (WORD_CHAR.test(ch)) n++;
  return n;
}
