import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStatsTracker, summarize } from '../src/core/stats.js';

test('counts only words that were shown, once each', () => {
  const s = createStatsTracker(10);
  [0, 1, 2, 2, 1, 3].forEach((i) => s.markShown(i));
  const snap = s.snapshot(0);
  assert.equal(snap.wordsRead, 4);
  assert.equal(snap.furthestIndex, 3);
});

test('active time excludes paused intervals', () => {
  const s = createStatsTracker(10);
  s.start(1000);
  s.stop(4000);
  s.start(10000);
  s.stop(12000);
  assert.equal(s.snapshot(20000).activeMs, 5000);
});

test('snapshot includes the running interval', () => {
  const s = createStatsTracker(10);
  s.start(0);
  assert.equal(s.snapshot(1500).activeMs, 1500);
});

test('summary: pages, average WPM and progress', () => {
  const r = summarize({ wordsRead: 500, activeMs: 120000, furthestIndex: 499, totalWords: 1000 });
  assert.equal(r.pages, 2);
  assert.equal(r.avgWpm, 250);
  assert.equal(r.progress, 0.5);
  assert.equal(r.completed, false);
});

test('summary of an empty session has no NaN', () => {
  const r = summarize({ wordsRead: 0, activeMs: 0, furthestIndex: -1, totalWords: 0 });
  assert.deepEqual(r, { wordsRead: 0, pages: 0, activeMs: 0, avgWpm: 0, progress: 0, completed: false });
});

test('reset clears everything', () => {
  const s = createStatsTracker(5);
  s.start(0);
  s.markShown(4);
  s.reset();
  assert.deepEqual(s.snapshot(100), { wordsRead: 0, activeMs: 0, furthestIndex: -1, totalWords: 5 });
});
