import { Fragment } from 'react';
import { contextWindow } from '../core/context.js';

/** The surrounding sentences, shown while paused; tapping a word jumps there. */
export function PauseContext({ tokens, index, onSeek }) {
  const { start, end, cutBefore, cutAfter } = contextWindow(tokens, index);
  const words = [];
  for (let i = start; i < end; i++) {
    const t = tokens[i];
    words.push(
      <Fragment key={i}>
        <span
          className={`ctx__word${i === index ? ' ctx__word--current' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onSeek(i);
          }}
        >
          {t.text}
        </span>
        {t.paragraphEnd && i < end - 1 ? <span className="ctx__break" /> : ' '}
      </Fragment>,
    );
  }
  return (
    <p className="ctx" data-testid="context">
      {cutBefore && '… '}
      {words}
      {cutAfter && '…'}
    </p>
  );
}
