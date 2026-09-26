# Hızlı Okuma (speed-reading)

Kullanıcıların eğitim almadan hızlı okumasını sağlayan RSVP tabanlı uygulama. Hedef: web + mobil. **Şu an aşama: POC** (düz metin, tek ekran, vanilla JS/HTML/CSS veya React).

Repo: https://github.com/asimkaya/speed-reading.git (branch: `main`)

## Önce oku
- [docs/PROJECT.md](docs/PROJECT.md) — vizyon, kapsam, kapsam dışı olanlar
- [docs/RESEARCH.md](docs/RESEARCH.md) — RSVP araştırması, ORP, duraklama kuralları, bilimsel sınırlar
- [docs/SPEC-POC.md](docs/SPEC-POC.md) — POC'un davranış spesifikasyonu (kabul kriterleri)
- [docs/DESIGN.md](docs/DESIGN.md) — görsel tasarım, doğal ritim, hız, bitiş özeti, tek elle kullanım (UI yaparken bağlayıcı)
- [docs/DECISIONS.md](docs/DECISIONS.md) — alınan kararlar ve açık sorular
- [docs/ROADMAP.md](docs/ROADMAP.md) — aşamalar ve sıradaki iş

## Çalışma kuralları
- Kullanıcı Türkçe konuşur; yanıtlar Türkçe. Uygulama arayüzü ve içeriği Türkçe. Kod, değişken adları, commit mesajları İngilizce.
- Stack: React + Vite (POC). Çekirdek mantık (tokenizer/timing/orp/stats) framework'süz saf JS modülleri.
- Test metinleri `content/` altında (Ömer Seyfettin, kamu malı). Ana metin: `content/kutuk.txt`.
- Kullanıcı Claude Code'da yeni; Claude Code ile ilgili bilmesi gereken şeyleri kısaca açıkla.
- Kapsam dışına çıkma (EPUB, PDF, hesap sistemi, backend vb. POC'ta YOK). Bkz. PROJECT.md.
- Zamanlama/tokenizasyon mantığı UI'dan ayrı, saf fonksiyonlar olarak yazılır ve test edilir. Bunlar ürünün çekirdeğidir.
- Karar alındığında veya açık soru çözüldüğünde `docs/DECISIONS.md` güncellenir. Aşama bittiğinde `docs/ROADMAP.md` işaretlenir.
- Commit/push yalnızca kullanıcı isteyince.
- Yeni bağımlılık eklemeden önce sor; POC'ta minimum bağımlılık.

## Komutlar
- `npm install` — bağımlılıkları kur (ilk seferde)
- `npm run dev` — geliştirme sunucusu, http://localhost:5173 (telefondan denemek için: `npm run dev -- --host`, sonra bilgisayarın yerel IP'si:5173)
- `npm test` — çekirdek modül testleri (Node'un yerleşik `node:test`'i, ek bağımlılık yok)
- `npm run build` / `npm run preview` — üretim derlemesi ve önizleme

## Kod yapısı
- `src/core/` — framework'süz çekirdek: `tokenizer.js`, `orp.js`, `timing.js`, `stats.js`, `player.js` (saati dışarıdan verilebilen durum makinesi), `config.js` (tüm sabitler: WPM aralığı, duraklama ağırlıkları, kısaltmalar, işlev kelimeleri)
- `src/` — React arayüzü: `App.jsx`, `components/` (WordDisplay, Controls, Summary, Menu), `usePlayer.js` (player ↔ React köprüsü)
- `tests/` — çekirdek birim testleri + `content/` metinleri üzerinde entegrasyon testi
