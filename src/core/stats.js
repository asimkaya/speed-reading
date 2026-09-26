import { WORDS_PER_PAGE } from './config.js';

/** Tracks which words were actually shown and how long the reader was actively reading. */
export function createStatsTracker(totalWords) {
  let seen = new Uint8Array(totalWords);
  let uniqueSeen = 0;
  let furthest = -1;
  let activeMs = 0;
  let runningSince = null;

  return {
    markShown(index) {
      if (index < 0 || index >= totalWords) return;
      if (!seen[index]) {
        seen[index] = 1;
        uniqueSeen++;
      }
      if (index > furthest) furthest = index;
    },
    start(now) {
      if (runningSince === null) runningSince = now;
    },
    stop(now) {
      if (runningSince !== null) {
        activeMs += Math.max(0, now - runningSince);
        runningSince = null;
      }
    },
    reset() {
      seen = new Uint8Array(totalWords);
      uniqueSeen = 0;
      furthest = -1;
      activeMs = 0;
      runningSince = null;
    },
    snapshot(now) {
      const running = runningSince !== null ? Math.max(0, now - runningSince) : 0;
      return {
        wordsRead: uniqueSeen,
        activeMs: activeMs + running,
        furthestIndex: furthest,
        totalWords,
      };
    },
  };
}

export function summarize({ wordsRead, activeMs, furthestIndex, totalWords }, wordsPerPage = WORDS_PER_PAGE) {
  const minutes = activeMs / 60000;
  return {
    wordsRead,
    pages: wordsRead / wordsPerPage,
    activeMs,
    avgWpm: minutes > 0 && wordsRead > 0 ? Math.round(wordsRead / minutes) : 0,
    progress: totalWords > 0 ? (furthestIndex + 1) / totalWords : 0,
    completed: totalWords > 0 && furthestIndex >= totalWords - 1,
  };
}
