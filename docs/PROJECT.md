# Proje

## Vizyon
İnsanların özel bir hızlı okuma eğitimi almadan, sadece uygulamayı kullanarak daha hızlı okumasını sağlamak. Metin ekranda tek tek kelimeler olarak, sabit bir noktada akar (RSVP tekniği).

## Hedef platformlar
Uzun vadede web ve mobil. POC'ta sadece tarayıcı (responsive, telefonda da açılabilir).

## POC kapsamı (İÇİNDE)
1. Düz metin girdisi. En az bir adet ~10 sayfalık örnek metin + birkaç kısa örnek metin (seçilebilir).
2. Kelime kelime gösterim (RSVP), ayarlanabilir hız (WPM).
3. Noktalama duraklamaları: virgül < noktalı virgül/iki nokta < nokta/soru/ünlem < paragraf sonu.
4. Uzun kelimeler için ek süre.
5. Başlat / duraklat / devam, geri sar (ör. son cümleye/N kelime geri).
6. Oturum sonu istatistiği: okunan kelime sayısı, karşılık gelen sayfa sayısı, süre, ortalama WPM.
7. ORP vurgusu (kelimede sabit odak harfi) — bkz. RESEARCH.md.

## KAPSAM DIŞI (POC'ta yapılmayacak)
EPUB, PDF, hesap/giriş, backend/veritabanı, senkronizasyon, ödeme, native mobil uygulama, anlama testleri (sonraki aşamada), çoklu dil desteği (bkz. açık sorular).

## Başarı ölçütü (POC)
Kullanıcı örnek bir metni farklı hızlarda akıcı ve rahatsız edici titremeden okuyabiliyor; duraklamalar doğal hissettiriyor; oturum sonunda doğru istatistik görüyor.

## Kullanıcı bilgisi
Proje sahibi Claude Code'da ilk kez çalışıyor. Yeni bir agent/oturum açıldığında bu dosyalar bağlamı taşır.
