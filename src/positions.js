const KEY = 'hizli-okuma:positions';

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch {
    return {};
  }
}

/** Saved reading position for a text, or 0. Ignored if the text's length changed. */
export function loadPosition(textId, total) {
  const saved = readAll()[textId];
  if (!saved || saved.total !== total) return 0;
  const i = Number(saved.index);
  return Number.isInteger(i) && i > 0 && i < total ? i : 0;
}

export function savePosition(textId, index, total) {
  try {
    const all = readAll();
    if (index > 0 && index < total) all[textId] = { index, total };
    else delete all[textId];
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable; position just won't be remembered.
  }
}
