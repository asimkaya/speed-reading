import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contextWindow, sentenceEndIndex } from '../src/core/context.js';
import { tokenize } from '../src/core/tokenizer.js';

const tokens = tokenize('Bir iki üç. Dört beş altı yedi. Sekiz dokuz.\nYeni paragraf burada.');
const words = (w) => tokens.slice(w.start, w.end).map((t) => t.text).join(' ');

test('sentence end index', () => {
  assert.equal(sentenceEndIndex(tokens, 3), 6);
  assert.equal(sentenceEndIndex(tokens, 6), 6);
  assert.equal(sentenceEndIndex(tokens, 10), 11);
});

test('shows the previous and the current sentence', () => {
  const w = contextWindow(tokens, 5);
  assert.equal(words(w), 'Bir iki üç. Dört beş altı yedi.');
  assert.equal(w.cutBefore, false);
  assert.equal(w.cutAfter, false);
});

test('first sentence has no previous sentence', () => {
  assert.equal(words(contextWindow(tokens, 1)), 'Bir iki üç.');
});

test('crosses a paragraph boundary backwards', () => {
  assert.equal(words(contextWindow(tokens, 11)), 'Sekiz dokuz. Yeni paragraf burada.');
});

test('long sentences are trimmed and flagged', () => {
  const long = tokenize(Array.from({ length: 100 }, (_, i) => `k${i}`).join(' ') + '.');
  const w = contextWindow(long, 60, { maxWords: 40, maxBefore: 20 });
  assert.equal(w.start, 40);
  assert.equal(w.end, 80);
  assert.ok(w.cutBefore && w.cutAfter);
  assert.ok(60 >= w.start && 60 < w.end, 'current word is inside the window');
});

test('empty text', () => {
  assert.deepEqual(contextWindow([], 3), { start: 0, end: 0, cutBefore: false, cutAfter: false });
});
