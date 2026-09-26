import { useCallback, useEffect, useMemo, useState } from 'react';
import { tokenize } from './core/tokenizer.js';
import { baseDuration, remainingUnits } from './core/timing.js';
import { sentenceStart } from './core/player.js';
import { WPM_STEP } from './core/config.js';
import { TEXTS, CUSTOM_TEXT_ID, DEFAULT_TEXT_ID } from './texts.js';
import { loadSettings, saveSettings } from './settings.js';
import { usePlayer } from './usePlayer.js';
import { formatInt, formatMinutes, formatPages } from './format.js';
import { WordDisplay } from './components/WordDisplay.jsx';
import { Controls } from './components/Controls.jsx';
import { Summary } from './components/Summary.jsx';
import { Menu } from './components/Menu.jsx';

const WORD_COUNTS = Object.fromEntries(TEXTS.map((t) => [t.id, tokenize(t.body).length]));

export function App() {
  const [settings, setSettings] = useState(loadSettings);
  const [customText, setCustomText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const textId = settings.textId === CUSTOM_TEXT_ID && !customText ? DEFAULT_TEXT_ID : settings.textId;
  const text = useMemo(
    () =>
      textId === CUSTOM_TEXT_ID
        ? { id: CUSTOM_TEXT_ID, title: 'Kendi metnin', author: '', body: customText }
        : TEXTS.find((t) => t.id === textId) ?? TEXTS[0],
    [textId, customText],
  );
  const tokens = useMemo(() => tokenize(text.body), [text.body]);
  const units = useMemo(() => remainingUnits(tokens), [tokens]);
  const { player, state } = usePlayer(tokens, settings.wpm);

  const updateSetting = useCallback((key, value) => setSettings((s) => ({ ...s, [key]: value })), []);

  useEffect(() => {
    saveSettings({ ...settings, textId: settings.textId === CUSTOM_TEXT_ID ? DEFAULT_TEXT_ID : settings.textId });
  }, [settings]);

  useEffect(() => {
    if (state && state.wpm !== settings.wpm) updateSetting('wpm', state.wpm);
  }, [state, settings.wpm, updateSetting]);

  const status = state?.status ?? 'idle';
  const canFinish = status === 'playing' || status === 'paused';

  useEffect(() => {
    if (!player) return undefined;
    const onVisibility = () => {
      if (document.hidden) player.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [player]);

  useEffect(() => {
    if (!player) return undefined;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        else if (canFinish) player.finish();
        return;
      }
      if (menuOpen || status === 'finished') return;
      const el = e.target;
      if (el.closest?.('input, textarea, select')) return;
      const onButton = !!el.closest?.('button, summary');
      const s = player.getState();
      if (e.key === ' ' && !onButton) {
        e.preventDefault();
        player.toggle();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        player.rewind();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        player.setWpm(s.wpm + WPM_STEP);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        player.setWpm(s.wpm - WPM_STEP);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [player, menuOpen, status, canFinish]);

  if (!player || !state) return null;

  const total = tokens.length;
  const empty = total === 0;
  const idle = status === 'idle';
  const shownIndex = idle ? -1 : state.index;
  const progress = total ? (shownIndex + 1) / total : 0;
  const remainingMs = baseDuration(state.wpm) * (units[Math.max(shownIndex, 0)] ?? 0);

  const selectText = (id) => {
    player.pause();
    updateSetting('textId', id);
    setMenuOpen(false);
  };

  const readCustom = (body) => {
    player.pause();
    setCustomText(body);
    updateSetting('textId', CUSTOM_TEXT_ID);
    setMenuOpen(false);
  };

  const openMenu = () => {
    player.pause();
    setMenuOpen(true);
  };

  const seekFromPointer = (e) => {
    if (empty) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const target = Math.min(total - 1, Math.floor(ratio * total));
    player.seek(sentenceStart(tokens, target));
  };

  return (
    <div className={`app app--${status}`}>
      <header className="topbar">
        <button type="button" className="title-btn" onClick={openMenu} data-testid="open-menu">
          <span className="title-btn__title">{text.title}</span>
          {text.author && <span className="title-btn__author">{text.author}</span>}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
        </button>
      </header>

      <main className="stage" onClick={() => !empty && player.toggle()} data-testid="stage">
        {empty ? (
          <div className="start">
            <p>Bu metinde okunacak kelime yok.</p>
            <p className="start__hint">Menüden başka bir metin seç ya da yeni metin yapıştır.</p>
          </div>
        ) : idle ? (
          <div className="start" data-testid="start">
            <h1>{text.title}</h1>
            {text.subtitle && <p className="start__sub">{text.subtitle}</p>}
            <p className="start__meta">
              {formatInt(total)} kelime · ~{formatPages(total)} sayfa · {formatMinutes(remainingMs)}
            </p>
            <p className="start__hint">Başlamak için dokun</p>
          </div>
        ) : (
          <>
            <WordDisplay token={state.token} orp={settings.orp} dialogueCue={settings.dialogueCue} />
            <p className="stage__hint" aria-hidden={status !== 'paused'}>
              {status === 'paused' ? 'Duraklatıldı · devam için dokun' : ' '}
            </p>
          </>
        )}
      </main>

      <section className="bottom">
        <div
          className="progress"
          onClick={seekFromPointer}
          role="slider"
          aria-label="Metindeki konum"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          data-testid="progress"
        >
          <div className="progress__fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="meta" data-testid="meta">
          <span>
            {formatInt(Math.max(shownIndex + 1, 0))} / {formatInt(total)}
          </span>
          <span>{empty ? '' : `${formatMinutes(remainingMs)} kaldı`}</span>
        </div>
        <Controls
          status={status}
          wpm={state.wpm}
          canFinish={canFinish}
          onToggle={() => !empty && player.toggle()}
          onRewind={() => player.rewind()}
          onFinish={() => player.finish()}
          onWpm={(v) => player.setWpm(v)}
        />
      </section>

      {status === 'finished' && (
        <Summary
          stats={player.getStats()}
          endReason={state.endReason}
          onRestart={() => player.restart()}
          onResume={() => player.resume()}
          onPickText={() => {
            player.restart();
            setMenuOpen(true);
          }}
        />
      )}

      {menuOpen && (
        <Menu
          currentId={textId}
          wordCounts={WORD_COUNTS}
          customText={customText}
          settings={settings}
          onSelect={selectText}
          onCustom={readCustom}
          onSetting={updateSetting}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
