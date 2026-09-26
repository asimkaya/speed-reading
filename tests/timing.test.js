import { test } from 'node:test';
import assert from 'node:assert/strict';
import { baseDuration, clampWpm, wordDuration } from '../src/core/timing.js';
import { tokenize } from '../src/core/tokenizer.js';
import { PAUSES } from '../src/core/config.js';

const tok = (text, extra = {}) => ({
  text,
  punctuation: 'none',
  sentenceEnd: false,
  paragraphEnd: false,
  sceneBreak: false,
  dialogue: false,
  dialogueStart: false,
  ...extra,
});

test('base duration is 60000 / WPM', () => {
  assert.equal(baseDuration(300), 200);
  assert.equal(baseDuration(600), 100);
});

test('WPM is clamped to the allowed range', () => {
  assert.equal(clampWpm(10), 100);
  assert.equal(clampWpm(5000), 900);
  assert.equal(clampWpm('abc'), 100);
  assert.equal(clampWpm(312.4), 312);
});

test('plain word lasts exactly the base duration', () => {
  assert.equal(wordDuration(tok('kalem'), 300), 200);
});

test('pause order: comma < semicolon < sentence < paragraph < scene', () => {
  const [plain, comma, semi, sentence, para, scene] = [
    tok('kalem'),
    tok('kalem,', { punctuation: 'comma' }),
    tok('kalem;', { punctuation: 'semicolon' }),
    tok('kalem.', { punctuation: 'sentence', sentenceEnd: true }),
    tok('kalem.', { punctuation: 'sentence', sentenceEnd: true, paragraphEnd: true }),
    tok('kalem.', { punctuation: 'sentence', sentenceEnd: true, paragraphEnd: true, sceneBreak: true }),
  ].map((t) => wordDuration(t, 300));
  assert.ok(plain < comma && comma < semi && semi < sentence && sentence < para && para < scene);
});

test('pauses do not stack: a paragraph end with a period uses only the paragraph pause', () => {
  const t = tok('kalem.', { punctuation: 'sentence', sentenceEnd: true, paragraphEnd: true });
  assert.equal(wordDuration(t, 300), 200 * (1 + PAUSES.paragraph));
});

test('ellipsis and ?! pause like a single sentence end', () => {
  const [a, b] = tokenize('kalem... defter?! son');
  const single = wordDuration(tok('kalem.', { punctuation: 'sentence', sentenceEnd: true }), 300);
  assert.equal(wordDuration(a, 300), single);
  assert.equal(wordDuration(b, 300), wordDuration(tok('defter.', { punctuation: 'sentence' }), 300));
});

test('long words get extra time that grows with length and is capped', () => {
  const d8 = wordDuration(tok('abcdefgh'), 300);
  const d12 = wordDuration(tok('abcdefghijkl'), 300);
  const d30 = wordDuration(tok('a'.repeat(30)), 300);
  const d60 = wordDuration(tok('a'.repeat(60)), 300);
  assert.equal(d8, 200);
  assert.ok(d12 > d8);
  assert.ok(d30 > d12);
  assert.equal(d30, d60, 'bonus is capped');
});

test('short function words pass faster than the base duration', () => {
  assert.ok(wordDuration(tok('ve'), 300) < 200);
  assert.ok(wordDuration(tok('Bir'), 300) < 200);
  assert.equal(wordDuration(tok('ev'), 300), 200);
});

test('dialogue start gets a short extra pause', () => {
  assert.ok(wordDuration(tok('Evet', { dialogueStart: true }), 300) > 200);
});

test('higher speed means shorter duration', () => {
  const t = tok('kalem,', { punctuation: 'comma' });
  assert.ok(wordDuration(t, 600) < wordDuration(t, 300));
});
