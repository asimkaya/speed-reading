import { ABBREVIATIONS } from './config.js';

/**
 * @typedef {Object} Token
 * @property {string} text          Display text (dialogue dashes removed, quotes kept).
 * @property {'none'|'comma'|'semicolon'|'sentence'} punctuation
 * @property {boolean} sentenceEnd
 * @property {boolean} paragraphEnd
 * @property {boolean} sceneBreak   A scene separator (`* * *`) follows this word.
 * @property {boolean} dialogue     Word is inside quotes or a dash-led reply.
 * @property {boolean} dialogueStart
 */

const WORD_CHAR = /[\p{L}\p{N}]/u;
const DASHES = '—–-';
const OPEN_QUOTES = '«“„"‘';
const CLOSE_QUOTES = '»”"’';
const CLOSERS = '»”"’)]}\'';
const SCENE_BREAK = /^(?:[*•·]\s*){3,}$|^[-_=~]{3,}$/;
const WIKI_HEADING = /^==.*==$/;

export function tokenize(raw) {
  if (typeof raw !== 'string') return [];
  const text = raw
    .replace(/\r\n?/g, '\n')
    .replace(/``/g, '“')
    .replace(/´´/g, '”')
    .replace(/ /g, ' ');

  const tokens = [];

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || WIKI_HEADING.test(trimmed)) continue;

    if (SCENE_BREAK.test(trimmed)) {
      const last = tokens[tokens.length - 1];
      if (last) {
        last.sceneBreak = true;
        last.paragraphEnd = true;
        last.sentenceEnd = true;
      }
      continue;
    }

    let wordsInLine = 0;
    let prefix = '';
    let dashReply = false;
    let quoteOpen = false;
    let pendingDialogueStart = false;

    for (let chunk of trimmed.split(/\s+/).flatMap(splitGlued)) {
      const prev = wordsInLine > 0 ? tokens[tokens.length - 1] : null;

      if (!WORD_CHAR.test(chunk)) {
        if (isAll(chunk, DASHES)) {
          if (wordsInLine === 0 && !prefix) {
            dashReply = true;
            pendingDialogueStart = true;
          } else if (prev && prev.punctuation === 'none') {
            prev.punctuation = 'comma';
          }
          continue;
        }
        if (isAll(chunk, '«“„‘') || (isAll(chunk, OPEN_QUOTES) && !prev)) {
          prefix += chunk;
          quoteOpen = true;
          pendingDialogueStart = true;
          continue;
        }
        if (prev) {
          prev.text += chunk;
          applyPunctuation(prev);
          if (hasAny(chunk, CLOSE_QUOTES)) quoteOpen = false;
          continue;
        }
        // Punctuation-only content at the start of a line (e.g. a silent "— ..." reply).
        const t = makeToken(prefix + chunk);
        t.dialogue = dashReply || quoteOpen;
        t.dialogueStart = pendingDialogueStart;
        pendingDialogueStart = false;
        prefix = '';
        tokens.push(t);
        wordsInLine++;
        continue;
      }

      const leadingDash = chunk.match(/^[—–]+/);
      if (leadingDash) {
        chunk = chunk.slice(leadingDash[0].length);
        if (wordsInLine === 0) {
          dashReply = true;
          pendingDialogueStart = true;
        }
      }

      if (dashReply && prev && prev.punctuation === 'sentence' && startsLowercase(chunk)) {
        dashReply = false;
      }

      const word = prefix + chunk;
      prefix = '';
      const lead = leadingQuotes(word);
      if (lead) {
        quoteOpen = true;
        pendingDialogueStart = true;
      }

      const t = makeToken(word);
      t.dialogue = dashReply || quoteOpen;
      t.dialogueStart = pendingDialogueStart;
      pendingDialogueStart = false;

      if (hasAny(trailingPart(word), CLOSE_QUOTES)) quoteOpen = false;

      if (/[—–]$/.test(t.text) && t.punctuation === 'none') t.punctuation = 'comma';

      tokens.push(t);
      wordsInLine++;
    }

    if (wordsInLine > 0) tokens[tokens.length - 1].paragraphEnd = true;
  }

  // Ordinal numbers ("3. sınıf") are not sentence ends when a lowercase word follows.
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i];
    if (t.sentenceEnd && !t.paragraphEnd && /^\d+\.$/.test(t.text) && startsLowercase(tokens[i + 1].text)) {
      t.punctuation = 'none';
      t.sentenceEnd = false;
    }
  }

  return tokens;
}

const GLUED = /[.?!…]+[»”"’]*(?=\p{L})/gu;

/** Splits words glued together by sentence punctuation, e.g. "gitti...Sonra" or "dedi?"diye". */
export function splitGlued(chunk) {
  const parts = [];
  let start = 0;
  for (const m of chunk.matchAll(GLUED)) {
    const end = m.index + m[0].length;
    const marks = m[0].replace(/[»”"’]/g, '');
    const next = chunk[end];
    const quoted = marks.length < m[0].length;
    const upper = next === next.toLocaleUpperCase('tr') && next !== next.toLocaleLowerCase('tr');
    if (m.index === 0) continue;
    if (marks.length >= 2 || /[?!…]/.test(marks) || quoted || upper) {
      parts.push(chunk.slice(start, end));
      start = end;
    }
  }
  parts.push(chunk.slice(start));
  return parts;
}

function makeToken(text) {
  const t = {
    text,
    punctuation: 'none',
    sentenceEnd: false,
    paragraphEnd: false,
    sceneBreak: false,
    dialogue: false,
    dialogueStart: false,
  };
  applyPunctuation(t);
  return t;
}

function applyPunctuation(t) {
  t.punctuation = classifyPunctuation(t.text);
  t.sentenceEnd = t.punctuation === 'sentence';
}

export function classifyPunctuation(text) {
  let end = text.length;
  while (end > 0 && CLOSERS.includes(text[end - 1])) end--;
  let start = end;
  while (start > 0 && '.,;:!?…'.includes(text[start - 1])) start--;
  const run = text.slice(start, end);
  if (!run) return /[—–]$/.test(text.slice(0, end)) ? 'comma' : 'none';

  if (/[.!?…]/.test(run)) {
    if (run === '.' && isAbbreviation(text.slice(0, start))) return 'none';
    return 'sentence';
  }
  if (/[;:]/.test(run)) return 'semicolon';
  return 'comma';
}

function isAbbreviation(body) {
  const core = body.replace(/^[^\p{L}\p{N}]+/u, '');
  if (!core) return false;
  if (/^\p{Lu}$/u.test(core)) return true;
  return ABBREVIATIONS.has(core.toLocaleLowerCase('tr'));
}

function leadingQuotes(word) {
  let i = 0;
  while (i < word.length && (OPEN_QUOTES.includes(word[i]) || word[i] === '(')) i++;
  return hasAny(word.slice(0, i), OPEN_QUOTES) ? word.slice(0, i) : '';
}

function trailingPart(word) {
  const m = word.match(/[^\p{L}\p{N}]*$/u);
  return m ? m[0] : '';
}

function startsLowercase(text) {
  const m = text.match(/[\p{L}]/u);
  return !!m && m[0] === m[0].toLocaleLowerCase('tr') && m[0] !== m[0].toLocaleUpperCase('tr');
}

function isAll(str, chars) {
  for (const ch of str) if (!chars.includes(ch)) return false;
  return str.length > 0;
}

function hasAny(str, chars) {
  for (const ch of str) if (chars.includes(ch)) return true;
  return false;
}
