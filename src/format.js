import { WORDS_PER_PAGE } from './core/config.js';

export const formatInt = (n) => Math.round(n).toLocaleString('tr-TR');

export const formatPages = (words) =>
  (words / WORDS_PER_PAGE).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function formatDuration(ms) {
  const total = Math.round(ms / 1000);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  if (min === 0) return `${sec} sn`;
  if (sec === 0) return `${min} dk`;
  return `${min} dk ${sec} sn`;
}

export function formatMinutes(ms) {
  const min = ms / 60000;
  if (min < 1) return '1 dk’dan az';
  return `~${Math.round(min)} dk`;
}

export const formatPercent = (ratio) => `%${Math.round(ratio * 100)}`;
