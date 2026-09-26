import { WPM_DEFAULT } from './config.js';
import { createStatsTracker, summarize } from './stats.js';
import { clampWpm, wordDuration } from './timing.js';

const defaultClock = {
  now: () => (typeof performance !== 'undefined' ? performance.now() : Date.now()),
  setTimeout: (fn, ms) => setTimeout(fn, ms),
  clearTimeout: (id) => clearTimeout(id),
};

export function sentenceStart(tokens, index) {
  let j = Math.min(index, tokens.length) - 1;
  while (j >= 0 && !(tokens[j].sentenceEnd || tokens[j].paragraphEnd)) j--;
  return j + 1;
}

/**
 * Target for "back to sentence": the start of the current sentence, or of the
 * previous one when the reader is already within its first `grace` words.
 */
export function rewindTarget(tokens, index, grace = 2) {
  if (tokens.length === 0) return 0;
  const i = Math.min(Math.max(index, 0), tokens.length - 1);
  const start = sentenceStart(tokens, i);
  if (i - start < grace && start > 0) return sentenceStart(tokens, start - 1);
  return start;
}

/**
 * Framework-free RSVP player: idle → playing ⇄ paused → finished.
 * The clock is injectable so the state machine can be tested without real time.
 */
export function createPlayer(tokens, { wpm = WPM_DEFAULT, clock = defaultClock } = {}) {
  const stats = createStatsTracker(tokens.length);
  const listeners = new Set();
  let status = 'idle';
  let index = 0;
  let speed = clampWpm(wpm);
  let endReason = null;
  let timer = null;

  const emit = () => {
    const s = getState();
    listeners.forEach((fn) => fn(s));
  };

  const cancel = () => {
    if (timer !== null) {
      clock.clearTimeout(timer);
      timer = null;
    }
  };

  const show = (i) => {
    index = i;
    stats.markShown(i);
    emit();
    timer = clock.setTimeout(advance, wordDuration(tokens[i], speed));
  };

  function advance() {
    timer = null;
    if (index + 1 >= tokens.length) finish('end');
    else show(index + 1);
  }

  function getState() {
    return {
      status,
      index,
      wpm: speed,
      endReason,
      total: tokens.length,
      token: tokens[index] ?? null,
    };
  }

  function play() {
    if (tokens.length === 0 || status === 'playing') return;
    if (status === 'finished' && endReason === 'end') {
      restart();
    }
    status = 'playing';
    endReason = null;
    stats.start(clock.now());
    show(index);
  }

  function pause() {
    if (status !== 'playing') return;
    cancel();
    stats.stop(clock.now());
    status = 'paused';
    emit();
  }

  function toggle() {
    if (status === 'playing') pause();
    else play();
  }

  function seek(i) {
    if (tokens.length === 0 || status === 'finished') return;
    const target = Math.min(Math.max(Math.round(i), 0), tokens.length - 1);
    if (status === 'playing') {
      cancel();
      show(target);
    } else {
      index = target;
      emit();
    }
  }

  function rewind() {
    seek(rewindTarget(tokens, index));
  }

  function setWpm(value) {
    speed = clampWpm(value);
    emit();
  }

  function finish(reason = 'user') {
    if (status === 'finished') return;
    cancel();
    stats.stop(clock.now());
    status = 'finished';
    endReason = reason;
    emit();
  }

  function restart() {
    cancel();
    stats.reset();
    status = 'idle';
    index = 0;
    endReason = null;
    emit();
  }

  /** Leave the summary after a user-initiated finish and continue from the same word. */
  function resume() {
    if (status !== 'finished' || endReason !== 'user') return;
    status = 'paused';
    endReason = null;
    emit();
  }

  return {
    play,
    pause,
    toggle,
    seek,
    rewind,
    setWpm,
    finish,
    restart,
    resume,
    getState,
    getStats: () => summarize(stats.snapshot(clock.now())),
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    destroy() {
      cancel();
      listeners.clear();
    },
  };
}
