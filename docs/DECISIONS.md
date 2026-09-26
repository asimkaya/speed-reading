# Kararlar ve açık sorular

## Alınan kararlar
- 2026-09-26: POC düz metinle çalışır; EPUB/PDF sonra.
- 2026-09-26: Önce altyapı ve dökümanlar, sonra kod.
- 2026-09-26: ORP vurgusu açılıp kapatılabilir olacak (bkz. RESEARCH.md uyarısı).
- 2026-09-26: **Dil: Türkçe.** Arayüz ve metinler Türkçe. (Kod/commit İngilizce.)
- 2026-09-26: **Stack: React + Vite.** Zamanlama/tokenizasyon/ORP/istatistik mantığı framework'süz saf modüller olarak yazılır (ileride React Native/Expo'da yeniden kullanılabilsin).
- 2026-09-26: **Test metinleri:** Ömer Seyfettin hikâyeleri (kamu malı), `content/` altında. Ana test metni artık `content/kurk-mantolu-madonna-berlin.txt` (~2758 kelime, ~11 sayfa, konuşmasız anlatı; Sabahattin Ali, ö. 1948, kamu malı). Ömer Seyfettin metinleri diyalog yoğun olduğundan sadece yan testlerde.
- 2026-09-26: **1 sayfa = 250 kelime** (ayarlanabilir sabit).
- 2026-09-26: **Anlama testi POC'ta yok.** İstatistik sadece hız/miktar ölçer, anlamayı ölçmez.
- 2026-09-26: PR akışı şimdilik yok; kullanıcı istediğinde commit'lenir.

- 2026-09-26: **Diyalog yoğun metinde RSVP** riskli; çözüm tasarımı RESEARCH.md "Diyalog" bölümünde. Demo metni konuşması az bir anlatı seçildi.
- 2026-09-26: Demo metni Berlin bölümü onaylandı.
- 2026-09-26: Bağlam şeridi POC sonrasına ertelendi. Yumuşak başlangıç şimdilik yok (belki yeni sayfa/bölüme geçişte, sonra).
- 2026-09-26: Tasarım/ritim/hız/bitiş özeti/tek elle kullanım kuralları `docs/DESIGN.md`'de toplandı. Oturum kullanıcı tarafından da bitirilebilir, metin de bitebilir; ikisinde de özet gösterilir.

## Açık sorular
- Uzun vade: ürün modeli (ücretsiz/abonelik), mobil için React Native mi PWA mı? (POC sonrası)
- Türkçe tokenizer: kısaltma listesi ("Dr.", "vb.", "vs.", "Bey.") ve tırnak/tire (—) davranışı POC sırasında netleşecek.
