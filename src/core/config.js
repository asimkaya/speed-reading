export const WORDS_PER_PAGE = 250;

export const WPM_DEFAULT = 300;
export const WPM_MIN = 100;
export const WPM_MAX = 900;
export const WPM_STEP = 25;

// Extra pause after a word, in units of the base word duration (60000 / wpm).
// Only the strongest applicable pause is used; they never stack.
export const PAUSES = {
  comma: 0.6,
  semicolon: 1.0,
  sentence: 1.6,
  paragraph: 2.5,
  scene: 4.0,
};

export const TIMING = {
  functionWordFactor: 0.8,
  longWordThreshold: 8,
  longWordStep: 0.05,
  longWordMaxBonus: 0.6,
  dialogueStartBonus: 0.5,
};

// Soft start: after play/resume/jump the first words stay longer and ease into full speed.
// The first word gets (1 + extra) × its normal time, falling linearly to 1× over `words`.
export const SOFT_START = {
  words: 8,
  extra: 1.0,
};

// Context shown while paused: previous + current sentence, capped in length.
export const CONTEXT = {
  maxWords: 40,
  maxBefore: 20,
};

export const FUNCTION_WORDS = new Set([
  've', 'bir', 'da', 'de', 'ki', 'bu', 'şu', 'o', 'ile', 'mi', 'mı', 'mu', 'mü',
  'ya', 'ne', 'en', 'çok', 'gibi', 'için', 'ama',
]);

// Lowercased, without the trailing dot.
export const ABBREVIATIONS = new Set([
  'dr', 'prof', 'doç', 'av', 'vb', 'vs', 'bkz', 'örn', 'sn', 'yy', 'no', 'st',
  'sok', 'cad', 'mah', 'apt', 'alb', 'yzb', 'bnb', 'tğm', 'gen', 'ord', 'müh',
  'uzm', 'op', 'mr', 'mrs', 'mö', 'ms', 'bşk', 'yrd',
]);
