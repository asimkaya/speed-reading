# POC Spesifikasyonu

Durum: **kesinleşti** (2026-09-26). Dil Türkçe, stack React + Vite, sayfa = 250 kelime, anlama testi yok.

## Modüller (ayrı, test edilebilir)
1. **tokenizer** — ham metin → kelime listesi. Her öğe: `{ text, paragraphEnd, sentenceEnd, punctuation }`. Boşluk/satır sonu normalizasyonu, tırnak/parantez sarmalı, kısaltmalar ("Dr.", "vb.") cümle sonu sayılmamalı.
2. **timing** — kelime + ayarlar (WPM, çarpanlar) → gösterim süresi (ms). Saf fonksiyon.
3. **orp** — kelime → odak harf indeksi (RESEARCH.md tablosu).
4. **player** — durum makinesi: idle / playing / paused / finished; play, pause, seek, back-to-sentence; hız değişimi anında uygulanır.
5. **stats** — okunan kelime, süre, ortalama WPM, sayfa (`kelime / 250`).
6. **UI** — tek ekran: metin seçici, kelime alanı (ORP hizalı), oynat/duraklat, hız kaydırıcı, ilerleme çubuğu, oturum sonu özeti.

## Davranış kabul kriterleri
- Sabit odak noktası: kelime değişirken ORP harfi ekranda yerinden oynamaz.
- Duraklat/devam aynı kelimeden sürer.
- WPM oynarken değiştirilebilir.
- Oturum iki şekilde biter: metin bitti VEYA kullanıcı "Bitir" dedi. İkisinde de özet gösterilir: okunan kelime, süre (duraklamalar hariç), ortalama WPM, sayfa karşılığı, ilerleme yüzdesi. Erken bitirmede sadece okunan kadarı sayılır. Ayrıntı: DESIGN.md §4.
- Tek elle mobil kullanım: ekrana dokun = duraklat/devam, kontroller alt yarıda. Ayrıntı: DESIGN.md §5.
- Yumuşak başlangıç ve bağlam şeridi POC'ta YOK (DESIGN.md §6).
- Mobil genişlikte (≥360px) taşma olmadan çalışır; uzun kelime satıra sığar (gerekirse font küçülür).
- Kullanıcı kısa süre içinde boş/kısa metin yüklerse hata vermez.

## Test verisi
`content/` altında hazır: kutuk.txt (~9 sayfa), falaka.txt, yeni-bir-hediye.txt, forsa.txt. Hepsi kamu malı, detay `content/README.md`.
