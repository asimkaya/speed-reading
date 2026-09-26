import { WPM_DEFAULT } from './core/config.js';
import { clampWpm } from './core/timing.js';
import { DEFAULT_TEXT_ID } from './texts.js';

const KEY = 'hizli-okuma:settings';

export const DEFAULT_SETTINGS = {
  wpm: WPM_DEFAULT,
  orp: true,
  dialogueCue: true,
  textId: DEFAULT_TEXT_ID,
};

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...DEFAULT_SETTINGS, ...saved, wpm: clampWpm(saved.wpm ?? WPM_DEFAULT) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    // Storage unavailable (private mode etc.); settings just won't persist.
  }
}
