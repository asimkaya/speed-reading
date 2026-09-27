# RSVP (one-word-at-a-time) speed reading apps: competitor analysis (as of Sept 2026)

> **How these notes were made (read this first):** The research proxy blocked direct page fetches from apps.apple.com, play.google.com, chromewebstore.google.com, speedreadinglounge.com, outreadapp.com and speedread.life. So every number below comes from **search-engine result snippets/summaries** of those pages, or from secondary aggregators (AppBrain, AppGrooves, chrome-stats, review blogs). Treat ratings, download counts and prices as **"reported, needs a check against the live store page"**. Where sources disagree, the notes say so. Many "2026 best apps" listicles come from competitors (Outread, easyreads, Éist, Chapterly, SpeedRead/speedread.life, Acceleread) and are marketing content.

## Q1: Which products matter, what do they do, and which features are table stakes vs. differentiators?

### Takeaway
Table stakes: RSVP with an ORP/focal-letter highlight, adjustable WPM (roughly 100 to 1000+), pause/rewind, paste text plus at least one import path (EPUB, PDF or URL), and dark themes. Differentiators in 2025-2026: **AI features** (quizzes, summaries, chapter extraction, chat), **TTS/audio narration combined with RSVP**, **working inside other readers** (Kindle Cloud Reader/Libby via extension, share sheet, Instapaper/Pocket), **training programs with comprehension checks** (Acceleread, Spreeder), and **streaks/goals/stats**. Very few products do punctuation-aware pausing, context-on-pause or a soft start well enough to advertise it (Reedy's "smart slowing" and "gradual acceleration" are the clearest exceptions).

### Cited Findings

#### Spritz (Spritz Technology, Inc.): origin, SDK/licensing, current state
- Founded 2012, Salt Lake City. Raised a $3.5M seed round in March 2014 — [TechCrunch 2014](https://techcrunch.com/2014/03/10/spritz-seed/); total funding reported as $4.38M; currently described as a "provider of app-based reading proficiency solutions for students" — [CB Insights](https://www.cbinsights.com/company/spritz-technology).
- 2014 model: no own apps; the plan was to license the tech to websites, device makers and app makers. The web SDK launched April 1, 2014, with iOS/Android SDKs to follow; 25,000 developers reportedly signed up — [TechCrunch, Apr 2014](https://techcrunch.com/2014/04/01/spritz-launches-sdk-to-bring-its-speed-reading-technology-to-websites-and-apps/), [Gazelle 2014](https://www.gazelle.com/thehorn/2014/04/02/speed-reading-app-spritz-promises-to-revolutionize-reading/). Launch partner: Samsung Galaxy S5 / Gear 2 (2014) — [Engadget 2014](https://www.engadget.com/2014/03/11/spritz-speed-reading-hands-on/).
- **Patent enforcement:** in Feb 2015, Spritz forced the takedown of the "Spree" bookmarklet on patent grounds. HN commenters called the patent "very obtusely written" — [Hacker News, Feb 2015](https://news.ycombinator.com/item?id=9046034).
- **US patent 8,903,174**, "Method and system for displaying text using RSVP". Its core claims cover computing an optimal recognition point in each word and placing that letter on a fixed column left of center (plus other elements). An open-source project (cedagova/fastReader) treated it as a "launch blocker". Filed around 2013, so it likely expires around 2033 (the source estimates this and does not confirm it) — [GitHub issue #33, fastReader](https://github.com/cedagova/fastReader/issues/33); patents assigned to Spritz — [Justia](https://patents.justia.com/assignee/spritz-technology-inc).
- **Spritz's own consumer app today:** "Spritz App" (iOS, also Mac and Vision Pro; iOS 12.4+). Free download, 2-week free trial, then **$2.99/month or $29.99/year**. Too few ratings to show a score on some storefronts — [App Store US](https://apps.apple.com/us/app/spritz-app/id1486315785), [App Store NZ](https://apps.apple.com/nz/app/spritz-app/id1486315785). Android listing: `com.spritz.newapp` — [Google Play](https://play.google.com/store/apps/details?id=com.spritz.newapp&hl=en_US). An older "SpeedRead With Spritz" Android app also exists (v2.21) — [soft112](https://speedread-with-spritz.soft112.com/).
- A 2026 comparison says Spritz "ships its reader inside partner apps through an SDK, not as a simple website where you paste your own text" — [speedread.life (competitor blog)](https://speedread.life/blog/spritz-spreeder-rsvp-readers-compared). I found no 2024-2026 news of a shutdown, lawsuit or acquisition.
- "Spritz Reader" (spritzreader.com plus a Chrome extension): RSVP on any web page, 3 free reads/day, 100-1000+ WPM, text extraction with Mozilla Readability. "Spritz Pro" adds unlimited reads, cloud storage and history. Pro price was not found — [Chrome Web Store](https://chromewebstore.google.com/detail/spritz-reader-speed-read/klbegddlnhkibegigmgibjhcncbbcjaj), [spritzreader.com](https://www.spritzreader.com/), [pricing page](https://www.spritzreader.com/pricing). **Unverified whether Spritz Technology, Inc. runs this.**

#### Outread (iOS / iPadOS / macOS)
- Developer: Arkadiusz Holko. Techniques: RSVP "Flash Mode" plus a "Guided Highlight Mode" (moving highlight), with adjustable chunk length — [MWM app page](https://mwm.ai/apps/outread-speed-reading/778846279), [Outread blog (self-published)](https://outreadapp.com/blog/best-speed-reading-apps). (mwm.ai looks like an app-listing aggregator. Whether MWM acquired Outread is **not confirmed**.)
- Pricing: **$4.99/month or $29.99/year**. The free base tier gates document import, Pocket sync, speeds above a cap, AI tools, unlimited bookmarks, TTS and themes. After complaints from lower-income regions, the developer added **purchasing-power-parity pricing for annual plans** — [Speed Reading Lounge review](https://www.speedreadinglounge.com/outread-app-review) (via search snippet).
- Outread+ includes: a built-in classics catalog, Instapaper sync, DRM-free EPUB, PDF, Word, RTF and TXT import, and up to 1,500 WPM — [Superhuman blog](https://blog.superhuman.com/apps-that-help-you-read-faster/).
- AI features: AI Summary, AI Key Points, AI Quiz (comprehension quizzes). v2.5 (Sept 2025) added Apple Intelligence and the Liquid Glass UI. v2.6 was current at the time of the source — [MWM app page](https://mwm.ai/apps/outread-speed-reading/778846279), [radcity 2026](https://radcity.net/best-speed-reading-apps-2026/).
- Rating: **4.6/5, "100k+ downloads"** per [MWM page](https://mwm.ai/apps/outread-speed-reading/778846279); **4.7/5 from 1.2K ratings** per [App Store listing snippet](https://apps.apple.com/us/app/outread-speed-reading/id778846279). The sources conflict slightly.
- Platforms: no Android, Windows or web client (older listicles claim Android/web, which appears outdated) — [search summary of Outread reviews](https://justuseapp.com/en/app/778846279/outread-speed-reading/reviews), [brighterly 2026](https://brighterly.com/blog/speed-reading-apps/).
- Praise: customization, Pocket/Instapaper integration, helpful for dyslexia/ADHD — [justuseapp reviews](https://justuseapp.com/en/app/778846279/outread-speed-reading/reviews). Criticism: "a subscription layer locks nearly every feature worth having" — [Speed Reading Lounge](https://www.speedreadinglounge.com/outread-app-review).

#### SwiftRead (formerly Spreed): Chrome extension + web + iOS + Android
- Formerly "Spreed". RSVP plus paced highlighting and "guided word display" modes, and natural TTS voices in **90+ languages** — [Chrome Web Store](https://chromewebstore.google.com/detail/swiftread-read-faster-lea/ipikiaejjblmdopojhpejjmbedhlibno), [Softpedia](https://www.softpedia.com/get/Internet/Internet-Applications-Addons/Chrome-Extensions/Spreed.shtml).
- Works on web pages, PDFs, EPUBs, Kindle Cloud Reader and Libby — [Chapterly 2026 (competitor)](https://chapterly.ai/blog/best-speed-reading-apps). Native apps: [iOS id6470811151](https://apps.apple.com/us/app/swiftread-speed-reading/id6470811151), [Android com.swiftread.universal](https://play.google.com/store/apps/details?id=com.swiftread.universal&hl=en_US).
- Users/rating: **"200K active users, 4.5 stars"** per search summary; another summary says 4.6 — [Chrome Web Store](https://chromewebstore.google.com/detail/swiftread-read-faster-lea/ipikiaejjblmdopojhpejjmbedhlibno), [chrome-stats](https://chrome-stats.com/d/ipikiaejjblmdopojhpejjmbedhlibno).
- **Pricing (sources conflict):** Free with usage quotas. PRO comes as monthly, annual or **lifetime** — [SwiftRead KB](https://swiftread.helpscoutdocs.com/article/33-how-do-i-cancel-my-pro-subscription). Reported prices: "~$4.99/month" ([Chapterly](https://chapterly.ai/blog/best-speed-reading-apps)), "$4/month" and "$15/month monthly plan" ([Superhuman](https://blog.superhuman.com/apps-that-help-you-read-faster/), [radcity](https://radcity.net/best-speed-reading-apps-2026/)), "from $10/month on annual plan", and one Play review mentions "$20/month". No free trial, but there is a money-back guarantee — [SwiftRead KB](https://swiftread.helpscoutdocs.com/article/36-do-you-offer-a-free-trial-for-pro). **Current exact prices unverified.**
- Reviews: praised for speed gains, TTS/read-aloud, and usefulness for students and accessibility. Complaints: paywalls, free quotas, frequent feature gating, cost — [chrome-stats reviews summary](https://chrome-stats.com/d/ipikiaejjblmdopojhpejjmbedhlibno/reviews).
- A separate legacy "Spreed - Speed Reader" listing still exists: highlight text, then Alt+V or right-click, with a red ORP letter. Reported 4.3 stars — [Chrome Web Store](https://chromewebstore.google.com/detail/spreed-speed-reader/dajafpbgegmeplpfcigmpofamomphkem), [allthings.how](https://allthings.how/how-to-use-spreed-chrome-extension-to-read-the-web-faster/).

#### Reedy. Intelligent reader (Android + Chrome extension; iOS reported)
- By Artem Krivolapov / AZA Group. Three modes: normal reading, RSVP, TTS. Up to **3,000 WPM**, with "gradual acceleration", "smart slowing", entity analysis and hyphenation — [Speed Reading Lounge review](https://www.speedreadinglounge.com/reedy-app-android), [alternativeto](https://alternativeto.net/software/reedy/about/), [reedy-reader.com](https://reedy-reader.com/).
- Formats: EPUB, FB2, TXT, HTML (including zipped). **No PDF** — [Speed Reading Lounge](https://www.speedreadinglounge.com/reedy-app-android).
- Downloads: about **390 thousand** — [AppBrain](https://www.appbrain.com/app/reedy-intelligent-reader/azagroup.reedy). Premium is a **one-time purchase** ("one-time pricing is fair"). Exact price not found — [Softpedia](https://mobile.softpedia.com/apk/reedy/). An iOS version at $4.99 is reported by one search summary (unverified).
- Listed languages: English, Chinese, Spanish, German, Portuguese, Dutch, French, Serbian, Ukrainian, Russian. **Turkish is not listed** (probably UI localization, not text handling) — [search summary of Amazon/reedy-reader.com](https://www.amazon.com/AzaGroup-Reedy-Intelligent-reader/dp/B017866WL4).

#### ReadMe! → ReadOwl (Spritz + BeeLine ebook reader)
- ReadMe! (iOS/Android): EPUB/PDF ebook reader with **Spritz RSVP** and **BeeLine Reader** color gradients. Free, with paid sync — [The eBook Reader, Sept 2015](https://blog.the-ebook-reader.com/2015/09/23/readme-ebook-app-offers-unique-speed-reading-features-videos/), [App Store](https://apps.apple.com/us/app/readme-spritz-beeline/id877697552), [readmei.com](https://www.readmei.com/).
- Successor **ReadOwl (Spritz)**: offline Spritz reading, EPUB2/3, no account, no tracking, **one-time purchase instead of a subscription**. **Removed from the App Store on Oct 16, 2025** — [AppBrain](https://www.appbrain.com/appstore/readowl-spritz/ios-6473507149), [FoxData](https://foxdata.com/en/app-marketing-analytics/6473507149/as/US/).

#### Readsy (web)
- Free web app powered by Spritz: paste a URL, text or PDF, pick a speed. No account needed — [addictivetips](https://www.addictivetips.com/web/quickly-master-speed-reading-with-the-readsy-web-app/), [TTAC Online](https://ttaconline.org/Resource/JWHaEa5BS77ySz2QLOVT0w/Resource-readsy). Current maintenance status is **not known** (the sources are old).

#### QuickReader (iOS, Inkstone Software)
- iOS ebook/EPUB reader. Lite (free) and paid (**$4.99**) editions, plus a Youth edition and Spanish, German and French editions. Instapaper integration, DRM-free EPUB via file sharing, copy/paste import. About **1,385 reviews** per AppGrooves — [AppGrooves](https://appgrooves.com/ios/333441801/quickreader-speed-reading/inkstone-software-inc), [App Store](https://apps.apple.com/us/app/quickreader-speed-reading/id333441801), [Speed Reading Lounge review](https://www.speedreadinglounge.com/quickreader-review).

#### Acceleread (iOS + Android): training-first, with RSVP drills
- Training: RSVP for pacing, Schulte tables, eye drills, anti-subvocalization. **Each drill is paired with comprehension checks.** Includes a free reading-speed assessment — [accelereadapp.com](https://accelereadapp.com/), [Speed Reading Lounge](https://www.speedreadinglounge.com/acceleread-review).
- Price: **$4.99/month or $19.99/year, 7-day free trial** — [Speed Reading Lounge](https://www.speedreadinglounge.com/acceleread-review). iOS id6717574202 (released around late 2024) — [App Store](https://apps.apple.com/us/app/speed-reading-acceleread/id6717574202).

#### Spreeder (eReflect): web/desktop/mobile
- RSVP with "4 modes and 14 tunable settings", now with AI features (per the review title). Pricing: **lifetime ~$67** (with frequent discounts off a higher list price), or **VIP ~$7.99/month**. In 2026 eReflect folded "7 Speed Reading" into Spreeder (7speedreading.com now redirects) — [Speed Reading Lounge 2026](https://www.speedreadinglounge.com/spreeder-pro), [spreeder.com](https://www.spreeder.com/), [StackSocial lifetime deal](https://www.stacksocial.com/sales/spreeder-vip-lifetime-subscription), [G2](https://www.g2.com/products/ereflect-spreeder/reviews).

#### Newer AI + audio hybrids (2025-2026)
- **Éist** (iOS + Android): RSVP (free to try, unlimited in Éist Pro) plus audio/read-along with **free, unlimited on-device AI voices**, no account, 100% offline after import — [Éist blog (self-published)](https://eist.app/blog/best-rsvp-speed-reading-apps-2026).
- **easyreads** (easyreads.ai): RSVP plus AI audio narration plus AI chat. Free tier and premium; prices not found — [easyreads blog (self-published)](https://easyreads.ai/blog/spritz-speed-reading-alternative).

#### Wave of indie "RSVP Reader / Speed Reader" apps (2026)
- **"RSVP Reader: Speed Reading" / "Speed Reader: RSVP Reader"** (iOS id6757968737): ORP highlighting, "2-3x faster" — [App Store](https://apps.apple.com/us/app/rsvp-reader-speed-reading-app/id6757968737).
- **"RSVP Speed Reader"** (Android `com.rsvpokuyucu.app`, a Turkish-looking package name, "okuyucu" = reader): 200 to 1,000+ WPM, **AI Chapter Extractor (Gemini)**, EPUB/PDF/DOCX/TXT, OLED themes, daily goals, streaks, stats, share sheet from Safari/Chrome — [Google Play](https://play.google.com/store/apps/details?id=com.rsvpokuyucu.app). Search results linked it to the iOS app above; **whether they share a developer is unverified**.
- **"RSVP Reader: Speed Reading"** (Android `com.visor.rsvpreader`): 50-1200 WPM. The free app "stays complete and free", and Premium is a **separate one-off purchase** — [Google Play](https://play.google.com/store/apps/details?id=com.visor.rsvpreader&hl=en_IN).
- **Quick Read - RSVP** (iOS): **$2.99** paid app, up to 900 WPM — [App Store](https://apps.apple.com/app/quick-read-rsvp/id6757983117). **Speed Reader** (iPad): **$3.99** — [App Store](https://apps.apple.com/cd/app/speed-reader/id6758203305).
- **Speed Reading, RSVP Trainer** (iOS): subscription required, **$7.99/week or $49.99/year** — [App Store](https://apps.apple.com/us/app/speed-reading-rsvp-trainer/id6760226491).
- Others found (no metrics): Redd, SpeedMind, BlipRead, ConquerRSVP, RSVP Bible, "Speed Reader: Articles & PDF" (iOS); Anchor, Fovea (RSVP Spritz E-Reader), Speedy Reader with RSVP, Speed Reader (word, 2-4-word chunk or sentence modes), Speed Read - RSVP (ReadFast), Rapid Reader (Android) — [Redd](https://apps.apple.com/us/app/-/id6757965939), [SpeedMind](https://apps.apple.com/app/id6757820208), [BlipRead](https://apps.apple.com/ci/app/blipread-speed-reader/id6758697650), [ConquerRSVP](https://apps.apple.com/app/conquerrsvp/id6499281369), [RSVP Bible](https://apps.apple.com/app/id6761111150), [Speed Reader: Articles & PDF](https://apps.apple.com/dk/app/speed-reader-articles-pdf/id6758970459), [Anchor](https://play.google.com/store/apps/details?id=app.anchor.client&hl=en_US), [Fovea](https://play.google.com/store/apps/details?id=com.revolvotech.fovea&hl=en), [Speedy Reader](https://play.google.com/store/apps/details?id=com.dtservice.turbo_reader&hl=en_US), [Speed Reader](https://play.google.com/store/apps/details?id=com.ngoctd.speed_reader), [ReadFast](https://play.google.com/store/apps/details?id=com.oh.readfast&hl=en_US), [Rapid Reader](https://play.google.com/store/apps/details?id=com.rapidreader.rapid_reader&hl=en-US).
- Chrome extensions: Sprint Reader, Read fast, Read for Speed, several "RSVP Speed Reader"/"RSVP Reader" extensions, and a 2026 "Show HN: Speed Reader – Chrome extension for RSVP speed reading" — [Sprint Reader](https://chromewebstore.google.com/detail/sprint-reader-speed-readi/kejhpkmainjkpiablnfdppneidnkhdif), [Read for Speed](https://chromewebstore.google.com/detail/read-for-speed-rsvp-reade/iajjennlcnindjipmaocoacahkbcmlac), [Show HN](https://news.ycombinator.com/item?id=47044977).

#### Open-source / free tools
- **OpenSpritz**: JavaScript bookmarklet, with many GitHub forks — [gleitz/OpenSpritz](https://github.com/gleitz/OpenSpritz), [Gun.io 2014](https://gun.io/news/2014/08/openspritz-a-free-speed-reading-bookmarklet/). **Squirt.io** (Readability plus Spritz-style, 2014) — [HN](https://news.ycombinator.com/item?id=7385634). **pasky/speedread**: terminal RSVP aligned on ORP — [GitHub](https://github.com/pasky/speedread). Others: [thomaskolmans/rsvp-reading](https://github.com/thomaskolmans/rsvp-reading), [snowfluke RSVP Speed Reader (GitHub Pages)](https://snowfluke.github.io/rsvp-speed-reader/), [AccelaReader (free web RSVP)](https://accelareader.com/), and the Turkish [CagriC05/hizli-okuma](https://github.com/CagriC05/hizli-okuma) (EPUB via RSVP).

#### "Speed Reading HQ" and "Reading Trainer"
- I found no RSVP product named "Speed Reading HQ"; the searches returned only generic apps. "Reading Trainer" (Heku IT) appears on Google Play localized as "Hızlı Okuma" (`com.heku.readingtrainer`). It is an exercise trainer, and I could not confirm an RSVP mode — [Google Play](https://play.google.com/store/apps/details?id=com.heku.readingtrainer&hl=en_US).

### Inferences
- Common baseline across everything: RSVP, ORP/red letter, WPM slider, dark mode, paste text. **A Turkish app cannot differentiate on RSVP alone.** Its edge has to come from linguistic quality (Turkish tokenization and pauses), the ergonomics of "natural rhythm" (pauses, soft start, context on pause) and a Turkish content/UX layer.
- Most apps treat timing crudely (fixed ms per word, maybe a punctuation bump). Only Reedy advertises "smart slowing" and "gradual acceleration". Nobody markets **context-on-pause** as a headline feature, so it is a plausible differentiator.
- iOS App Store IDs around 6757-6761 (Redd, RSVP Reader, SpeedMind, Quick Read, Speed Reader, RSVP Trainer, RSVP Bible) suggest a **cluster of new indie RSVP apps launched in early 2026**. That points to low entry barriers and a crowded long tail with no dominant new entrant. (Inference from ID ranges, not a confirmed release date.)
- **IP risk:** Spritz holds a US patent (8,903,174) on the ORP + fixed-column layout and has enforced it before (Spree, 2015). Many apps now use ORP openly and I found no recent enforcement, but this should go to legal review before any US launch.

### Gaps
- Live store data (exact ratings, review counts, "last updated" dates, IAP price lists) could not be fetched because store domains were blocked. All store numbers need a manual check.
- No confirmed current price for SwiftRead PRO (the sources give $4-$20/month), Spritz Reader Pro, Reedy premium, easyreads or Éist.
- Could not confirm whether Readsy is still online, or whether the Spritz SDK is still actively licensed in 2026.
- Could not confirm whether QuickReader's current version is RSVP or a line/block-highlight pacer. (My recollection is that it is mainly a highlighted-block pacer. Unverified.)
- No Product Hunt-specific launch data found.

## Q2: What do they charge, and which monetization model seems to work?

### Takeaway
The main model is **freemium plus a subscription at about $4.99/month or $20-30/year** (Outread, Acceleread, Spritz App), with a few outliers: SwiftRead (higher, quota-based, and also sells lifetime), Spreeder (lifetime ~$67 / VIP ~$7.99 a month) and aggressive weekly plans ($7.99/week). A second camp sells **one-time purchases** (Reedy premium, the visor "RSVP Reader" Premium, Quick Read $2.99, Speed Reader iPad $3.99, QuickReader $4.99, and ReadOwl before it died), and reviewers see these as fairer. The best-known successes by traction (SwiftRead ~200K users, Outread 100K+ downloads, Reedy ~390K downloads) all use freemium with a hard gate on imports and speed.

### Cited Findings
- Outread: **$4.99/mo, $29.99/yr**, with **PPP-adjusted annual pricing** after regional complaints — [Speed Reading Lounge](https://www.speedreadinglounge.com/outread-app-review), [Superhuman](https://blog.superhuman.com/apps-that-help-you-read-faster/).
- Acceleread: **$4.99/mo, $19.99/yr, 7-day trial** — [Speed Reading Lounge](https://www.speedreadinglounge.com/acceleread-review).
- Spritz App: **$2.99/mo, $29.99/yr, 2-week trial** — [App Store](https://apps.apple.com/us/app/spritz-app/id1486315785).
- SwiftRead: free quota, then PRO monthly, annual or **lifetime**. Reported $4.99/mo ([Chapterly](https://chapterly.ai/blog/best-speed-reading-apps)), $4/mo and $15/mo ([Superhuman](https://blog.superhuman.com/apps-that-help-you-read-faster/), [radcity](https://radcity.net/best-speed-reading-apps-2026/)), and $10/mo annual or $20/mo in reviews (search summary of the [Chrome Web Store](https://chromewebstore.google.com/detail/swiftread-read-faster-lea/ipikiaejjblmdopojhpejjmbedhlibno) / [Play](https://play.google.com/store/apps/details?id=com.swiftread.universal&hl=en_US)). No trial, money-back guarantee — [SwiftRead KB](https://swiftread.helpscoutdocs.com/article/36-do-you-offer-a-free-trial-for-pro).
- Spreeder: lifetime **~$67**, VIP **~$7.99/mo** — [Speed Reading Lounge](https://www.speedreadinglounge.com/spreeder-pro), [StackSocial](https://www.stacksocial.com/sales/spreeder-vip-lifetime-subscription).
- Spritz Reader extension: **3 free reads/day**, then Pro (price unknown) — [Chrome Web Store](https://chromewebstore.google.com/detail/spritz-reader-speed-read/klbegddlnhkibegigmgibjhcncbbcjaj).
- Éist: RSVP free to try, unlimited RSVP in Pro — [Éist](https://eist.app/blog/best-rsvp-speed-reading-apps-2026).
- One-time: Reedy premium ("one-time pricing is fair") — [Softpedia](https://mobile.softpedia.com/apk/reedy/); visor RSVP Reader Premium one-off — [Play](https://play.google.com/store/apps/details?id=com.visor.rsvpreader&hl=en_IN); Quick Read - RSVP **$2.99** — [App Store](https://apps.apple.com/app/quick-read-rsvp/id6757983117); Speed Reader iPad **$3.99** — [App Store](https://apps.apple.com/cd/app/speed-reader/id6758203305); QuickReader **$4.99** — [AppGrooves](https://appgrooves.com/ios/333441801/quickreader-speed-reading/inkstone-software-inc); ReadOwl one-time (removed Oct 2025) — [AppBrain](https://www.appbrain.com/appstore/readowl-spritz/ios-6473507149).
- Aggressive: "Speed Reading, RSVP Trainer": **$7.99/week, $49.99/year**, subscription required to use at all — [App Store](https://apps.apple.com/us/app/speed-reading-rsvp-trainer/id6760226491).
- Ad-supported free apps with a paid ad-removal tier exist in the long tail — [search summary of RSVP app reviews](https://play.google.com/store/apps/details?id=com.dtservice.turbo_reader).
- Turkish Speed Readingo: long free period, then premium added while keeping previously free features free. Premium adds AI-supported lessons. Price not found — [developer Substack](https://wabyilmaz.substack.com/p/speed-readingo-hzl-okuma-uygulamam), [App Store TR](https://apps.apple.com/tr/app/speed-readingo-3x-h%C4%B1zl%C4%B1-oku/id6737622922?l=tr).

### Inferences
- What gets gated: **file import (EPUB/PDF), speed above a cap, AI and TTS, and sync.** Gating basic RSVP on pasted text draws complaints. The typical free core is paste text plus limited WPM.
- For a Turkish market, a price band around $30/year looks too high relative to local purchasing power. Outread's move to PPP pricing supports this. One-time purchase or low TRY regional pricing is likely easier to sell. (No Turkish pricing data was found for these apps.)

### Gaps
- No revenue data (e.g., Sensor Tower/Appfigures) for any product. Store regional pricing in TRY/EUR was not retrievable.

## Q3: What are the recurring user complaints (and praise)?

### Takeaway
Recurring complaints: **paywalls/subscriptions and free quotas** (SwiftRead, Outread), **limited file import** (Reedy has no PDF; users ask for copy/paste and PDF/ebook import in the Spritz App), **ads** in free long-tail apps, and a **comprehension/retention** problem backed by research. Praise centers on customization, TTS, integrations (Pocket/Instapaper/Kindle Cloud Reader) and help for dyslexia/ADHD.

### Cited Findings
- SwiftRead: "recurring complaints cite paywalls and free quotas that gate functionality, cost concerns, and frequent feature gating". Praised for speed, TTS and accessibility — [chrome-stats reviews](https://chrome-stats.com/d/ipikiaejjblmdopojhpejjmbedhlibno/reviews).
- Outread: "a subscription layer locks nearly every feature worth having". PPP pricing followed complaints from lower-income regions — [Speed Reading Lounge](https://www.speedreadinglounge.com/outread-app-review). Praise: customization, Pocket/Instapaper, dyslexia/ADHD — [justuseapp](https://justuseapp.com/en/app/778846279/outread-speed-reading/reviews).
- Spritz App: a user asked for copy/paste and PDF/ebook import (and then found copy/paste) — [App Store](https://apps.apple.com/us/app/spritz-app/id1486315785).
- Reedy: PDF "not supported at all" — [Speed Reading Lounge](https://www.speedreadinglounge.com/reedy-app-android).
- Ads: users mention upgrading to remove ads in free RSVP apps — [search summary incl. Speedy Reader listing](https://play.google.com/store/apps/details?id=com.dtservice.turbo_reader).
- Comprehension: the peer-reviewed "Modern Speed-Reading Apps Do Not Foster Reading Comprehension" found that RSVP apps do not support comprehension, and that natural eye movements matter — [PubMed 29461715](https://pubmed.ncbi.nlm.nih.gov/29461715/). Readers report understanding sentences but struggle to recall or synthesize — [readlite.in](https://readlite.in/concepts/rsvp-reading/).
- Eye strain appears mainly as a **marketing claim** (RSVP "reduces eye fatigue" / "minimizes eye strain"), not as a researched benefit — [ConquerRSVP](https://apps.apple.com/app/conquerrsvp/id6499281369), [AppBrain ReadOwl](https://www.appbrain.com/appstore/readowl-spritz/ios-6473507149).
- Vendor responses to the comprehension critique: AI quizzes (Outread), comprehension checks per drill (Acceleread), AI chat (easyreads), switching to audio when tired (Éist/easyreads) — sources as in Q1.

### Inferences
- Features that address these complaints directly: context on pause (sentence window), punctuation-aware pauses, and a soft start. They go at the "I lose the thread" comprehension complaint without an AI dependency. A generous free tier (paste text, no quotas) goes at the paywall complaint.

### Gaps
- Direct review text from the App Store, Play and Chrome Web Store (and Reddit r/speedreading threads) could not be retrieved, so the complaint list relies on aggregator summaries. The frequency of each complaint is not quantified.

## Q4: Which ones support non-English text, and Turkish specifically?

### Takeaway
No major international RSVP app advertises **Turkish-specific text handling** (tokenization, suffix-aware ORP, Turkish abbreviations, Turkish-aware pause rules). Most will display Turkish Unicode text as generic words. SwiftRead's TTS covers 90+ languages, and Reedy localizes its UI to about 10 languages (Turkish not listed). The Turkish market has **mainly exercise/trainer apps** (Speed Readingo, Speed Reading IQ, "Hızlı Okuma Egzersizleri", Reading Trainer localized as "Hızlı Okuma"), plus small RSVP tools (a Turkish Chrome extension, a web tool, a GitHub project, and possibly the `rsvpokuyucu` Android app). A polished Turkish-first RSVP reader looks like an open niche.

### Cited Findings
- SwiftRead: TTS voices in 90+ languages — [Chrome Web Store](https://chromewebstore.google.com/detail/swiftread-read-faster-lea/ipikiaejjblmdopojhpejjmbedhlibno), [Chapterly](https://chapterly.ai/blog/best-speed-reading-apps).
- Reedy: English, Chinese, Spanish, German, Portuguese, Dutch, French, Serbian, Ukrainian, Russian. **Turkish not listed**. Includes hyphenation for long words — [Amazon Appstore listing / search summary](https://www.amazon.com/AzaGroup-Reedy-Intelligent-reader/dp/B017866WL4), [alternativeto](https://alternativeto.net/software/reedy/about/).
- QuickReader: localized editions only in Spanish, German, French — [AppGrooves](https://appgrooves.com/ios/333441801/quickreader-speed-reading/inkstone-software-inc).
- Turkish RSVP tools:
  - "Hızlı Okuma | Speed Reading" Chrome extension: RSVP plus WPM tests, Turkish listing (its description mentions Reedy) — [Chrome Web Store TR](https://chromewebstore.google.com/detail/h%C4%B1zl%C4%B1-okuma-speed-reading/ihbdojmggkmjbhfflnchljfkgdhokffj?hl=tr).
  - Rehber Panda "RSVP Okuma" web tool — [rehberpanda.com](https://rehberpanda.com/araclar/hizli-okuma/rsvp/).
  - GitHub CagriC05/hizli-okuma (EPUB → RSVP) — [GitHub](https://github.com/CagriC05/hizli-okuma).
  - Android "RSVP Speed Reader" (package `com.rsvpokuyucu.app`; Turkish-origin name, English listing, Gemini AI chapters) — [Google Play](https://play.google.com/store/apps/details?id=com.rsvpokuyucu.app).
  - A Turkish blog post recommends Instapaper's word-by-word mode for fast reading on the internet — [Fırat Demirel Substack](https://firatdemirel.substack.com/p/instapaper-hizli-okuma).
- Turkish trainer apps (mostly exercise-based, not RSVP readers):
  - Speed Readingo: gamified, Schulte tables, assessments, AI premium — [App Store TR](https://apps.apple.com/tr/app/speed-readingo-3x-h%C4%B1zl%C4%B1-oku/id6737622922?l=tr), [Substack](https://wabyilmaz.substack.com/p/hzl-okuma-nasl-yaplr-okuma-hznz-3).
  - Speed Reading IQ: hızlı okuma — [App Store TR](https://apps.apple.com/tr/app/speed-reading-iq-h%C4%B1zl%C4%B1-okuma/id829759808?l=tr).
  - Hızlı Okuma ve Egzersizleri — [Play](https://play.google.com/store/apps/details?id=com.stillnewagain.hizliokuma&hl=en_US).
  - Hızlı Okuma Egzersizleri — [Play](https://play.google.com/store/apps/details?id=dirin.speedreader&hl=en_US).
  - Reading Trainer as "Hızlı Okuma" — [Play](https://play.google.com/store/apps/details?id=com.heku.readingtrainer&hl=en_US).
- A Turkish speed-reading research article appears in Ana Dili Eğitimi Dergisi (Jan 2023) — [DOAJ](https://doaj.org/article/05b122bb8d5141cdb218ac5950ce070a). (Not reviewed in depth.)

### Inferences
- Turkish is agglutinative, so words are long (e.g., "okuyamadıklarımızdan"). Generic RSVP with fixed ms-per-word and an English-tuned ORP table will handle long Turkish words poorly. Length-weighted timing and a Turkish-tuned ORP are a concrete technical differentiator. Reedy's hyphenation shows that at least one competitor saw the long-word problem.
- The Turkish competitive set splits into (a) global RSVP readers with no Turkish tuning and (b) Turkish trainer/exercise apps with no strong RSVP reader. A Turkish-first RSVP *reader* with natural rhythm fills the gap between them.

### Gaps
- I could not test how SwiftRead, Outread or Reedy actually render or time Turkish text (e.g., İ/ı casing, "Dr." / "vb." abbreviations, apostrophe suffixes like "Ankara'da"). A hands-on test is needed.
- No download numbers or ratings for the Turkish apps (Speed Readingo, the Hızlı Okuma extension, rsvpokuyucu) could be retrieved.
- Whether Spritz's US patent has Turkish or European counterparts was not researched.
