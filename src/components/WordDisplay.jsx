import { useLayoutEffect, useRef, useState } from 'react';
import { splitAtOrp } from '../core/orp.js';

// Horizontal position of the focus letter, as a fraction of the stage width.
// Left of centre because the ORP sits near the start of a word.
export const FOCUS_X = 0.35;
const FONT_STACK = "'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, 'Noto Serif', 'DejaVu Serif', serif";
const SIDE_PADDING = 8;

let measureCtx = null;
function measure(text, px, italic) {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
  measureCtx.font = `${italic ? 'italic ' : ''}400 ${px}px ${FONT_STACK}`;
  return measureCtx.measureText(text).width;
}

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

export function baseFontSize(width) {
  return Math.round(Math.min(64, Math.max(34, width / 8.5)));
}

/** Largest font size (≤ base) at which the word fits on both sides of the focus point. */
function fitFontSize({ before, pivot, after }, width, italic) {
  const base = baseFontSize(width);
  if (!width) return base;
  const halfPivot = measure(pivot, base, italic) / 2;
  const left = measure(before, base, italic) + halfPivot;
  const right = measure(after, base, italic) + halfPivot;
  const roomLeft = width * FOCUS_X - SIDE_PADDING;
  const roomRight = width * (1 - FOCUS_X) - SIDE_PADDING;
  const scale = Math.min(1, roomLeft / Math.max(left, 1), roomRight / Math.max(right, 1));
  // No lower bound: a word is never clipped, even if it has to get small.
  return Math.max(1, Math.floor(base * scale * 100) / 100);
}

export function WordDisplay({ token, orp, dialogueCue }) {
  const ref = useRef(null);
  const width = useWidth(ref);
  const parts = splitAtOrp(token?.text ?? '');
  const italic = !!(dialogueCue && token?.dialogue);
  const fontSize = fitFontSize(parts, width, italic);
  const classes = ['word'];
  if (orp) classes.push('word--orp');
  if (italic) classes.push('word--dialogue');

  return (
    <div className="word-frame" ref={ref} style={{ '--focus-x': `${FOCUS_X * 100}%`, fontFamily: FONT_STACK }}>
      <span className="focus-tick focus-tick--top" aria-hidden="true" />
      <div className={classes.join(' ')} style={{ fontSize }} data-testid="word" aria-live="off">
        {parts.pivot && (
          <span className="word__pivot" data-testid="pivot">
            <span className="word__before">{parts.before}</span>
            {parts.pivot}
            <span className="word__after">{parts.after}</span>
          </span>
        )}
      </div>
      <span className="focus-tick focus-tick--bottom" aria-hidden="true" />
    </div>
  );
}
