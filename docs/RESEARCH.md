# Araştırma: RSVP ve hızlı okuma

## Teknik
RSVP (Rapid Serial Visual Presentation): metin sabit bir noktada tek tek kelimeler olarak gösterilir. Göz hareketi (sakkad) gerekmez. Okumada ilk 1950'lerin sonunda (Gilbert 1959) önerildi, Forster (1970) ile anlama çalışmalarında kullanıldı. Spritz (2014) ve birçok uygulama bunu popülerleştirdi.

## ORP (Optimal Recognition Point)
Kelimenin göz tarafından en hızlı tanındığı harf; kelimenin başına yakındır (genelde 2.–3. harf, uzunluğa göre kayar). Uygulamalar bu harfi renkle vurgular ve kelimeyi bu harf sabit bir noktaya gelecek şekilde hizalar.

Yaygın kaba kural (POC başlangıç değeri, ayarlanabilir):
| Kelime uzunluğu | ORP indeksi (0 tabanlı) |
|---|---|
| 1 | 0 |
| 2–5 | 1 |
| 6–9 | 2 |
| 10–13 | 3 |
| 14+ | 4 |

Uyarı: Spritz üzerine çalışma (Acklin & Papesh benzeri göz izleme sonuçları) ORP'nin uzun süreli kullanımda parafoveal işlemeyi azaltabildiğini, algılanan iş yükünü ve göz kırpmayı artırabildiğini bildiriyor. => ORP vurgusu **açılıp kapatılabilir** olmalı.

## Duraklama (gecikme) mantığı
Temel süre: `60000 / WPM` ms. Üzerine çarpan/ek süre:
| Durum | Öneri (başlangıç, ayarlanabilir) |
|---|---|
| Virgül `,` | ×1.5–2.0 |
| Noktalı virgül / iki nokta `; :` | ×2.0 |
| Nokta / soru / ünlem `. ? !` | ×2.5–3.0 |
| Paragraf sonu | ×3.5–4.0 |
| Uzun kelime (>~8–10 harf) | uzunluk ile artan ek süre |
| Sayı, özel isim, nadir kelime | (sonraki aşama) |

Gelişmiş yaklaşımlar (Thoth, "Dynamic Delay-Based RSVP") kelimeyi dilbilimsel özelliğine göre (içerik/işlev kelimesi, özel isim) farklı çarpanlarla süreler. Bu POC'ta **yok**, ileri aşama fikri.

Ek ayrıntılar: kısa işlev kelimeleri ("ve", "bir") çok hızlı geçebilir; tırnak/parantez ve tire işaretleri kelimeyi sarmalar (noktalama kelimenin sonunda mı bakılmalı: `dedi."` gibi).

## Diyalog yoğun metin (tasarım notu)
Sorun: RSVP'de konuşan kişi değişimi görsel olarak kaybolur (satır başı, tire, tırnak yok). Kısa replikler çok hızlı akar, "dedi" gibi etiketler bağlamı bozar. Öneriler:
- Tire (—) ve tırnak (« », " ") ayrı kelime olarak GÖSTERİLMEZ; sonraki kelimenin önüne yapışır ya da yalnızca replik başlangıcı sinyali olur.
- Replik başlangıcında (yeni satır + tire) kısa bir ekstra duraklama (paragraf sonundan az, cümle sonundan çok değil, ~×1.5–2).
- Konuşma içindeki kelimeler için ince görsel ipucu (örn. hafif farklı renk/italik); isteğe bağlı ayar.
- İsteğe bağlı bağlam şeridi: mevcut cümle soluk gösterilir (regresyon zayıflığını da azaltır).
- Uzun vade: replik yoğunluğu yüksek metinde otomatik hız düşürme önerisi.
POC'ta ilk üçü uygulanır; bağlam şeridi POC değerlendirmesinden sonra karar verilir.

## Bilimsel sınırlar (ürün dürüstlüğü için önemli)
Rayner ve ark. (2016), *"So Much to Read, So Little Time"*: hız ile anlama arasında takas var; "çok yüksek hızda tam anlama" iddiaları temelsiz. RSVP'nin özel sorunu: okuyucu geri dönüp yeniden okuyamaz (regresyon), oysa normal okumada göz hareketlerinin önemli kısmı anlama hatalarını düzeltmek içindir. Rayner'a göre hızlı okumanın gerçek yolu pratik ve kelime dağarcığıdır.

Ürüne etkisi:
- Geri sar / son cümleye dön kontrolü **şart** (RSVP'nin zayıflığını telafi eder).
- İstatistikte "okuma hızı" ile "anlama" ayrı tutulmalı; POC anlamayı ölçmez, bunu açıkça belirt. Anlama testi sonraki aşamada düşünülmeli.
- Pazarlama dili: "kesin X kat hızlı" gibi iddialardan kaçın.
- Tipik yetişkin okuma hızı ~200–300 WPM; makul RSVP başlangıç aralığı 200–600 WPM, varsayılan ~300.

## Sayfa hesabı
"Sayfa" tanımı kullanıcıya bağlı. POC'ta **sabit standart**: 1 sayfa = 250 kelime (ayarlanabilir sabit). Bkz. DECISIONS.md.

## Kaynaklar
- [Rapid serial visual presentation in reading: The case of Spritz](https://www.sciencedirect.com/science/article/abs/pii/S0747563214007663)
- [So Much to Read, So Little Time (Rayner ve ark., 2016)](https://pubmed.ncbi.nlm.nih.gov/26769745/)
- [APS özeti](https://www.psychologicalscience.org/publications/speed_reading.html)
- [Thoth: Improved RSVP using NLP](https://arxiv.org/pdf/1908.01699)
- [Dynamic Delay-Based RSVP Using Linguistic Features](https://link.springer.com/chapter/10.1007/978-3-032-19318-6_27)
- [Stanford Nifty: Speed Reader](http://nifty.stanford.edu/2015/posera-speed-reader/speed_reader.html)
