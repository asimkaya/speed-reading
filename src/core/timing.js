import { FUNCTION_WORDS, PAUSES, SOFT_START, TIMING, WPM_MAX, WPM_MIN } from './config.js';
import { letterCount } from './orp.js';

export function clampWpm(wpm) {
  const n = Math.round(Number(wpm));
  if (!Number.isFinite(n)) return WPM_MIN;
  return Math.min(WPM_MAX, Math.max(WPM_MIN, n));
}

export function baseDuration(wpm) {
  return 60000 / clampWpm(wpm);
}

/** Pause weight after a word; the strongest one wins, they never add up. */
export function pauseWeight(token, pauses = PAUSES) {
  if (token.sceneBreak) return pauses.scene;
  if (token.paragraphEnd) return pauses.paragraph;
  if (token.punctuation === 'sentence') return pauses.sentence;
  if (token.punctuation === 'semicolon') return pauses.semicolon;
  if (token.punctuation === 'comma') return pauses.comma;
  return 0;
}

export function wordWeight(token, timing = TIMING) {
  const letters = letterCount(token.text);
  const core = token.text.replace(/[^\p{L}\p{N}]/gu, '').toLocaleLowerCase('tr');
  let w = FUNCTION_WORDS.has(core) ? timing.functionWordFactor : 1;
  if (letters > timing.longWordThreshold) {
    w += Math.min((letters - timing.longWordThreshold) * timing.longWordStep, timing.longWordMaxBonus);
  }
  if (token.dialogueStart) w += timing.dialogueStartBonus;
  return w;
}

/** Screen time of a token in units of the base duration. */
export function durationUnits(token, options = {}) {
  return wordWeight(token, options.timing) + pauseWeight(token, options.pauses);
}

/** How long (ms) a token stays on screen at the given speed. */
export function wordDuration(token, wpm, options = {}) {
  return baseDuration(wpm) * durationUnits(token, options);
}

/** suffix[i] = total duration units from token i to the end; multiply by baseDuration(wpm) for ms. */
export function remainingUnits(tokens) {
  const suffix = new Float64Array(tokens.length + 1);
  for (let i = tokens.length - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + durationUnits(tokens[i]);
  return suffix;
}

/** Duration multiplier for the k-th word (0-based) after playback (re)starts. */
export function softStartFactor(k, softStart = SOFT_START) {
  if (k >= softStart.words || softStart.words <= 0) return 1;
  return 1 + softStart.extra * (1 - k / softStart.words);
}

export function estimateDuration(tokens, wpm, from = 0) {
  return baseDuration(wpm) * (remainingUnits(tokens)[from] ?? 0);
}
