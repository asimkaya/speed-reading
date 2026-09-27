import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer, rewindTarget, sentenceStart } from '../src/core/player.js';
import { tokenize } from '../src/core/tokenizer.js';
import { wordDuration } from '../src/core/timing.js';

function fakeClock() {
  let now = 0;
  let queue = [];
  let nextId = 1;
  return {
    now: () => now,
    setTimeout(fn, ms) {
      const id = nextId++;
      queue.push({ id, at: now + ms, fn });
      return id;
    },
    clearTimeout(id) {
      queue = queue.filter((t) => t.id !== id);
    },
    tick(ms) {
      const end = now + ms;
      for (;;) {
        queue.sort((a, b) => a.at - b.at);
        const t = queue[0];
        if (!t || t.at > end) break;
        queue.shift();
        now = t.at;
        t.fn();
      }
      now = end;
    },
    pending: () => queue.length,
  };
}

// Five plain words, equal duration at 300 WPM = 200 ms each.
const PLAIN = tokenize('kalem defter silgi masa kapı');

function setup(text = PLAIN, wpm = 300) {
  const clock = fakeClock();
  const tokens = typeof text === 'string' ? tokenize(text) : text;
  const player = createPlayer(tokens, { wpm, clock });
  const seen = [];
  player.subscribe((s) => {
    if (s.status === 'playing') seen.push(s.index);
  });
  return { clock, player, tokens, seen };
}

test('starts idle on the first word', () => {
  const { player } = setup();
  assert.equal(player.getState().status, 'idle');
  assert.equal(player.getState().index, 0);
});

test('plays words in order with their durations and finishes at the end', () => {
  const { clock, player, seen, tokens } = setup('kalem defter silgi masa kapı');
  player.play();
  assert.deepEqual(seen, [0]);
  clock.tick(199);
  assert.deepEqual(seen, [0]);
  clock.tick(1);
  assert.deepEqual(seen, [0, 1]);
  const rest = tokens.slice(1).reduce((sum, t) => sum + wordDuration(t, 300), 0);
  clock.tick(rest);
  assert.deepEqual(seen, [0, 1, 2, 3, 4]);
  const s = player.getState();
  assert.equal(s.status, 'finished');
  assert.equal(s.endReason, 'end');
  assert.equal(clock.pending(), 0);
});

test('pause and resume continue from the same word', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(450);
  assert.equal(player.getState().index, 2);
  player.pause();
  assert.equal(player.getState().status, 'paused');
  clock.tick(10000);
  assert.equal(player.getState().index, 2, 'nothing advances while paused');
  player.play();
  assert.equal(player.getState().index, 2);
  clock.tick(200);
  assert.equal(player.getState().index, 3);
});

test('toggle switches between playing and paused', () => {
  const { player } = setup();
  player.toggle();
  assert.equal(player.getState().status, 'playing');
  player.toggle();
  assert.equal(player.getState().status, 'paused');
});

test('WPM change while playing applies from the next word', () => {
  const { clock, player } = setup();
  player.play();
  player.setWpm(600);
  assert.equal(player.getState().wpm, 600);
  clock.tick(199);
  assert.equal(player.getState().index, 0, 'current word keeps its original timer');
  clock.tick(1);
  assert.equal(player.getState().index, 1);
  clock.tick(100);
  assert.equal(player.getState().index, 2, 'next word uses the new speed');
});

test('user can finish early; only shown words count', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(450);
  player.finish();
  const s = player.getState();
  assert.equal(s.status, 'finished');
  assert.equal(s.endReason, 'user');
  const stats = player.getStats();
  assert.equal(stats.wordsRead, 3);
  assert.equal(stats.activeMs, 450);
  assert.equal(stats.completed, false);
  assert.equal(stats.progress, 3 / 5);
});

test('paused time is excluded from reading time', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(100);
  player.pause();
  clock.tick(60000);
  player.play();
  clock.tick(100);
  player.finish();
  assert.equal(player.getStats().activeMs, 200);
});

test('resume after an early finish continues from the same word', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(450);
  player.finish();
  player.resume();
  assert.equal(player.getState().status, 'paused');
  assert.equal(player.getState().index, 2);
  player.play();
  clock.tick(10000);
  assert.equal(player.getStats().wordsRead, 5);
  assert.equal(player.getStats().completed, true);
});

test('play after reaching the end restarts from the beginning', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(10000);
  assert.equal(player.getState().status, 'finished');
  player.play();
  assert.equal(player.getState().status, 'playing');
  assert.equal(player.getState().index, 0);
  assert.equal(player.getStats().wordsRead, 1);
});

test('restart resets position and stats', () => {
  const { clock, player } = setup();
  player.play();
  clock.tick(450);
  player.restart();
  assert.equal(player.getState().status, 'idle');
  assert.equal(player.getState().index, 0);
  assert.equal(player.getStats().wordsRead, 0);
  assert.equal(clock.pending(), 0);
});

test('seek while paused moves without playing; while playing shows the target', () => {
  const { clock, player } = setup();
  player.seek(3);
  assert.equal(player.getState().index, 3);
  assert.equal(player.getStats().wordsRead, 0);
  player.play();
  clock.tick(50);
  player.seek(1);
  assert.equal(player.getState().index, 1);
  clock.tick(200);
  assert.equal(player.getState().index, 2);
  player.seek(99);
  assert.equal(player.getState().index, 4);
});

test('sentence start and rewind target', () => {
  const tokens = tokenize('Bir iki üç. Dört beş altı yedi. Sekiz');
  assert.equal(sentenceStart(tokens, 5), 3);
  assert.equal(sentenceStart(tokens, 3), 3);
  assert.equal(sentenceStart(tokens, 0), 0);
  assert.equal(rewindTarget(tokens, 6), 3, 'deep in a sentence → its start');
  assert.equal(rewindTarget(tokens, 4), 0, 'just started → previous sentence');
  assert.equal(rewindTarget(tokens, 7), 3);
  assert.equal(rewindTarget(tokens, 1), 0);
});

test('rewind while playing jumps back and keeps playing', () => {
  const { clock, player, tokens } = setup('Bir iki üç. Dört beş altı yedi.');
  player.play();
  let t = 0;
  while (player.getState().index < 6) {
    clock.tick(10);
    t += 10;
    assert.ok(t < 100000);
  }
  player.rewind();
  assert.equal(player.getState().index, 3);
  assert.equal(player.getState().status, 'playing');
  assert.equal(tokens[3].text, 'Dört');
});

test('empty text never crashes', () => {
  const { player } = setup('');
  player.play();
  player.toggle();
  player.rewind();
  player.seek(5);
  player.setWpm(500);
  assert.equal(player.getState().status, 'idle');
  assert.equal(player.getState().token, null);
  player.finish();
  const stats = player.getStats();
  assert.equal(stats.wordsRead, 0);
  assert.equal(stats.avgWpm, 0);
});

test('single word text plays and finishes', () => {
  const { clock, player } = setup('Merhaba');
  player.play();
  clock.tick(5000);
  assert.equal(player.getState().status, 'finished');
  assert.equal(player.getStats().wordsRead, 1);
  assert.equal(player.getStats().completed, true);
});

test('measured average WPM is close to the setting for plain words', () => {
  const words = Array.from({ length: 300 }, () => 'kalem').join(' ');
  const { clock, player } = setup(words, 300);
  player.play();
  clock.tick(60000 * 2);
  const stats = player.getStats();
  assert.equal(player.getState().status, 'finished');
  // Only the final paragraph pause slows the pace down slightly.
  assert.ok(Math.abs(stats.avgWpm - 300) <= 3, `avg ${stats.avgWpm}`);
});

test('starts at a saved position without counting it as read', () => {
  const clock = fakeClock();
  const player = createPlayer(PLAIN, { wpm: 300, clock, startIndex: 3 });
  assert.equal(player.getState().status, 'idle');
  assert.equal(player.getState().index, 3);
  player.play();
  assert.equal(player.getState().index, 3);
  clock.tick(5000);
  const stats = player.getStats();
  assert.equal(stats.wordsRead, 2);
  assert.equal(stats.completed, true);
});

test('invalid saved positions are clamped', () => {
  assert.equal(createPlayer(PLAIN, { startIndex: 99 }).getState().index, 4);
  assert.equal(createPlayer(PLAIN, { startIndex: -5 }).getState().index, 0);
  assert.equal(createPlayer(PLAIN, { startIndex: 'x' }).getState().index, 0);
  assert.equal(createPlayer([], { startIndex: 3 }).getState().index, 0);
});

test('restart goes back to the very beginning even after a saved start', () => {
  const player = createPlayer(PLAIN, { startIndex: 3, clock: fakeClock() });
  player.restart();
  assert.equal(player.getState().index, 0);
});

test('soft start: first words are slower, then full speed', () => {
  const words = Array.from({ length: 20 }, () => 'kalem').join(' ');
  const clock = fakeClock();
  const player = createPlayer(tokenize(words), { wpm: 300, clock, softStart: true });
  const times = [];
  let last = 0;
  player.subscribe((s) => {
    if (s.status === 'playing') {
      times.push(clock.now() - last);
      last = clock.now();
    }
  });
  player.play();
  clock.tick(60000);
  const durations = times.slice(1);
  assert.equal(durations[0], 400, 'first word shown twice as long');
  for (let k = 1; k < 8; k++) assert.ok(durations[k] < durations[k - 1], `word ${k} faster than ${k - 1}`);
  assert.equal(durations[8], 200, 'full speed after the ramp');
  assert.equal(durations[12], 200);
});

test('soft start restarts after pause and after a jump', () => {
  const words = Array.from({ length: 30 }, () => 'kalem').join(' ');
  const clock = fakeClock();
  const player = createPlayer(tokenize(words), { wpm: 300, clock, softStart: true });
  player.play();
  clock.tick(3000);
  const i = player.getState().index;
  assert.equal(player.getState().status, 'playing');
  player.pause();
  player.play();
  clock.tick(399);
  assert.equal(player.getState().index, i, 'resumed word is held longer');
  clock.tick(1);
  assert.equal(player.getState().index, i + 1);
  player.seek(2);
  clock.tick(399);
  assert.equal(player.getState().index, 2, 'jump also eases in');
});

test('soft start can be switched off at runtime', () => {
  const clock = fakeClock();
  const player = createPlayer(PLAIN, { wpm: 300, clock, softStart: true });
  player.setSoftStart(false);
  player.play();
  clock.tick(200);
  assert.equal(player.getState().index, 1);
});
