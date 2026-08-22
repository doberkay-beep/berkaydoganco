/* Sitede tam metin yayımlanan yazılar.
   Kaynak: Berkay'ın Substack yazıları (kendi metinleri, birebir) + site için yazılanlar.
   taslak: true → sayfası açılır ama noindex'tir, listelerde ve sitemap'te görünmez
   (Berkay onaylayınca taslak kaldırılır). "[[video]]" paragrafı YouTube kartı olarak çizilir. */

export type Yazi = {
  slug: string;
  title: string;
  dek: string;          // tek cümlelik alt başlık
  dateISO: string;      // 2026-06-26
  dateText: string;     // 26 Haziran 2026
  paras: string[];      // "— " ile başlayan son paragraf imza olarak stillenir
  substackUrl?: string; // ilk yayın yeri
  taslak?: boolean;
};

export const YAZILAR: Yazi[] = [
  {
    slug: "sustum-ama-yok-olmadim",
    title: "Sustum ama yok olmadım",
    dek: "Uzun bir sessizliğin ardından: kamera, siteye bırakılan parçalar ve Tasfiye'nin tarihi.",
    dateISO: "2026-06-26",
    dateText: "26 Haziran 2026",
    substackUrl: "https://doberkay.substack.com/p/sustum-ama-yok-olmadm",
    paras: [
      "Uzun zamandır buraya yazmadım. Açıkçası ne yazacağımı da bilemedim.",
      "Bazen insan, paylaşacak bir şeyi olduğunda değil; paylaşacak birini bulduğunda yazıyor. Ben de o yüzden buradayım. Çünkü buraya, gürültüden kaçanlar için yazıyorum. Ve siz, bu sessizliği benimle paylaşan az sayıdaki insansınız.",
      "Size birkaç şey anlatmak istiyorum.",
      "Geçen gün ilk kez kameranın karşısına geçtim.",
      "Bunu yazmak bile garip geliyor, çünkü ben hep perde arkasında kalmayı seçtim. Konuşmak yerine yazdım hep. Ama bu sefer, kendi sesimle, kendi yüzümle anlattım: neden yazdığımı, neden hâlâ korktuğumu, neden her boş sayfanın önünde yeniden başladığımı.",
      "[[video]]",
      "Söylemesi kolay olmadı. İzlerken hâlâ biraz utanıyorum. Ama sanırım bazı itiraflar, sessizce yapılmıyor.",
      "Bir de siteme birkaç parça bıraktım.",
      "Mürekkep ve Köz'den tanıdık dizeler, ve henüz kimsenin görmediği bir şey: Tasfiye'den kesitler. Tamamı değil. Sadece birer pencere. Merak edenler için orada duruyorlar.",
      "Ve en çok bunu söylemek istedim:",
      "Tasfiye'nin tarihi belli oldu. Ağustos 2026.",
      "İkinci kitabım. Bir deneme kitabı. Uzun süredir içimde taşıdığım, görmezden geldiğimiz her şeye verdiğim bir isim. Çıktığında, ilk siz duyacaksınız. Çünkü siz zaten en baştan buradaydınız.",
      "Şimdilik bu kadar.",
      "Sustuğum yerden hâlâ yazıyorum. Ve bu, sönmeyen bir köz gibi; görünmüyor ama duruyor.",
      "— Berkay",
    ],
  },
  {
    slug: "buraya-gurultuden-kacanlar-icin",
    title: "Buraya, gürültüden kaçanlar için",
    dek: "Bu köşe neden var — gürültüden kaçanlara açık bir davet.",
    dateISO: "2026-06-15",
    dateText: "15 Haziran 2026",
    substackUrl: "https://doberkay.substack.com/p/buraya-gurultuden-kacanlar-icin",
    paras: [
      "Bir köşe açtım kendime. Sosyal medyanın akışından, bildirimlerin gürültüsünden uzak; sadece kelimelerin kaldığı bir yer.",
      "Burada ne bulacaksınız? Yeni yazılar — denemeler, kesitler, dağınık düşünceler. Kitaplarımdan haberler. Ara sıra, bir şiir. Bazen sadece bir cümle, günlerce üstüne düşündüğüm.",
      "Ne sıklıkla? Söz veremem. Yazmak, takvimle olmuyor. Ama yazdığımda, doğrudan size, posta kutunuza gelecek. Aracısız, algoritmasız.",
      "Neden buradasınız? Belki Mürekkep ve Köz'ü okudunuz. Belki Şairin Hesabı'nı dinlediniz. Belki de sadece, sizin gibi birinin de bu gürültüde boğulduğunu görmek istediniz.",
      "Her ne sebeple geldiyseniz: hoş geldiniz.",
      "Yazmak, varoluşun en sessiz itirafıdır. Ve bu, benim itirafım.",
      "— Berkay",
    ],
  },

  /* ---- TASLAKLAR (Berkay onaylayınca taslak: true kaldırılacak) ---- */
  {
    slug: "siire-nereden-baslamali",
    title: "Şiire nereden başlamalı?",
    dek: "Şiir okumak isteyen ama nereden gireceğini bilemeyenler için dürüst bir yol haritası.",
    dateISO: "2026-08-22",
    dateText: "22 Ağustos 2026",
    taslak: true,
    paras: [
      "Bana en çok sorulan sorulardan biri bu: \"Şiir okumak istiyorum ama nereden başlayacağımı bilmiyorum.\" Anlıyorum. Şiir, dışarıdan bakınca kapısı kilitli bir ev gibi görünür. İçeride ışık yanar, ses gelir; ama anahtar sende yokmuş gibi hissedersin.",
      "Sana bir sır vereyim: anahtar diye bir şey yok. Kapı zaten açık. Sadece kimse içeri nasıl girileceğini göstermemiş.",
      "İlk kural: anlamak zorunda değilsin. Şiir bir matematik problemi değil; çözülmek için yazılmaz. Bir dize seni durdurduysa — nedenini bilmesen bile — şiir işini yapmıştır. Anlamadığın ama unutamadığın dize, anladığın ve unuttuğun dizeden daha değerlidir.",
      "İkinci kural: baştan başlamak zorunda da değilsin. Kimse romana Dostoyevski'yle başlamanı beklemez; şiire de divan edebiyatıyla başlamak zorunda değilsin. Bugünün diliyle yazan birini bul, oradan geriye doğru yürü.",
      "Peki kimden başlamalı? Herkesin listesi kendine; benimki şöyle: Cemal Süreya ile başla — çünkü şiirin ciddi olmak zorunda olmadığını, zeki ve yaralı aynı anda olabileceğini ondan öğrenirsin. Sonra Turgut Uyar'a geç; kalabalık içindeki yalnızlığın dilini o kurdu. Özdemir Asaf'ın kısa şiirleri, şiire mesafeli birinin cebine en kolay giren şeylerdir. Didem Madak, gündelik hayatın içinden konuşur — mutfaktan, balkondan, kırgınlıktan. Ve Edip Cansever'e mutlaka uğra: \"Mendilimde kan sesleri\" gibi bir dizeyle tanışmadan şiiri tanıdım deme.",
      "Üçüncü kural: sesli oku. Şiir gözle değil, kulakla anlaşılır. Bir şiiri sevip sevmediğini anlamanın en kısa yolu, onu bir kez de yüksek sesle okumaktır. Ritim tutuyorsa, kelimeler ağzında doğru duruyorsa, o şiir seninle konuşuyordur.",
      "Dördüncü kural: az oku. Evet, yanlış duymadın. Şiir kitabı romanla aynı hızda okunmaz. Bir oturuşta üç şiir, bazen tek şiir yeter. Ertesi gün bir tane daha. Şiir stoklanmaz; demlenir.",
      "Ve son kural: not al. Seni durduran dizeyi bir yere yaz — telefonuna, defterine, duvarına. Zamanla kendi antolojini kurmuş olursun. O antoloji, hangi şairin sana göre olduğunu herkesten iyi söyler.",
      "Şiir, hayatının eksik olduğunu fark ettiğin anda başlar. O an geldiğinde hangi kitabın yanında olduğu önemli değil; önemli olan, bir kitabın yanında olması.",
      "— Berkay",
    ],
  },
  {
    slug: "genc-sair-olmak",
    title: "Genç şair olmak: yazmaya başlayanlara on dürüst not",
    dek: "İlk kitabını 22 yaşında yayımlamış birinden, süslemesiz on not.",
    dateISO: "2026-08-22",
    dateText: "22 Ağustos 2026",
    taslak: true,
    paras: [
      "İlk kitabım çıktığında 22 yaşındaydım. Bu bir övünme cümlesi değil; bir konum bildirimi. Aşağıdaki notlar, tepeden bakan birinin öğütleri değil — yolun henüz başında olan birinin, kendinden birkaç adım gerideki yolcuya bıraktığı işaretler.",
      "Bir: Çok yazacaksın, çoğunu atacaksın. İlk yüz şiirin, yüz birinci şiirin provasıdır. Bunu kayıp sayma; kas böyle çalışır.",
      "İki: Taklitle başlaman normal. Herkes birinin gölgesinde yürüyerek öğrenir. Sorun gölgede yürümek değil, gölgeyi ev sanmak. Sevdiğin şairi içine çek, sonra ondan kurtulmaya çalış — asıl sesin, o boğuşmanın içinden çıkar.",
      "Üç: İlham beklersen az yazarsın. Masa, ilhamdan güçlüdür. Ben yazmak istemediğim günlerde de masaya oturdum; iyi dizelerin çoğu, isteksiz başlayan günlerden çıktı.",
      "Dört: Kısa yaz, sonra daha da kısalt. Genç şiirin en sık hastalığı fazlalıktır. Bir dizeyi silmek acıtıyorsa, muhtemelen silinmesi gereken odur.",
      "Beş: Okumadan yazılmaz. Yazdığından çok okuyacaksın — hem şiir hem düzyazı. Kelime dağarcığı depo değildir; kastır, beslenmezse erir.",
      "Altı: Reddedileceksin. Dergiden cevap gelmeyecek, dosyan geri dönecek, kimse okumamış gibi davranacak. Bunların hiçbiri şiirin hakkında nihai bir yargı değil; sadece yolun doğal hava koşulları.",
      "Yedi: Sosyal medya vitrin olabilir, atölye olamaz. Beğeni sayısı, dizenin iyi olduğunu göstermez; sadece o gün algoritmanın keyfini gösterir. Vitrine koymadan önce atölyede pişir.",
      "Sekiz: Kendine bir okuma ritüeli kur. Sesli oku, yürürken oku, yazdığını bir gün beklet ve yabancı gözle tekrar oku. Şiirin ilk okuru sensin; o okuru ciddiye al.",
      "Dokuz: Yayımlamak için acele etme, ama saklamak için de bahane üretme. Dosyan hazır olduğunda anlarsın: şiirler birbirini tanıyordur artık. O gün gelmeden kapı kapı gezme; o gün gelince de çekmecede bekletme.",
      "On: Şair olmak bir kimlik değil, bir eylemdir. Kartvizite yazılmaz; her sabah yeniden yapılır. Yazdığın gün şairsin. Yazmadığın gün de dünyanın sonu değil — masaya yarın yine oturursun.",
      "Bu notların hepsi tek cümleye iner aslında: yaz, sil, oku, bekle, yeniden yaz. Gerisi edebiyat tarihinin işi.",
      "— Berkay",
    ],
  },
];

export const YAYINDA = YAZILAR.filter((y) => !y.taslak);
