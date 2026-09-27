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

### POC uygulaması sırasında alınanlar (2026-09-26)
- **Bağımlılıklar:** sadece `react`, `react-dom`, `vite`. `@vitejs/plugin-react` gerekmedi (Vite 8 JSX'i kendisi derliyor; bedeli: kod değişince sayfa tamamen yenilenir). Testler Node'un yerleşik `node:test`'i ile. Arayüz testleri Playwright ile repo dışından koşturuldu, repoya bağımlılık eklenmedi.
- **Font:** web fontu yok; sistem serif yığını (Iowan Old Style / Palatino / Georgia / Noto Serif). Hepsi Türkçe karakterleri destekliyor.
- **Odak noktası:** ORP harfi kelime alanı genişliğinin %35'inde sabit (kelime başa yakın odaklandığı için ortanın solunda). Kelime bu harfe göre konumlanır; ölçüm gerektirmeyen CSS düzeni, testte kayma 0 px. Sığmayan kelimede font küçülür, alt sınır yok (asla kesilmez).
- **Duraklama ağırlıkları** (temel süreye eklenir, üst üste binmez, en güçlüsü geçerli): virgül +0,6 · `; :` +1,0 · cümle sonu +1,6 · paragraf +2,5 · sahne ayracı +4,0. İşlev kelimeleri ×0,8. 8 harfi geçen kelime harf başına +%5 (en fazla +%60). Replik başı +0,5. Hepsi `src/core/config.js`'te.
- **Tokenizer:** kısaltma listesi `config.js`'te ("Bey." dahil değil — cümle sonunda da sık geçtiği için). Tek büyük harf + nokta ("M.") ve küçük harfle devam eden sıra sayısı ("3. sınıf") cümle sonu sayılmaz. Tire ve tek başına tırnak kelime olarak gösterilmez; tırnaklar kelimeye yapışık kalır. Boşluksuz yapışmış kelimeler ("gitti...Sonra", `dedi?"diye`) ayrılır. Wiki başlıkları (`==...==`) atlanır.
- **Diyalog ipucu:** tırnak içi ve tireyle başlayan replik kelimeleri hafif italik + soğuk ton (ayarla kapatılabilir). Tireli replikte, cümle sonundan sonra küçük harfle başlayan kelime ("dedi.") anlatıya döner.
- **İstatistik:** "okunan kelime" = ekranda gerçekten gösterilmiş farklı kelimeler (geri sarıp tekrar okunan bir kez sayılır). İlerleme = ulaşılan en ileri konum. Süre = sadece oynarken geçen süre. Sekme arka plana geçince okuma otomatik duraklar.
- **Geri sar:** mevcut cümlenin başına; cümlenin ilk 2 kelimesindeyken bir önceki cümlenin başına. İlerleme çubuğuna dokununca o noktadaki cümlenin başına atlar.
- **Kendi metnini yapıştır** seçeneği eklendi (düz metin; kaydedilmez, sayfa yenilenince gider). Hız ve ayarlar tarayıcıda (localStorage) saklanır.

### 2026-09-27
- **Duraklatınca bağlam, kaldığın yer, yumuşak başlangıç** eklendi (ayrıntılar DESIGN.md §6). Değerler `src/core/config.js`'te: `SOFT_START = { words: 8, extra: 1.0 }`, `CONTEXT = { maxWords: 40, maxBefore: 20 }`.
- Kayıtlı konum, metnin kelime sayısı değişmişse yok sayılır (metin güncellenirse yanlış yere atlamasın diye).
- **Yayın: GitHub Pages.** `main`'e her push'ta GitHub Actions testleri çalıştırır, derler ve yayınlar (`.github/workflows/deploy.yml`). Vite `base: './'` ile göreli yollar kullanır. Adres: https://asimkaya.github.io/speed-reading/ (repo ayarlarında Pages kaynağı "GitHub Actions" olmalı).

## Açık sorular
- Uzun vade: ürün modeli (ücretsiz/abonelik), mobil için React Native mi PWA mı? (POC sonrası)
- **Hız ayarı nominal mi olsun, ortalama mı?** Şu an "300 kelime/dk" düz bir kelimenin süresini belirler; noktalama duraklamaları eklendiği için ölçülen ortalama hız daha düşük çıkar (Kürk Mantolu Madonna'da ~%15, 300 → ~255). Özette bu açıklanıyor. Alternatif: süreleri metnin ortalamasına göre ölçekleyip ayarlanan hız = gerçek ortalama hız yapmak. POC denemesinden sonra karar verilecek.
- Duraklama ağırlıkları gerçek kullanımda doğal hissettiriyor mu? (Aşama 6 değerlendirmesi)
