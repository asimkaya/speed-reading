import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orpIndex, orpLetterIndex, splitAtOrp } from '../src/core/orp.js';

test('ORP table from RESEARCH.md', () => {
  const cases = [[1, 0], [2, 1], [5, 1], [6, 2], [9, 2], [10, 3], [13, 3], [14, 4], [20, 4]];
  for (const [len, idx] of cases) assert.equal(orpLetterIndex(len), idx, `len ${len}`);
});

test('ORP ignores leading and trailing punctuation', () => {
  assert.equal(orpIndex('ev'), 1);
  assert.equal(orpIndex('«ev,'), 2);
  assert.equal(orpIndex('"Kaymakam'), 3);
  assert.equal(orpIndex('o'), 0);
});

test('splitAtOrp keeps Turkish characters intact', () => {
  assert.deepEqual(splitAtOrp('ığdır'), { before: 'ı', pivot: 'ğ', after: 'dır' });
  assert.deepEqual(splitAtOrp('İstanbul'), { before: 'İs', pivot: 't', after: 'anbul' });
});

test('punctuation-only tokens pivot on their middle', () => {
  assert.deepEqual(splitAtOrp('...'), { before: '.', pivot: '.', after: '.' });
  assert.deepEqual(splitAtOrp(''), { before: '', pivot: '', after: '' });
});
