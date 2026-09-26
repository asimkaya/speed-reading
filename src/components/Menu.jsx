import { useState } from 'react';
import { TEXTS, CUSTOM_TEXT_ID } from '../texts.js';
import { formatInt, formatPages } from '../format.js';

export function Menu({ currentId, wordCounts, customText, settings, onSelect, onCustom, onSetting, onClose }) {
  const [draft, setDraft] = useState(customText);
  const draftEmpty = draft.trim().length === 0;

  return (
    <div className="overlay overlay--sheet" role="dialog" aria-modal="true" aria-label="Metin ve ayarlar" onClick={onClose}>
      <div className="card sheet" onClick={(e) => e.stopPropagation()} data-testid="menu">
        <div className="sheet__head">
          <h2>Metin seç</h2>
          <button type="button" className="btn btn--ghost" onClick={onClose} aria-label="Kapat">
            Kapat
          </button>
        </div>

        <ul className="text-list">
          {TEXTS.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                className={`text-item ${t.id === currentId ? 'text-item--active' : ''}`}
                onClick={() => onSelect(t.id)}
              >
                <span className="text-item__title">{t.title}</span>
                <span className="text-item__meta">
                  {t.author} · {formatInt(wordCounts[t.id])} kelime · ~{formatPages(wordCounts[t.id])} sayfa
                </span>
              </button>
            </li>
          ))}
        </ul>

        <details className="custom" open={currentId === CUSTOM_TEXT_ID}>
          <summary>Kendi metnini yapıştır</summary>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Okumak istediğin düz metni buraya yapıştır…"
            rows={5}
            data-testid="custom-text"
          />
          <button
            type="button"
            className="btn btn--primary"
            disabled={draftEmpty}
            onClick={() => onCustom(draft)}
            data-testid="custom-submit"
          >
            Bu metni oku
          </button>
        </details>

        <h2 className="sheet__sub">Ayarlar</h2>
        <label className="toggle">
          <input type="checkbox" checked={settings.orp} onChange={(e) => onSetting('orp', e.target.checked)} />
          <span>
            Odak harfini renklendir
            <small>Kelimenin göz için en kolay tanınan harfi vurgulanır.</small>
          </span>
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={settings.dialogueCue}
            onChange={(e) => onSetting('dialogueCue', e.target.checked)}
          />
          <span>
            Konuşmaları farklı göster
            <small>Tırnak içindeki ve tireyle başlayan replikler hafif italik görünür.</small>
          </span>
        </label>
        <p className="sheet__keys">
          Klavye: <kbd>Boşluk</kbd> duraklat/devam · <kbd>←</kbd> cümle başı · <kbd>↑</kbd>/<kbd>↓</kbd> hız ·{' '}
          <kbd>Esc</kbd> bitir
        </p>
      </div>
    </div>
  );
}
