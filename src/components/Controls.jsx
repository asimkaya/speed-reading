import { WPM_MAX, WPM_MIN, WPM_STEP } from '../core/config.js';

export function Controls({ status, wpm, onToggle, onRewind, onFinish, onWpm, canFinish }) {
  const playing = status === 'playing';
  return (
    <div className="controls" data-testid="controls">
      <div className="speed">
        <button
          type="button"
          className="btn btn--round"
          onClick={() => onWpm(wpm - WPM_STEP)}
          disabled={wpm <= WPM_MIN}
          aria-label="Yavaşlat"
        >
          −
        </button>
        <label className="speed__slider">
          <span className="speed__value" data-testid="wpm">
            {wpm} <small>kelime/dk</small>
          </span>
          <input
            type="range"
            min={WPM_MIN}
            max={WPM_MAX}
            step={WPM_STEP}
            value={wpm}
            onChange={(e) => onWpm(Number(e.target.value))}
            aria-label="Okuma hızı"
          />
        </label>
        <button
          type="button"
          className="btn btn--round"
          onClick={() => onWpm(wpm + WPM_STEP)}
          disabled={wpm >= WPM_MAX}
          aria-label="Hızlandır"
        >
          +
        </button>
      </div>

      <div className="transport">
        <button type="button" className="btn btn--side" onClick={onRewind} aria-label="Cümle başına dön">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" /></svg>
          <span>Geri</span>
        </button>
        <button
          type="button"
          className="btn btn--play"
          onClick={onToggle}
          aria-label={playing ? 'Duraklat' : 'Oynat'}
          data-testid="play"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
          )}
        </button>
        <button type="button" className="btn btn--side" onClick={onFinish} disabled={!canFinish} aria-label="Bitir">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10H7z" /></svg>
          <span>Bitir</span>
        </button>
      </div>
    </div>
  );
}
