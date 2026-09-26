import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, classifyPunctuation } from '../src/core/tokenizer.js';

const texts = (tokens) => tokens.map((t) => t.text);

test('empty and whitespace input yields no tokens', () => {
  assert.deepEqual(tokenize(''), []);
  assert.deepEqual(tokenize('   \n\n  \t '), []);
  assert.deepEqual(tokenize(undefined), []);
});

test('splits on any whitespace and normalizes line endings', () => {
  const t = tokenize('Bir  iki\r\nüç dört');
  assert.deepEqual(texts(t), ['Bir', 'iki', 'üç', 'dört']);
});

test('classifies trailing punctuation', () => {
  assert.equal(classifyPunctuation('ev,'), 'comma');
  assert.equal(classifyPunctuation('ev;'), 'semicolon');
  assert.equal(classifyPunctuation('ev:'), 'semicolon');
  assert.equal(classifyPunctuation('ev.'), 'sentence');
  assert.equal(classifyPunctuation('ev?'), 'sentence');
  assert.equal(classifyPunctuation('ev!'), 'sentence');
  assert.equal(classifyPunctuation('ev'), 'none');
});

test('combined marks count once as a sentence end', () => {
  for (const w of ['ev...', 'ev?!', 'ev!...', 'ev?..', 'ev…']) {
    assert.equal(classifyPunctuation(w), 'sentence', w);
  }
});

test('punctuation is read through closing quotes and brackets', () => {
  assert.equal(classifyPunctuation('dedi."'), 'sentence');
  assert.equal(classifyPunctuation('oku!»'), 'sentence');
  assert.equal(classifyPunctuation('(evet),'), 'comma');
});

test('abbreviations and initials are not sentence ends', () => {
  const t = tokenize('Dr. Ahmet ve M. Kemal geldi, vb. şeyler oldu.');
  const byText = Object.fromEntries(t.map((x) => [x.text, x]));
  assert.equal(byText['Dr.'].sentenceEnd, false);
  assert.equal(byText['M.'].sentenceEnd, false);
  assert.equal(byText['vb.'].sentenceEnd, false);
  assert.equal(byText['oldu.'].sentenceEnd, true);
});

test('ordinal numbers followed by lowercase are not sentence ends', () => {
  const t = tokenize('Ali 3. sınıfta. Yıl 1920. Sonra');
  assert.equal(t[1].sentenceEnd, false);
  assert.equal(t[4].sentenceEnd, true);
});

test('each line ends a paragraph, blank lines are ignored', () => {
  const t = tokenize('Bir iki.\n\nÜç dört\nBeş');
  assert.deepEqual(t.map((x) => x.paragraphEnd), [false, true, false, true, true]);
});

test('scene separator is not a word and marks a long pause', () => {
  const t = tokenize('Son.\n* * *\nYeni bölüm');
  assert.deepEqual(texts(t), ['Son.', 'Yeni', 'bölüm']);
  assert.equal(t[0].sceneBreak, true);
  assert.equal(t[0].paragraphEnd, true);
});

test('dialogue dash is not shown as a word and flags the reply', () => {
  const t = tokenize('Anlatı.\n— Hayırdır inşallah! dedi.');
  assert.deepEqual(texts(t), ['Anlatı.', 'Hayırdır', 'inşallah!', 'dedi.']);
  assert.equal(t[1].dialogueStart, true);
  assert.equal(t[1].dialogue, true);
  assert.equal(t[2].dialogue, true);
  assert.equal(t[3].dialogue, false, 'speech tag after the reply is narration');
});

test('dash glued to the first word is removed', () => {
  const t = tokenize('—Evet efendim.');
  assert.equal(t[0].text, 'Evet');
  assert.equal(t[0].dialogueStart, true);
});

test('mid-line dash is a short pause, not a word', () => {
  const t = tokenize('Sonra — biraz durdu — gitti.');
  assert.deepEqual(texts(t), ['Sonra', 'biraz', 'durdu', 'gitti.']);
  assert.equal(t[0].punctuation, 'comma');
  assert.equal(t[2].punctuation, 'comma');
});

test('silent reply keeps its ellipsis as a token', () => {
  const t = tokenize('— ...\n— Ne?');
  assert.deepEqual(texts(t), ['...', 'Ne?']);
  assert.equal(t[0].dialogue, true);
});

test('quotes stick to words and mark dialogue until closed', () => {
  const t = tokenize('Babam: «Bir mektep bul, oku!» diyordu.');
  assert.deepEqual(texts(t), ['Babam:', '«Bir', 'mektep', 'bul,', 'oku!»', 'diyordu.']);
  assert.deepEqual(t.map((x) => x.dialogue), [false, true, true, true, true, false]);
  assert.equal(t[1].dialogueStart, true);
  assert.equal(t[4].sentenceEnd, true);
});

test('standalone quote marks attach to neighbours', () => {
  const t = tokenize('" Evet " dedi .');
  assert.deepEqual(texts(t), ['"Evet"', 'dedi.']);
  assert.equal(t[0].dialogue, true);
  assert.equal(t[1].dialogue, false);
  assert.equal(t[1].sentenceEnd, true);
});

test('wiki-style backtick quotes are normalized', () => {
  const t = tokenize('Kumandanın ``bizim kale´´ dediği');
  assert.deepEqual(texts(t), ['Kumandanın', '“bizim', 'kale”', 'dediği']);
  assert.equal(t[1].dialogue, true);
  assert.equal(t[3].dialogue, false);
});

test('apostrophes inside words are kept', () => {
  const t = tokenize("Ben Türk'üm, Akdeniz'in.");
  assert.deepEqual(texts(t), ['Ben', "Türk'üm,", "Akdeniz'in."]);
  assert.equal(t.some((x) => x.dialogue), false);
});

test('wiki headings are skipped', () => {
  assert.deepEqual(texts(tokenize('Son.\n==Dipnotlar==\n')), ['Son.']);
});

test('words glued by sentence punctuation are split', () => {
  assert.deepEqual(texts(tokenize('münakaşalar...Herkesin')), ['münakaşalar...', 'Herkesin']);
  assert.deepEqual(texts(tokenize('şartlarla?"diyorlar,')), ['şartlarla?"', 'diyorlar,']);
  assert.deepEqual(texts(tokenize('be!..dedi.')), ['be!..', 'dedi.']);
  assert.deepEqual(texts(tokenize('M.Kemal')), ['M.', 'Kemal']);
  assert.deepEqual(texts(tokenize('vb.den 3.5 www.ornek.com')), ['vb.den', '3.5', 'www.ornek.com']);
});
