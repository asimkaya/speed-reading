# Tasarım ve deneyim yönergesi (POC)

Bu dosya UI/UX için bağlayıcıdır. Amaç: **göz yormayan, sakin, akıcı** bir okuma deneyimi. Davranış kabul kriterleri için SPEC-POC.md'ye bak.

## 1. Göz yormayan görsel tasarım
- **Tema:** Koyu, sade zemin (saf siyah değil; çok koyu gri/lacivert tonu). Metin kırık beyaz (saf beyaz değil). Kontrast yüksek ama parlamayan. Açık tema seçeneği sonra; POC'ta koyu tema varsayılan.
- **Font:** Sakin bir serif (okuma hissi). Büyük ve okunaklı. Kelime alanı için tek font, sabit ağırlık. Türkçe karakterleri (ğ, ş, ı, İ, â, î, û) eksiksiz destekleyen font seç.
- **ORP harfi:** Yumuşak kırmızı/turuncu (neon/çok doygun değil). Vurgu ORP ayarıyla açılıp kapatılabilir (bkz. RESEARCH.md).
- **Sabit odak noktası:** Kelime değişirken ORP harfi ekranda **hiç oynamaz**. Kelime bu harf etrafında hizalanır. Zıplama, kayma, yeniden akış (layout shift) olmamalı. Kelime alanı sabit boyutlu olmalı (uzun kelime ekranı büyütüp küçültmez).
- **Odak rehberi:** ORP'nin üstünde/altında çok ince, düşük opaklıkta işaretler olabilir (isteğe bağlı, gözü sabitlemeye yarar).
- **Animasyon yok:** Kelime geçişlerinde fade/slide yok. Anlık değişim (titreme algısı için gerekirse çok kısa, ama varsayılan kapalı).
- **Sadelik:** Okurken ekranda sadece kelime + ince ilerleme çubuğu görünür. Diğer kontroller oynarken sönük ya da gizli, duraklayınca belirir.
- **Boşluk:** Kelimenin etrafında bol boş alan. Kenarlara yakın metin yok.
- **Dikkat çekmeyen ilerleme:** Sayaç/rakamlar oynarken çok soluk (düşük kontrast) olur.
- Uzun kelime taşarsa font küçülür, kelime asla kesilmez veya alta sarmaz.

## 2. Doğal ritim
Amaç makine gibi değil, insan sesli okuması gibi bir tempo. Kurallar (sayılar başlangıç, ayarlanabilir; ayrıntı RESEARCH.md):
- Temel süre: `60000 / WPM` ms.
- Virgül < noktalı virgül/iki nokta < nokta/soru/ünlem < paragraf sonu (artan duraklama).
- Uzun kelimeler uzunluğa göre ek süre alır.
- Kısa işlev kelimeleri ("ve", "bir", "da", "ki", "bu") temel süreden biraz **daha hızlı** geçer; ritmi bozmadan akışı yumuşatır.
- Üç nokta (...) ve "?!" gibi birleşik işaretler tek noktalama olarak değerlendirilir, üst üste katlanmaz.
- Tire (—) ve tırnak (« », " ") ayrı kelime olarak gösterilmez. Replik başlangıcında kısa ekstra duraklama (ayrıntı: RESEARCH.md "Diyalog").
- Kısaltmalar ("Dr.", "vb.", "vs.") cümle sonu sayılmaz.
- Sahne/bölüm ayracı (`* * *`) uzun bir duraklama olur, kelime gibi gösterilmez.
- Hız değişimi anında uygulanır, bir sonraki kelimeden itibaren.

## 3. Hız kontrolü
- Varsayılan ~300 WPM. Aralık 100–900 WPM (ihtiyaçta ayarlanır).
- **Oynarken değiştirilebilir**, kelime akışı kesilmeden.
- Ekranda hız kaydırıcısı (slider) ve +/− adım düğmeleri. Mobilde başparmakla erişilebilir.

## 4. Oturum sonu ve bitiş özeti
Oturum iki şekilde biter, ikisi de özet gösterir:
1. **Metin bitti** (son kelime gösterildi).
2. **Kullanıcı kendisi bitirdi** (Bitir düğmesi), metnin ortasında olabilir.

Özet kartı (sade, tek ekran):
- Okunan kelime sayısı (sadece gerçekten gösterilenler)
- Sayfa karşılığı (kelime / 250)
- Süre (duraklamalar hariç aktif okuma süresi)
- Ortalama WPM
- Metin bitti mi / yarıda mı bırakıldı (ilerleme yüzdesi)
- Aksiyonlar: "Baştan oku", "Kaldığın yerden devam", "Başka metin seç"

Not: Anlama ölçülmez; özette anlamaya dair hiçbir iddia yok. "Kesin X kat hızlı" tarzı ifade kullanma.

## 5. Tek elle (mobil) kullanım
- Tüm ana kontroller ekranın **alt yarısında**, başparmak erişiminde.
- **Ekrana dokun = duraklat/devam** (kelime alanına ve çevresine geniş dokunma alanı).
- Büyük dokunma hedefleri (en az 44×44 px). Kontroller arasında yeterli boşluk.
- Geri sar: tek dokunuşla son cümlenin başına dön (ayrı belirgin düğme).
- Hız: alt kısımda başparmakla kullanılan slider ve +/− düğmeleri.
- Yatay taşma yok; ≥360px genişlikte çalışır. Güvenli alanlara (çentik, alt çubuk) saygı.
- Masaüstünde klavye: Boşluk = duraklat/devam, ← = geri sar, ↑/↓ = hız, Esc = bitir.

## 6. Ertelenenler (POC'ta YOK)
- **Yumuşak başlangıç** (hız yükselmesi, "3-2-1"): şimdilik yok. Fikir: yeni sayfaya/bölüme geçişte uygulanabilir. Kenara konuldu.
- **Bağlam şeridi** (mevcut cümleyi soluk gösterme): POC sonrası.
- Açık tema, font seçimi, otomatik hız önerisi.
