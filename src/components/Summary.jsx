import { formatDuration, formatInt, formatPages, formatPercent } from '../format.js';

export function Summary({ stats, endReason, onRestart, onResume, onPickText }) {
  const completed = endReason === 'end' || stats.completed;
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="summary-title">
      <div className="card summary" data-testid="summary">
        <h2 id="summary-title">{completed ? 'Metin bitti' : 'Oturum bitti'}</h2>
        <dl className="summary__grid">
          <div>
            <dt>Okunan kelime</dt>
            <dd data-testid="sum-words">{formatInt(stats.wordsRead)}</dd>
          </div>
          <div>
            <dt>Sayfa karşılığı</dt>
            <dd data-testid="sum-pages">{formatPages(stats.wordsRead)}</dd>
          </div>
          <div>
            <dt>Okuma süresi</dt>
            <dd data-testid="sum-time">{formatDuration(stats.activeMs)}</dd>
          </div>
          <div>
            <dt>Ortalama hız</dt>
            <dd data-testid="sum-wpm">
              {formatInt(stats.avgWpm)} <small>kelime/dk</small>
            </dd>
          </div>
        </dl>
        <p className="summary__progress" data-testid="sum-progress">
          {completed ? 'Metnin tamamı okundu.' : `İlerleme: ${formatPercent(stats.progress)} — yarıda bırakıldı.`}
        </p>
        <div className="summary__actions">
          {!completed && (
            <button type="button" className="btn btn--primary" onClick={onResume}>
              Kaldığın yerden devam
            </button>
          )}
          <button type="button" className={`btn ${completed ? 'btn--primary' : ''}`} onClick={onRestart}>
            Baştan oku
          </button>
          <button type="button" className="btn" onClick={onPickText}>
            Başka metin seç
          </button>
        </div>
        <p className="summary__note">
          Süre, duraklattığın anları içermez. Noktalama ve paragraf araları süreye dahil olduğu için ortalama hız,
          ayarladığın hızdan biraz düşük çıkar. Bu özet yalnızca hız ve miktarı gösterir; anlamayı ölçmez.
        </p>
      </div>
    </div>
  );
}
