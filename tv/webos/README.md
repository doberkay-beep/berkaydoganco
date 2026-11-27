# frameby. — LG webOS

LG televizyonlar için frameby. (ilk sürüm 1.0.0). 1920×1080'e sabit, tek sayfalık bir webOS web uygulaması;
paket kimliği `co.berkaydogan.frameby`. Aynı HTML5 temeli VIDAA'da da kullanılabilir (kumanda tuş kodları ve
çıkış çağrısı dışında platforma bağlı bir şey yok).

## Ne yapar

Uygulamadaki galeri motorunun (`frameby-app/frameby/Galeri.swift`, `Calar.swift`) web karşılığı:

- **Günde 12 kare, her biri 4 dakika**, tur sonunda 3 dakika "Bugünlük bu kadar", sonra baştan. Akış İstanbul
  saatine hizalı ve karıştırma uygulamadakiyle **birebir aynı** (Swift ile karşılaştırıldı: 4 gün × 2 katman ×
  havalı/havasız, 16 durumda aynı 12 kare). Yani evdeki TV, iPhone, iPad ve Mac aynı anda aynı kareyi gösterir.
- Havaya göre öne çıkan kareler (Open-Meteo, yalnız İstanbul'un koordinatı gider), yıl dönümü karesi, katalogdaki
  özel günler ve mevsimler; yatay ekranda dikey kare yalnız bağlantılı üçlüsüyle.
- Köşede yer, saat, o günün havası (14° · poyraz), cihaz İstanbul saatinde değilse "İstanbul'da şimdi", canlı
  radyo hapı ve çalan şarkı (dakikada bir; `meta_gizli` radyoda gösterilmez).
- **Ses her zaman o karenin radyosunun canlı yayını**, iki `<audio>` arasında 4 sn çapraz geçiş; hiçbir şey kaydedilmez.
- **Katmanlar:** yalnız ücretsizler — katalogda `ucretsiz: true` olanlar (şu an Gün ve Eski İstanbul). frameby+
  katmanları (Berkay'ın İstanbul'u, Gece kıyısı) bu sürümde menüde hiç görünmez.
- **Menü (iOS'taki gibi):** ana sayfada katmanlar, Cebim, Ses, Cebime koy / Cepten çıkar, Ayarlar ›. Ayarlar'da
  Sıra (Karışık / Gerçek saat), Tek kare, Yer (en az 6 karesi olan semtler), Sabah (07:00–09:00), Uyku zamanlayıcı
  (30 dk / 1 sa / 2 sa), Gece yumuşatma, Senin günün ›. Ayarlar, Cebim ve sessizlik TV'de saklanır (localStorage).
- **Uyku ve sabah:** süre dolunca son dakikada ses kısılır, yayın kapanır, ekran neredeyse siyah ("İyi geceler.");
  bir tuş galeriyi uyandırır. Sabah seçiliyse o saatte Gün katmanı açılır, ses iki dakikada sıfırdan yükselir.
  TV'nin kendi "4 saat sonra kapan" ayarı açıksa TV gece kendini kapatabilir; o durumda sabah çalmaz.
- **50 dil:** metinler iOS uygulamasının String Catalog'undan (`js/diller.js`, aşağıda "Diller"); TV'nin diline
  göre seçilir. Yer adları her dilde Türkçe. Arapça, Farsça, İbranice ve Urduca'da ekran iOS'taki gibi aynalanır.

### Kaynaklar

| Ne | Nereden |
|---|---|
| Katalog | `https://www.berkaydogan.co/frameby/katalog.json` (en çok 3 sn beklenir; yoksa son indirilen, o da yoksa pakete konan kopya) |
| Kare görselleri | `https://www.berkaydogan.co/frameby/kareler/<id>.jpg` |
| Radyo listesi ve şarkı | nowby Supabase `stations` (herkese açık okuma anahtarı; `app_izinli = true`, `is_active = true`, katalogdaki `disarida` hariç, yalnız `https://` yayınlar) |
| Hava | `api.open-meteo.com` (yarım saatte bir) |
| Yazı tipleri | Pakette: `fonts/` (Bodoni Moda + Newsreader; aşağıda "Yazı tipleri") |

### Kumanda

| Tuş | Galeride | Menüde |
|---|---|---|
| ◀ ▶ | önceki / sonraki kare (akış o kareden sürer) | ◀ bir üst sayfa / menüyü kapatır |
| ▼ | katman menüsünü açar | aşağı |
| ▲ / OK | yer ve saat yazısını gizler/gösterir | yukarı / seç |
| Oynat, Duraklat, Durdur | sesi kapatır/açar (sessizlik sonraki açılışta da sürer) | — |
| Geri | uygulamadan çıkar (`PalmSystem.platformBack()`, LG'nin önerdiği sistem davranışı) | bir üst sayfa / menüyü kapatır |
| Herhangi bir tuş | uyku zamanlayıcısı dolmuşsa galeriyi uyandırır (Geri hariç) | — |

Magic Remote imleciyle de çalışır: sağ alttaki "frameby." menüyü açar, satırlara tıklanır, karartılmış alana
tıklamak menüyü kapatır. `appinfo.json`'daki `disableBackHistoryAPI: true` sayesinde Geri tuşu (461) uygulamaya gelir.
Tarayıcıda Backspace ve Esc Geri yerine geçer.

### Ekran uyanık kalsın

- `appinfo.json`: `"screenSaverProperties": { "preferredType": 3 }` + `"useGalleryMode": true`. LG'nin galeri
  uygulamaları için belirlediği ayar: OLED'de (webOS 5.0+) ekran koruyucu birkaç dakika yerine 30 dakikada gelir,
  ekran yavaşça kararır, resim modu Galeri olur. LG'ye göre yanlış ekran koruyucu ayarı yayın reddi sebebi.
  ([LG: Screensaver](https://webostv.developer.lge.com/develop/guides/screensaver))
- Screen Wake Lock API destekleyen motorlarda (webOS 22+, tarayıcı) ayrıca ekran kilidi istenir.
- LG belgelerinde web uygulamasının ekran koruyucusunu tamamen kapatmasının bir yolu yok (yalnız tam ekran video
  oynarken çıkmıyor). TV'nin enerji kuralı gereği "4 saat sonra kapan" ayarı da uygulamadan aşılamaz.
- OLED yanığına karşı köşe yazısı her karede birkaç piksel kayar.

### Radyo kesilirse

Bekçi her saniye yayının ilerleyip ilerlemediğine bakar. 9 sn ilerlemezse (ya da hata verirse) önce **aynı radyoya**
iki kez yeniden bağlanır (3 sn, sonra 8 sn ara); yine çalmazsa rastgele **başka bir izinli radyoya** geçer
(uygulamadaki yedek radyo davranışı). Yayın biçimi desteklenmiyorsa (hata kodu 4; örn. HLS `.m3u8` çalamayan
masaüstü Chrome) yeniden denemeden doğrudan yedeğe geçer. İnternet geri gelince (`online`) hemen yeniden bağlanır. Radyo listesi hiç
gelmezse dakikada bir yeniden istenir. Uygulama arka plana alınınca yayın durur, dönünce akış saate yeniden hizalanır.

## Tarayıcıda deneme

```bash
python3 -m http.server 8790 --directory tv/webos
```

Sonra `http://localhost:8790/` (pencere 1920×1080'e ölçeklenir). Deneme parametreleri:
`?sure=12&sonu=6` (kare 12 sn, günün sonu 6 sn), `&sessiz=1`, `&hava=yagmur`, `&bugun=2026-04-18`,
`&katman=arsiv`, `&dil=en`. Chrome'da ses ilk tuş basışında başlar (otomatik oynatma kuralı; TV'de bu engel yok).
Konsolda `frameby.G` galeriyi, `frameby.Calar` çalıcıyı gösterir.

## LG simülatöründe deneme (TV gerekmez)

LG'nin resmî simülatörlerinden üçü bu Mac'te kurulu (`~/Developer/webos-tv/`; zipler LG'nin
[Simulator Installation](https://webostv.developer.lge.com/develop/tools/simulator-installation) sayfasından, SDK
lisansı kabul edilerek indirildi, ikisi de notarize):

| Simülatör | Motor | Not |
|---|---|---|
| `webOS_TV_26_Simulator_1.5.0` | Chrome 132 | Apple Silicon |
| `webOS_TV_22_Simulator_1.4.1` | Chrome 87 | Intel; Rosetta 2 ile çalışır (27 Kas 2026'da kuruldu) |
| `webOS_TV_6.0_Simulator_1.4.1` | Chrome 79 | Intel (Rosetta); kumanda penceresi arkadayken boş görünür, menü: Tools › Inspector |

Paketlenecek klasörü doğrudan açar; `-p "sessiz=1"` ilk açılışta sesi kapalı başlatır:

```bash
sh tv/webos/paketle.sh && ares-launch -s 26 -sp ~/Developer/webos-tv/webOS_TV_26_Simulator_1.5.0 tv/webos/build/app -p "sessiz=1"
```

```bash
ares-launch -s 22 -sp ~/Developer/webos-tv/webOS_TV_22_Simulator_1.4.1 tv/webos/build/app -p "sessiz=1"
```

```bash
ares-launch -s 6.0 -sp ~/Developer/webos-tv/webOS_TV_6.0_Simulator_1.4.1 tv/webos/build/app -p "sessiz=1"
```

Simülatörün yanında bir kumanda penceresi (RCU) açılır; oklar, OK, Geri ve medya tuşları gerçek kumandanın tuş
kodlarını gönderir. RCU'daki **Inspect** geliştirici araçlarını açar (konsolda `frameby.G`, `frameby.Calar`,
`frameby.tuslar` = son 20 tuş kodu, `frameby.durum()` = tek satırda motor, kare, menü, ses ve radyo durumu).

Simülatörde görülen ve düzeltilen iki şey:
- webOS kendi stil dosyasıyla her öğeye `font-family: "LG Display-Regular"` veriyor; yalnız mirasla gelen yazı
  tipi eziliyordu. `css/frameby.css` yazı tipini `#sahne *` ile her öğeye doğrudan verir.
- HLS için `canPlayType` güvenilmez (simülatör "" diyor, masaüstü Chrome "maybe" deyip çalamıyor); eleme yapılmaz,
  çalınamayan yayın bekçide hata 4 olarak görülüp yedeğe geçilir.

Simülatör penceresi başka pencerelerin arkasında kalınca sayfa kendini gizli sayar ve uygulama radyoyu durdurur
(TV'de arka plana alınma davranışı); gizliyken bir tuşla kare değişse de yayın başlamaz, öne gelince başlar. Sesi
dinlemek için simülatör penceresi önde olmalı. LG'ye göre simülatörün
ses/görüntü özellikleri gerçek TV'den farklıdır.

## Paketleme ve TV'ye yükleme (ares CLI)

### 1. Kurulum (bir kez)

```bash
npm install -g --prefix ~/.local @webos-tools/cli
```

```bash
ares --version
```

Bu Mac'te kurulu (27 Kas 2026, sürüm 3.2.6): `/usr/local` yönetici izni istediği için kullanıcı klasörüne
(`~/.local/bin`, PATH'te) kuruldu; `sudo` gerekmez. Son paket: `~/Desktop/6-Uygulama-Paketleri/frameby/frameby-webos-1.0.0.ipk`.

### 2. TV'yi geliştirici moduna al (bir kez)

1. LG hesabıyla <https://webostv.developer.lge.com> adresine giriş (Seller Lounge hesabı gerekmez; geliştirici modu için normal LG hesabı yeter).
2. TV'de LG Content Store'dan **Developer Mode** uygulamasını kur, aynı LG hesabıyla aç.
3. **Dev Mode Status: ON** yap (TV yeniden başlar), **Key Server: ON** yap. Ekrandaki IP adresini not et.
   Geliştirici modu 50 saat sürer; uygulamadaki "Extend" ile uzatılır.
4. Bilgisayar ile TV aynı ağda olmalı.

### 3. TV'yi tanıt (bir kez)

```bash
ares-setup-device
```

`add` seç; ad `tv`, IP TV'deki adres, port `9922`, kullanıcı `prisoner`, şifre boş. Sonra anahtarı al
(TV'de Developer Mode ekranındaki passphrase'i sorar):

```bash
ares-novacom --device tv --getkey
```

```bash
ares-device --device tv --system-info
```

### 4. Paketle

```bash
sh tv/webos/paketle.sh
```

Betik uygulama dosyalarını ve sitedeki güncel `public/frameby/katalog.json`'ı `tv/webos/build/app`'e kopyalar
ve `tv/webos/build/co.berkaydogan.frameby_1.0.0_all.ipk` üretir (`build/` git'e girmez). Elle:
`ares-package tv/webos/build/app -o tv/webos/build`.

### 5. Yükle, aç, incele

```bash
ares-install --device tv tv/webos/build/co.berkaydogan.frameby_1.0.0_all.ipk
```

```bash
ares-launch --device tv co.berkaydogan.frameby
```

```bash
ares-inspect --device tv --app co.berkaydogan.frameby --open
```

Kaldırmak için `ares-install --device tv --remove co.berkaydogan.frameby`. Sürüm yükseltirken `appinfo.json`'daki
`version`'ı artır.

### Mağaza (Berkay'ın onayıyla)

LG Seller Lounge'da bireysel satıcı ("Individual Seller") hesabı, sonra `.ipk` + mağaza görselleri + gizlilik
adresi (berkaydogan.co/frameby/gizlilik) ile gönderim. Bu adımların hiçbiri yapılmadı.

## Yazı tipleri

Pakete gömülü, TV yazı tipi için internete çıkmaz: `fonts/` klasöründe Bodoni Moda (yer adları, logo) ve
Newsreader (düz ve italik; saat, menü, hap). İkisi de SIL Open Font License 1.1; lisans metinleri
`fonts/OFL-BodoniModa.txt` ve `fonts/OFL-Newsreader.txt`, pakete onlar da girer. Yalnız `latin` ve `latin-ext`
alt kümeleri var (Türkçe harfler latin-ext'te; toplam ~250 KB), `css/fontlar.css` bunları `unicode-range` ile
tanımlar, gerekmeyen alt küme hiç yüklenmez. Dosyalar Google Fonts css2 API'sinden (27 Kas 2026) alındı.
50 dile geçilirse (Kiril, Yunan, Vietnam…) o alt kümeler de aynı yoldan eklenmeli; Arapça, Çince gibi yazılar
bu iki ailede yok, onlarda TV'nin kendi yazısı kullanılır.

## Diller

`js/diller.js` elle yazılmaz; iOS uygulamasının `Localizable.xcstrings` dosyasından üretilir. Üreteç `js/frameby.js`'teki
`L("…")` / `LF("…")` anahtarlarını kendisi toplar; metin eklenince ya da iOS'ta çeviri değişince yeniden çalıştır:

```bash
python3 tv/webos/araclar/diller-uret.py
```

Katalogda olmayan anahtar (şu an yalnız tarayıcıya özgü iki uyarı) İngilizce gösterilir. Bodoni Moda ve Newsreader'ın
pakette yalnız Latin alt kümeleri var; Kiril, Yunan, Arap, Hint ve Doğu Asya yazılarında TV'nin kendi yazısı kullanılır.

## frameby+ (bu sürümün dışında)

LG'nin uygulama içi ödeme hizmeti artık olmadığı için frameby+ webOS'ta TV içinden satılamaz. En sade yol,
aboneliği telefonda alıp TV'ye **kodla bağlamak**: TV menüsünde kilitli katman seçilince ekranda kısa bir kod ve
karekod (örn. `berkaydogan.co/frameby/tv?kod=K7Q2`) çıkar; iPhone'daki frameby. (ya da web'deki bir sayfa) kodu,
App Store / Play aboneliğinin imzalı kaydıyla birlikte sunucuya gönderir; sunucu (`api/frameby/anahtar.js`'nin
yanına küçük bir eşleştirme ucu) TV'ye bugünkü 12 saatlik anahtarın aynısını verir, TV de ücretli kareleri
`/api/frameby/kare/` üzerinden bu anahtarla indirir. İkinci seçenek web'de doğrudan satış (Stripe vb.) ve aynı kodla
bağlama; ama TV ekranında "web'den satın al" demenin LG mağaza kuralları açısından durumu gönderimden önce
kontrol edilmeli. Hangisinin seçileceği Berkay'ın kararı.

## Henüz olmayanlar

- Harita yok (kumandayla haritada gezinmek ayrı bir tasarım ister); yer seçimi Ayarlar › Yer satırından.
- "Saate göre" yok: iOS'ta gece Gece kıyısı'na (frameby+) geçiyor; TV'de frameby+ olmadığı için şimdilik anlamsız.
- Kartpostal yok (iOS'ta paylaşım sayfasıyla gönderiliyor; TV'de paylaşım yok).
- Gerçek bir LG TV'de denenmedi. Tarayıcıda 1920×1080'de, webOS TV 26 (Chrome 132), 22 (Chrome 87) ve 6.0
  (Chrome 79) simülatörlerinde denendi: kareler, üçlü dikey kare, yazı tipleri, radyo ve şarkı adı, ◀ ▶ ▲ ▼ OK Geri tuş kodları,
  menü, Geri ile sistemin çıkış penceresi, kalıcı sessizlik. `.ipk` ares-package 3.2.6 ile uyarısız.
- Hedef webOS 3.0+ (2016) olarak ES5 ile yazıldı; 6.0'dan (2021) eski motorlarda (Chromium 38/53/68, webOS 3–5)
  denenmedi: LG'nin simülatörleri 6.0'dan başlıyor, daha eskisi için gerçek TV gerekir.
