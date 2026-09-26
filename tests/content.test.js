import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { tokenize } from '../src/core/tokenizer.js';
import { orpIndex } from '../src/core/orp.js';
import { wordDuration } from '../src/core/timing.js';

const dir = new URL('../content/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.txt'));

test('all sample texts are present', () => {
  assert.ok(files.includes('kurk-mantolu-madonna-berlin.txt'));
  assert.ok(files.length >= 5);
});

for (const file of files) {
  test(`${file}: tokenizes into sane words`, () => {
    const tokens = tokenize(readFileSync(new URL(file, dir), 'utf8'));
    assert.ok(tokens.length > 500);
    for (const t of tokens) {
      assert.ok(t.text.length > 0);
      assert.ok(!/\s/.test(t.text), `whitespace in "${t.text}"`);
      assert.ok(!/^[—–-]/.test(t.text), `leading dash in "${t.text}"`);
      assert.ok(!/^[*=]+$/.test(t.text), `separator shown as word: "${t.text}"`);
      assert.ok(orpIndex(t.text) >= 0);
      const d = wordDuration(t, 300);
      assert.ok(Number.isFinite(d) && d > 0 && d < 2000, `duration ${d} for "${t.text}"`);
    }
    assert.ok(tokens[tokens.length - 1].paragraphEnd);
  });
}

test('main demo text word count is close to content/README.md (2758, whitespace-split)', () => {
  const tokens = tokenize(readFileSync(new URL('kurk-mantolu-madonna-berlin.txt', dir), 'utf8'));
  assert.ok(Math.abs(tokens.length - 2758) <= 10, `${tokens.length}`);
});
