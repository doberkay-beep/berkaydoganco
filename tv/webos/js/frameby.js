/* frameby. — LG webOS televizyon uygulaması (ilk sürüm: yalnız ücretsiz katmanlar + canlı radyo).
 *
 * Uygulamadaki galeri motorunun (frameby-app/frameby/Galeri.swift, Calar.swift) web karşılığı:
 * - Günde 12 kare, her biri 4 dk; tur sonunda 3 dk "günün sonu", sonra baştan.
 * - Akış İstanbul saatine hizalı ve karıştırma uygulamadakinin aynısı: aynı gün aynı katmanda
 *   TV, iPhone, iPad ve Mac aynı anda aynı kareyi gösterir (sunucu yok, herkes saatten hesaplar).
 * - Ses her zaman o karenin radyosunun CANLI yayını; hiçbir şey kaydedilmez.
 * - Kaynaklar: katalog ve görseller berkaydogan.co'dan, radyo listesi nowby'ın herkese açık listesinden.
 *
 * Eski webOS sürümlerinde (Chromium 38+) çalışsın diye ES5 ile yazıldı: let/const, ok fonksiyonu,
 * async/await, fetch kullanılmaz.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------- Ayarlar

  var SITE = "https://www.berkaydogan.co";
  var VERITABANI = "https://uiouzizblrkojmsqvbjk.supabase.co/rest/v1";
  /** nowby uygulamasındaki herkese açık (publishable) anahtar; yalnız okunabilir istasyon listesi. */
  var ANAHTAR = "sb_publishable_NgT0RLV5C56i1O64eWmv9g_IcAqk5Hg";
  var ISTANBUL_FARK = 3 * 3600 * 1000; // Türkiye 2016'dan beri yıl boyu UTC+3 (yaz saati yok)

  // Tarayıcıda deneme: index.html?sure=12&sonu=6&sessiz=1&hava=yagmur&bugun=2026-04-18&katman=arsiv
  var Q = (function () {
    var s = {}, p = location.search.replace(/^\?/, "").split("&");
    for (var i = 0; i < p.length; i++) {
      if (!p[i]) continue;
      var kv = p[i].split("=");
      s[decodeURIComponent(kv[0])] = decodeURIComponent(kv.slice(1).join("=") || "1");
    }
    return s;
  })();

  var AYAR = {
    kareSuresi: (+Q.sure || 4 * 60) * 1000,
    sonuSuresi: (+Q.sonu || 3 * 60) * 1000,
    gunlukKare: 12,
    acilis: 3500,
    gecis: 4000,
    katalog: Q.katalog || SITE + "/frameby/katalog.json"
  };

  // ---------------------------------------------------------------- Dil

  var TR = String(navigator.language || "tr").toLowerCase().indexOf("tr") === 0;
  if (Q.dil) TR = Q.dil === "tr";
  function L(tr, en) { return TR ? tr : en; }
  var AYLAR = TR
    ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var KATMAN_EN = { gun: "Day", arsiv: "Old Istanbul", k1: "Berkay's Istanbul", k2: "Night Shore" };
  document.documentElement.lang = TR ? "tr" : "en";

  // ---------------------------------------------------------------- Yardımcılar

  function $(id) { return document.getElementById(id); }
  function iki(n) { return n < 10 ? "0" + n : "" + n; }
  function simdi() { return Date.now(); }
  /** İstanbul saatini UTC alanlarında taşıyan tarih (getUTC* ile okunur). */
  function istanbul(an) { return new Date((an || simdi()) + ISTANBUL_FARK); }
  function bugunIstanbul() {
    if (Q.bugun) return Q.bugun;
    var d = istanbul();
    return d.getUTCFullYear() + "-" + iki(d.getUTCMonth() + 1) + "-" + iki(d.getUTCDate());
  }
  function istanbulSaat() { var d = istanbul(); return iki(d.getUTCHours()) + ":" + iki(d.getUTCMinutes()); }
  function gunMetni() { var d = istanbul(); return d.getUTCDate() + " " + AYLAR[d.getUTCMonth()]; }
  function yilinGunu() {
    var d = istanbul();
    return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000) + 1;
  }
  function idSirasi(a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; }

  function istek(url, basliklar, zamanAsimi) {
    return new Promise(function (coz, reddet) {
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.timeout = zamanAsimi || 10000;
      for (var k in basliklar || {}) x.setRequestHeader(k, basliklar[k]);
      x.onload = function () {
        if (x.status >= 200 && x.status < 300) {
          try { coz(JSON.parse(x.responseText)); } catch (e) { reddet(e); }
        } else reddet(new Error("http " + x.status));
      };
      x.onerror = x.ontimeout = function () { reddet(new Error("ag")); };
      x.send();
    });
  }
  function bekle(ms) { return new Promise(function (c) { setTimeout(c, ms); }); }
  function depoOku(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function depoYaz(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  // ---------------------------------------------------------------- Katalog

  var Katalog = {
    hepsi: [], katmanlar: [], disarida: {}, ozelGunler: [], mevsimler: [], gorselKoku: "/frameby/kareler/", guncelleme: "",

    uygula: function (d) {
      if (!d || !d.kareler || !d.kareler.length) return false;
      var bilinen = { gun: 1, arsiv: 1, k1: 1, k2: 1 };
      this.hepsi = d.kareler.filter(function (k) { return k && k.id && bilinen[k.katman]; });
      this.katmanlar = (d.katmanlar || [{ id: "gun", ad: "Gün", ucretsiz: true }]).filter(function (k) { return bilinen[k.id]; });
      this.disarida = {};
      for (var i = 0; i < (d.disarida || []).length; i++) this.disarida[d.disarida[i]] = true;
      this.ozelGunler = (d.ozelGun ? [d.ozelGun] : []).concat(d.ozelGunler || []);
      this.mevsimler = d.mevsimler || [];
      this.gorselKoku = d.gorselKoku || this.gorselKoku;
      this.guncelleme = d.guncelleme || "";
      return true;
    },

    /** Önce sunucu (en çok 3 sn), sonra son indirilen, o da yoksa pakete konan kopya. */
    yukle: function () {
      var self = this;
      return istek(AYAR.katalog, { Accept: "application/json" }, 3000).then(function (d) {
        if (!self.uygula(d)) throw new Error("bos");
        depoYaz("frameby.katalog", JSON.stringify(d));
      }).catch(function () {
        var o = depoOku("frameby.katalog");
        var onbellek = null;
        try { onbellek = o && JSON.parse(o); } catch (e) {}
        return istek("katalog.json", {}, 3000).then(function (p) {
          // Önbellek yalnız paketteki kopyadan yeniyse kullanılır (iOS'taki kuralın aynısı).
          if (onbellek && (onbellek.guncelleme || "") > (p.guncelleme || "")) self.uygula(onbellek);
          else self.uygula(p);
        }).catch(function () { if (onbellek) self.uygula(onbellek); });
      });
    },

    /** Bu sürümde açık olan katmanlar: yalnız ücretsizler (frameby+ webOS'ta henüz yok). */
    acikKatmanlar: function () {
      var self = this;
      return this.katmanlar.filter(function (k) {
        if (!k.ucretsiz) return false;
        for (var i = 0; i < self.hepsi.length; i++) if (self.hepsi[i].katman === k.id) return true;
        return false;
      });
    },

    gorselAdresi: function (k) { return SITE + this.gorselKoku + encodeURIComponent(k.id) + ".jpg"; }
  };

  // ---------------------------------------------------------------- Günün kareleri (Galeri.swift ile aynı)

  /** Üçlünün kareleri: verilen kare ve grubundaki sıradaki ikisi (kimlik sırasıyla). */
  function ucluUyeleri(k, hepsi) {
    if (!k.grup) return [k];
    var uyeler = hepsi.filter(function (u) { return u.grup === k.grup; }).sort(idSirasi);
    var i = -1;
    for (var n = 0; n < uyeler.length; n++) if (uyeler[n].id === k.id) i = n;
    if (uyeler.length < 3 || i < 0) return [k];
    return [uyeler[i], uyeler[(i + 1) % uyeler.length], uyeler[(i + 2) % uyeler.length]];
  }

  function cekimGunu(k) {
    var p = k.id.split("-");
    if (p.length < 2 || p[0] !== "iph" || !/^\d{8}$/.test(p[1])) return null;
    return p[1].slice(0, 4) + "-" + p[1].slice(4, 6) + "-" + p[1].slice(6, 8);
  }
  function yilDonumu(k, bugun) {
    var c = cekimGunu(k);
    if (!c || c.slice(5) !== bugun.slice(5)) return null;
    var y = +bugun.slice(0, 4) - +c.slice(0, 4);
    return y > 0 ? y : null;
  }

  /** Web'deki ve uygulamadaki karıştırmanın aynısı (UInt32 taşmalı LCG). Yatay ekran: dikey kare yalnız üçlüsüyle. */
  function gununKareleri(hepsi, katman, gun, hava) {
    var gorulen = {};
    var havuz = hepsi.filter(function (k) { return k.katman === katman; }).sort(idSirasi).filter(function (k) {
      if (!k.dikey) return true;
      if (!k.grup || ucluUyeleri(k, hepsi).length !== 3) return false;
      if (gorulen[k.grup]) return false;
      gorulen[k.grup] = true;
      return true;
    });
    var tohum = 0, metin = gun + katman, i;
    for (i = 0; i < metin.length; i++) tohum = (Math.imul(tohum, 31) + metin.charCodeAt(i)) >>> 0;
    function rastgele() {
      tohum = (Math.imul(tohum, 1664525) + 1013904223) >>> 0;
      return tohum / 4294967296;
    }
    for (i = havuz.length - 1; i > 0; i--) {
      var j = Math.floor(rastgele() * (i + 1));
      var t = havuz[i]; havuz[i] = havuz[j]; havuz[j] = t;
    }
    // Yıl dönümü: bugünün tarihinde geçmiş yıllarda çekilmiş bir kare varsa günün ilk karesi o olur.
    for (i = 0; i < havuz.length; i++) {
      if (yilDonumu(havuz[i], gun) !== null) { havuz.unshift(havuz.splice(i, 1)[0]); break; }
    }
    if (!hava) return havuz.slice(0, AYAR.gunlukKare);
    // Karışık sırayı bozmadan: havaya uyan ilk 6 kare kesin girer, kalan yerler sıradakilerle dolar.
    var uyanlar = {}, say = 0;
    for (i = 0; i < havuz.length && say < AYAR.gunlukKare / 2; i++) if (havuz[i].hava === hava) { uyanlar[havuz[i].id] = true; say++; }
    var kalan = AYAR.gunlukKare - say;
    return havuz.filter(function (k) {
      if (uyanlar[k.id]) return true;
      if (kalan <= 0) return false;
      kalan--;
      return true;
    }).slice(0, AYAR.gunlukKare);
  }

  function bul(id) {
    for (var i = 0; i < Katalog.hepsi.length; i++) if (Katalog.hepsi[i].id === id) return Katalog.hepsi[i];
    return null;
  }

  // ---------------------------------------------------------------- Hava (Open-Meteo; yalnız İstanbul'un koordinatı gider)

  var Hava = {
    simdiki: Q.hava || null, alindi: 0,
    guncelle: function (zamanAsimi) {
      var self = this;
      if (Q.hava || (self.alindi && simdi() - self.alindi < 30 * 60 * 1000)) return Promise.resolve();
      return istek("https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.98&current=weather_code", {}, zamanAsimi || 3000)
        .then(function (y) { self.simdiki = self.kategori(y.current.weather_code); self.alindi = simdi(); })
        .catch(function () {});
    },
    kategori: function (k) {
      if (k === 0 || k === 1) return "gunes";
      if (k === 2 || k === 3) return "bulut";
      if (k === 45 || k === 48) return "sis";
      if ((k >= 51 && k <= 67) || (k >= 80 && k <= 82) || (k >= 95 && k <= 99)) return "yagmur";
      if ((k >= 71 && k <= 77) || k === 85 || k === 86) return "kar";
      return null;
    }
  };

  // ---------------------------------------------------------------- Çalar: iki <audio> arasında çapraz geçiş

  var Calar = {
    a: null, b: null, calan: null, adres: null,
    sessiz: Q.sessiz === "1" || depoOku("frameby.sessiz") === "1",
    hedef: 1, solma: null, bekci: null, deneme: 0, izinBekliyor: false,
    susunca: null, // (slug) → yedek radyo seçer

    kur: function () {
      this.a = $("sesA"); this.b = $("sesB");
      this.a.volume = 0; this.b.volume = 0;
      var self = this;
      // İnternet geri gelince düşen yayını hemen yeniden bağla.
      window.addEventListener("online", function () { if (self.calan && self.bozuk()) self.yenidenBaglan(); });
    },
    duzey: function () { return this.sessiz ? 0 : this.hedef; },

    cal: function (slug, adres) {
      if (slug === this.calan && !this.bozuk()) return;
      var eski = this.a, yeni = this.b, self = this;
      this.a = yeni; this.b = eski;
      this.calan = slug; this.adres = adres; this.deneme = 0;
      yeni.volume = 0;
      this.baslat(yeni, adres);
      clearInterval(this.solma);
      var adim = 0, ADIM = 40, eskiDuzey = eski.volume;
      this.solma = setInterval(function () {
        adim++;
        var o = adim / ADIM;
        yeni.volume = Math.min(1, Math.max(0, self.duzey() * o));
        eski.volume = Math.min(1, Math.max(0, eskiDuzey * (1 - o)));
        if (adim >= ADIM) {
          clearInterval(self.solma);
          eski.pause(); eski.removeAttribute("src"); eski.load();
        }
      }, AYAR.gecis / ADIM);
      this.izle(yeni);
    },

    baslat: function (p, adres) {
      var self = this;
      p.src = adres;
      var s = p.play();
      if (s && s.catch) s.catch(function (e) {
        // Tarayıcıda dokunmadan ses çalmaz (webOS'ta bu engel yok): ilk tuşta yeniden denenir.
        if (e && e.name === "NotAllowedError") { self.izinBekliyor = true; bildir(L("Ses için bir tuşa bas", "Press any key for sound")); }
      });
    },

    /** İlk tuş basışında (tarayıcıdaki otomatik oynatma engeli) çalmayı yeniden dene. */
    izinVerildi: function () {
      if (!this.izinBekliyor) return;
      this.izinBekliyor = false;
      var p = this.a.play();
      if (p && p.catch) p.catch(function () {});
      this.a.volume = this.duzey();
    },

    bozuk: function () { return !!this._bozuk; },

    /** Bekçi: yayın 9 sn ilerlemezse önce aynı radyoya iki kez yeniden bağlanır (3 sn, sonra 8 sn ara),
     *  yine çalmazsa yedek bir radyoya geçer. */
    izle: function (p) {
      var self = this, son = -1, durgun = 0;
      clearInterval(this.bekci);
      this._bozuk = false;
      this.bekci = setInterval(function () {
        if (p !== self.a || self.izinBekliyor || document.hidden) return;
        var t = p.currentTime || 0;
        var ilerliyor = !p.paused && t !== son;
        son = t;
        durgun = (ilerliyor && !p.error) ? 0 : durgun + 1;
        if (p.error || durgun >= 9) {
          clearInterval(self.bekci);
          self._bozuk = true;
          // Biçim desteklenmiyorsa (MEDIA_ERR_SRC_NOT_SUPPORTED) aynı adresi yeniden denemek boşuna: doğrudan yedeğe.
          if (p.error && p.error.code === 4) self.deneme = 2;
          self.yenidenBaglan();
        }
      }, 1000);
    },

    yenidenBaglan: function () {
      var self = this;
      if (!this.calan) return;
      this.deneme++;
      if (this.deneme > 2) {
        if (this.susunca) this.susunca(this.calan);
        return;
      }
      var slug = this.calan;
      setTimeout(function () {
        if (self.calan !== slug) return;
        var p = self.a;
        p.pause(); p.removeAttribute("src"); p.load();
        p.volume = self.duzey();
        self.baslat(p, self.adres);
        self.izle(p);
      }, this.deneme === 1 ? 3000 : 8000);
    },

    /** Günün sonunda 0.3'e kısılır, sonra geri gelir. */
    duzeyAyarla: function (d) { this.hedef = d; this.a.volume = this.duzey(); },
    sessizYap: function (s) {
      this.sessiz = s; depoYaz("frameby.sessiz", s ? "1" : "0");
      this.a.volume = this.duzey();
    },

    /** Arka plana alınınca yayın kapanır (webOS kuralı; canlı yayın boşuna akmasın). */
    durdur: function () {
      clearInterval(this.solma); clearInterval(this.bekci);
      [this.a, this.b].forEach(function (p) { p.pause(); p.removeAttribute("src"); p.load(); p.volume = 0; });
      this.calan = null;
    }
  };

  // ---------------------------------------------------------------- Galeri

  var G = {
    katman: "gun", gun: [], listeGunu: "", ozelBaslik: null,
    hal: "acilis", sira: 0, gosterilenId: null, koseKaresi: null, koseAcik: true,
    akis: null, koseGorevi: null, sarkiGorevi: null, kusak: 0,
    radyolar: {}, sarki: null, menuAcik: false, menuOdak: 0, onKatman: "A",

    gununListesi: function () {
      var bugun = bugunIstanbul(), hepsi = Katalog.hepsi, self = this, i;
      this.listeGunu = bugun;
      this.ozelBaslik = null;
      if (this.katman === "gun") {
        // Şehrin takvimi: o gün Gün katmanı yalnız özel günün karelerini gösterir.
        for (i = 0; i < Katalog.ozelGunler.length; i++) {
          var o = Katalog.ozelGunler[i];
          if (o.gun === bugun || o.gun === bugun.slice(5)) {
            var liste = (o.kareler || []).map(bul).filter(Boolean);
            if (liste.length) { this.ozelBaslik = o.baslik; return liste; }
          }
        }
        // Mevsim: tarih aralığındaysa o mevsimin kareleri (en çok yarısı) öne çıkar; herkeste aynı sıra.
        var g = bugun.slice(5);
        for (i = 0; i < Katalog.mevsimler.length; i++) {
          var m = Katalog.mevsimler[i];
          var icinde = m.baslangic <= m.bitis ? (g >= m.baslangic && g <= m.bitis) : (g >= m.baslangic || g <= m.bitis);
          if (!icinde) continue;
          var normal = gununKareleri(hepsi, this.katman, bugun, Hava.simdiki);
          var sirali = (m.kareler || []).map(bul).filter(function (k) { return k && !k.dikey; }).sort(idSirasi);
          var kaydir = sirali.length ? yilinGunu() % sirali.length : 0;
          var l = sirali.slice(kaydir).concat(sirali.slice(0, kaydir)).slice(0, AYAR.gunlukKare / 2);
          normal.forEach(function (k) { if (l.length < AYAR.gunlukKare && l.indexOf(k) < 0) l.push(k); });
          this.ozelBaslik = m.ad;
          return l;
        }
      }
      return gununKareleri(hepsi, self.katman, bugun, Hava.simdiki);
    },

    /** Akış İstanbul saatine hizalı: tur = 12 kare × 4 dk + günün sonu 3 dk, gece yarısından sayılır. */
    akisKonumu: function () {
      var saniye = (simdi() + ISTANBUL_FARK) % 86400000;
      var kare = AYAR.kareSuresi, n = this.gun.length;
      var tur = n * kare + AYAR.sonuSuresi;
      var x = saniye % tur;
      if (x < n * kare) {
        var i = Math.floor(x / kare);
        return { sira: i, kalan: Math.max(1000, (i + 1) * kare - x) };
      }
      return { sira: null, kalan: Math.max(1000, tur - x) };
    },

    // ----- akış

    /** Yeni bir akış başlar: önceki zamanlayıcılar ve bekleyen görsel yüklemeleri geçersiz olur. */
    yeniKusak: function () { clearTimeout(this.akis); this.kusak++; return this.kusak; },

    akisiBaslat: function (acilisla) {
      var self = this, k = this.yeniKusak();
      if (acilisla !== false) {
        this.halYap("acilis");
        this.akis = setTimeout(function () { if (k === self.kusak) self.adim(k); }, AYAR.acilis);
      } else this.adim(k);
    },

    adim: function (k) {
      var self = this;
      if (k !== this.kusak) return;
      if (bugunIstanbul() !== this.listeGunu) this.gun = this.gununListesi();
      if (!this.gun.length) { this.akis = setTimeout(function () { self.adim(k); }, 60000); return; }
      var konum = this.akisKonumu();
      if (konum.sira !== null) {
        this.gerekirseGec(konum.sira, k).then(function (gecti) {
          if (!gecti || k !== self.kusak) return;
          self.akis = setTimeout(function () { self.adim(k); }, self.akisKonumu().kalan);
        });
      } else {
        if (this.hal !== "sonu") {
          this.halYap("sonu");
          Calar.duzeyAyarla(0.3);
          // Ekran saatlerce açık kalabilir: hava değiştiyse sonraki tur yeni havaya göre kurulur.
          var onceki = Hava.simdiki;
          Hava.guncelle().then(function () { if (Hava.simdiki !== onceki && k === self.kusak) self.gun = self.gununListesi(); });
        }
        this.akis = setTimeout(function () {
          if (k !== self.kusak) return;
          Calar.duzeyAyarla(1);
          self.adim(k);
        }, konum.kalan);
      }
    },

    gerekirseGec: function (i, k) {
      var self = this;
      if (!this.gun[i]) return Promise.resolve(false);
      if (this.hal === "kare" && this.gosterilenId === this.gun[i].id) return Promise.resolve(true);
      return Gorsel.hazirla(this.gun[i]).then(function () {
        if (k !== self.kusak || !self.gun[i]) return false;
        self.kareyeGec(i);
        // Sıradaki iki kareyi (üçlüleriyle) önceden indir.
        [i + 1, i + 2].forEach(function (j) { if (self.gun[j]) Gorsel.hazirla(self.gun[j]); });
        return true;
      });
    },

    /** Elle geçişte akış o kareden devam eder; liste bitince günün sonu, sonra açılıştan saate hizalı akış. */
    elleGit: function (i) {
      var self = this, k = this.yeniKusak();
      var j = Math.min(i, this.gun.length);
      function dongu() {
        if (k !== self.kusak) return;
        if (j >= self.gun.length) {
          self.halYap("sonu");
          Calar.duzeyAyarla(0.3);
          self.akis = setTimeout(function () {
            if (k !== self.kusak) return;
            Calar.duzeyAyarla(1);
            self.akisiBaslat();
          }, AYAR.sonuSuresi);
          return;
        }
        self.gerekirseGec(j, k).then(function (gecti) {
          if (!gecti || k !== self.kusak) return;
          self.akis = setTimeout(function () { j++; dongu(); }, AYAR.kareSuresi);
        });
      }
      dongu();
    },
    ileri: function () { if (this.gun.length) this.elleGit(this.hal === "sonu" ? 0 : (this.hal === "acilis" ? this.sira : this.sira + 1)); },
    geri: function () { if (this.gun.length) this.elleGit(Math.max(0, this.sira - (this.hal === "kare" ? 1 : 0))); },

    // ----- ekran

    halYap: function (h) {
      this.hal = h;
      $("acilis").className = "ekran" + (h === "acilis" ? " acik" : "");
      $("sonu").className = "ekran" + (h === "sonu" ? " acik" : "");
      if (h === "acilis") {
        var ad = this.katmanAdi(this.katman);
        $("acilisAlt").textContent = gunMetni() + " · " + (this.ozelBaslik || (this.katman === "gun" ? L("bugünün kareleri", "today's frames") : ad));
      }
      if (h !== "kare") { this.gosterilenId = null; $("kose").className = "sonuk"; }
    },

    kareyeGec: function (i) {
      var self = this, kare = this.gun[i];
      var ilkKare = this.hal !== "kare" || !this.koseKaresi;
      this.gosterilenId = kare.id;
      this.sira = i;
      clearTimeout(this.koseGorevi);
      $("kose").className = "sonuk";
      // Çapraz geçiş: arkadaki katmana yeni kareyi çiz, öne al.
      var yeniKat = this.onKatman === "A" ? "B" : "A";
      Gorsel.ciz($("kare" + yeniKat), kare);
      $("kare" + yeniKat).className = "kare acik";
      $("kare" + this.onKatman).className = "kare";
      this.onKatman = yeniKat;
      if (this.hal !== "kare") this.halYap("kare");
      this.radyoyuCal();
      this.koseGorevi = setTimeout(function () {
        self.koseKaresi = kare;
        self.koseyiYaz();
        if (self.koseAcik && self.hal === "kare" && !self.menuAcik) $("kose").className = "";
      }, ilkKare ? 0 : AYAR.gecis * 0.6);
      sayac++;
    },

    koseyiYaz: function () {
      var k = this.koseKaresi;
      if (!k) return;
      $("kSemt").textContent = k.semt || k.saat;
      $("kSarki").textContent = k.sarki ? L("o sırada çalan: ", "playing then: ") + k.sarki : "";
      $("kNot").textContent = k.not || "";
      $("kSaat").textContent = k.semt ? (k.fotografci ? k.saat + " · " + k.fotografci : k.saat) : "";
      $("kHava").textContent = oGunYazisi(k);
      $("kYil").textContent = (function () {
        var n = yilDonumu(k, bugunIstanbul());
        if (n === null) return "";
        return n === 1 ? L("bir yıl önce bugün", "a year ago today") : (TR ? n + " yıl önce bugün" : n + " years ago today");
      })();
      this.istanbulSaatiniYaz();
      this.hapiYaz();
      // Dikey kare (üçlüsü yoksa) ortada durur; yazı yandaki boşluğa sığsın.
      var yanda = k.dikey && ucluUyeleri(k, Katalog.hepsi).length < 3;
      $("koseMetin").className = yanda ? "yanda" : "";
      // OLED koruması: köşe yazısı her karede birkaç piksel kayar (yanık izi kalmasın).
      var kay = [[0, 0], [7, -5], [-6, 4], [5, 7], [-7, -4], [3, -7]][sayac % 6];
      var t = "translate(" + kay[0] + "px," + kay[1] + "px)";
      $("kose").style.webkitTransform = t; $("kose").style.transform = t;
    },

    istanbulSaatiniYaz: function () {
      // Cihaz İstanbul saatinde değilse köşede "İstanbul'da şimdi 21:04".
      var farkli = new Date().getTimezoneOffset() !== -180;
      $("kIstanbul").textContent = farkli ? L("İstanbul'da şimdi ", "now ") + istanbulSaat() + (TR ? "" : " in Istanbul") : "";
    },

    hapiYaz: function () {
      var r = Calar.calan && this.radyolar[Calar.calan];
      $("kHap").className = "hap" + (r ? "" : " gizli");
      if (!r) return;
      $("kRadyo").textContent = r.name;
      var s = this.sarki && this.sarki.slug === Calar.calan ? this.sarki.yazi : "";
      $("kSarkiHap").textContent = s;
      $("kAyrac").className = "ayrac" + (s ? "" : " gizli");
    },

    koseAcKapat: function () {
      this.koseAcik = !this.koseAcik;
      if (this.hal === "kare") $("kose").className = this.koseAcik ? "" : "sonuk";
    },

    // ----- katman menüsü

    katmanAdi: function (id) {
      if (!TR && KATMAN_EN[id]) return KATMAN_EN[id];
      for (var i = 0; i < Katalog.katmanlar.length; i++) if (Katalog.katmanlar[i].id === id) return Katalog.katmanlar[i].ad;
      return id;
    },

    menuSatirlari: function () {
      var self = this, satirlar = [];
      Katalog.acikKatmanlar().forEach(function (k) {
        var say = Katalog.hepsi.filter(function (x) { return x.katman === k.id; }).length;
        satirlar.push({ ad: self.katmanAdi(k.id), sag: say + (TR ? " kare" : " frames"), secili: k.id === self.katman, eylem: function () { self.katmanSec(k.id); } });
      });
      satirlar.push(null);
      satirlar.push({ ad: L("Ses", "Sound"), sag: Calar.sessiz ? L("Kapalı", "Off") : L("Açık", "On"), eylem: function () { Calar.sessizYap(!Calar.sessiz); self.menuyuCiz(); } });
      satirlar.push({ ad: L("Yer ve saat", "Place and time"), sag: self.koseAcik ? L("Açık", "On") : L("Kapalı", "Off"), eylem: function () { self.koseAcKapat(); self.menuyuCiz(); } });
      return satirlar;
    },

    menuyuCiz: function () {
      var kap = $("menuSatirlar"), self = this, n = 0;
      kap.innerHTML = "";
      this._satirlar = [];
      this.menuSatirlari().forEach(function (s) {
        if (!s) { var a = document.createElement("div"); a.className = "ayracCizgi"; kap.appendChild(a); return; }
        var d = document.createElement("div");
        var sira = n++;
        d.className = "satir" + (s.secili ? " secili" : "") + (sira === self.menuOdak ? " odak" : "");
        d.innerHTML = '<i class="secim"></i><span class="ad"></span><span class="sag"></span>';
        d.querySelector(".ad").textContent = s.ad;
        d.querySelector(".sag").textContent = s.sag;
        d.addEventListener("click", function () { self.menuOdak = sira; s.eylem(); });
        d.addEventListener("mousemove", function () { if (self.menuOdak !== sira) { self.menuOdak = sira; self.odakCiz(); } });
        kap.appendChild(d);
        self._satirlar.push({ el: d, s: s });
      });
    },
    odakCiz: function () {
      var self = this;
      this._satirlar.forEach(function (x, i) { x.el.className = "satir" + (x.s.secili ? " secili" : "") + (i === self.menuOdak ? " odak" : ""); });
    },
    menuyuAc: function () {
      var acik = Katalog.acikKatmanlar(), self = this;
      this.menuOdak = 0;
      for (var i = 0; i < acik.length; i++) if (acik[i].id === self.katman) this.menuOdak = i;
      this.menuyuCiz();
      this.menuAcik = true;
      $("menu").className = "acik"; $("menu").setAttribute("aria-hidden", "false");
      $("kose").className = "sonuk";
    },
    menuyuKapat: function () {
      this.menuAcik = false;
      $("menu").className = ""; $("menu").setAttribute("aria-hidden", "true");
      if (this.hal === "kare" && this.koseAcik) $("kose").className = "";
    },
    menuyuKaydir: function (d) {
      var n = this._satirlar.length;
      this.menuOdak = Math.max(0, Math.min(n - 1, this.menuOdak + d));
      this.odakCiz();
    },

    /** Katman seçilince galeri o katmanın bugünkü kareleriyle açılıştan yeniden başlar. */
    katmanSec: function (id) {
      this.menuyuKapat();
      if (id === this.katman) return;
      this.katman = id;
      depoYaz("frameby.katman", id);
      this.gun = this.gununListesi();
      this.sira = 0;
      this.akisiBaslat();
      if (this.gun[0]) Gorsel.hazirla(this.gun[0]);
    },

    // ----- radyo

    radyolariAl: function () {
      var self = this;
      return istek(VERITABANI + "/stations?select=slug,name,stream_url&app_izinli=eq.true&is_active=eq.true", { apikey: ANAHTAR }, 15000)
        .then(function (liste) {
          var r = {};
          // HLS (.m3u8) yayınlar webOS'ta yerleşik çalar; çalamayan motorda (masaüstü Chrome vb.) listeye hiç girmez,
          // o karede çalan radyo sürer ya da başka bir radyo seçilir (iOS'ta listede olmayan radyodaki davranış).
          var hls = !!$("sesA").canPlayType("application/vnd.apple.mpegurl");
          liste.forEach(function (x) {
            var u = x.stream_url || "";
            if (Katalog.disarida[x.slug] || !/^https:\/\//.test(u)) return;
            if (!hls && /\.m3u8(\?|$)/i.test(u)) return;
            r[x.slug] = x;
          });
          self.radyolar = r;
          if (self.hal === "kare") self.radyoyuCal();
        })
        .catch(function () {
          // Liste gelmedi: bir dakika sonra yeniden dene.
          setTimeout(function () { self.radyolariAl(); }, 60000);
        });
    },

    radyoyuCal: function () {
      var k = this.gun[this.sira];
      if (!k) return;
      var r = this.radyolar[k.radyo] || (Calar.calan && this.radyolar[Calar.calan]) || this.herhangiRadyo();
      if (!r) return;
      Calar.cal(r.slug, r.stream_url);
      this.sarkiyiIzle(r.slug);
      this.hapiYaz();
    },
    herhangiRadyo: function (disinda) {
      var adaylar = [];
      for (var s in this.radyolar) if (s !== disinda) adaylar.push(this.radyolar[s]);
      return adaylar.length ? adaylar[Math.floor(Math.random() * adaylar.length)] : null;
    },
    yedegeGec: function (dusen) {
      var y = this.herhangiRadyo(dusen);
      if (!y) return;
      Calar.cal(y.slug, y.stream_url);
      this.sarkiyiIzle(y.slug);
      this.hapiYaz();
    },

    /** Yalnız çalan radyonun şarkısı, dakikada bir. meta_gizli radyoda şarkı adı gösterilmez. */
    sarkiyiIzle: function (slug) {
      var self = this;
      if (this._izlenen === slug) return;
      this._izlenen = slug;
      clearInterval(this.sarkiGorevi);
      function al() {
        istek(VERITABANI + "/stations?select=meta_gizli,now_playing(artist,title)&slug=eq." + encodeURIComponent(slug), { apikey: ANAHTAR }, 10000)
          .then(function (l) {
            var r = l && l[0];
            if (!r || self._izlenen !== slug) return;
            var np = r.now_playing;
            if (np && np.length !== undefined) np = np[0];
            if (r.meta_gizli || !np || !np.title) self.sarki = null;
            else self.sarki = { slug: slug, yazi: [np.artist, np.title].filter(function (x) { return x; }).join(" · ") };
            self.hapiYaz();
          }).catch(function () {});
      }
      al();
      this.sarkiGorevi = setInterval(al, 60000);
    }
  };
  var sayac = 0;

  function oGunYazisi(k) {
    if (k.sicaklik === undefined || k.sicaklik === null) return "";
    var adlar = { N: ["yıldız", "north wind"], NE: ["poyraz", "north-east wind"], E: ["gündoğusu", "east wind"], SE: ["keşişleme", "south-east wind"], S: ["kıble", "south wind"], SW: ["lodos", "south-west wind"], W: ["günbatısı", "west wind"], NW: ["karayel", "north-west wind"] };
    var a = k.ruzgar && adlar[k.ruzgar];
    return k.sicaklik + "°" + (a ? " · " + L(a[0], a[1]) : "");
  }

  // ---------------------------------------------------------------- Görseller

  var Gorsel = {
    hazir: {}, bekleyen: {},
    /** Görseli (üçlüyse üç üyesini) indirir; en çok 20 sn bekler, gelmezse kare yine gösterilir. */
    hazirla: function (kare) {
      var self = this;
      var uyeler = ucluUyeleri(kare, Katalog.hepsi);
      return Promise.all(uyeler.map(function (u) { return self.tek(u); }));
    },
    tek: function (k) {
      var self = this;
      if (this.hazir[k.id]) return Promise.resolve(true);
      if (this.bekleyen[k.id]) return this.bekleyen[k.id];
      var p = new Promise(function (coz) {
        var img = new Image(), bitti = false;
        function son(ok) { if (bitti) return; bitti = true; if (ok) self.hazir[k.id] = img; delete self.bekleyen[k.id]; coz(ok); }
        img.onload = function () { son(true); };
        img.onerror = function () { son(false); };
        setTimeout(function () { son(false); }, 20000);
        img.src = Katalog.gorselAdresi(k);
      });
      this.bekleyen[k.id] = p;
      // Bellek: TV'de en çok ~10 çözülmüş görsel tutulur.
      var ids = Object.keys(this.hazir);
      if (ids.length > 10) ids.slice(0, ids.length - 10).forEach(function (id) { delete self.hazir[id]; });
      return p;
    },
    ciz: function (kap, kare) {
      kap.innerHTML = "";
      var uclu = ucluUyeleri(kare, Katalog.hepsi);
      function arkaPlan(el, k) { el.style.backgroundImage = 'url("' + Katalog.gorselAdresi(k) + '")'; return el; }
      function div(c) { var d = document.createElement("div"); d.className = c; return d; }
      if (kare.dikey && uclu.length === 3) {
        // Bağlantılı üç dikey kare yan yana (aralarında 6 px).
        var ara = 6, en = (1920 - 2 * ara) / 3;
        uclu.forEach(function (u, i) {
          var d = arkaPlan(div("uclu"), u);
          d.style.left = (i * (en + ara)) + "px"; d.style.width = en + "px";
          kap.appendChild(d);
        });
      } else if (kare.dikey) {
        // Tek dikey kare: bütün görünür, arkasını kendi sönük hâli doldurur.
        kap.appendChild(arkaPlan(div("arka"), kare));
        kap.appendChild(arkaPlan(div("sigdir"), kare));
      } else {
        kap.appendChild(arkaPlan(div("tam"), kare));
      }
    }
  };

  // ---------------------------------------------------------------- Ekran: ölçek, uyanıklık, gece, ipucu

  function olcekle() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    var x = (window.innerWidth - 1920 * s) / 2, y = (window.innerHeight - 1080 * s) / 2;
    var t = s === 1 ? "none" : "translate(" + x + "px," + y + "px) scale(" + s + ")";
    $("sahne").style.webkitTransform = t; $("sahne").style.transform = t;
  }

  /** Ekran uyanık kalsın. webOS: appinfo.json'da galeri ekran koruyucusu (Type 3, OLED'de 30 dk ve
   *  Galeri resim modu); Screen Wake Lock destekleyen motorlarda (webOS 22+, tarayıcı) ayrıca kilit. */
  var uyanikKilit = null;
  function uyanikTut() {
    if (!navigator.wakeLock || document.hidden) return;
    navigator.wakeLock.request("screen").then(function (k) { uyanikKilit = k; }).catch(function () {});
  }

  function geceyiDenetle() {
    var gece = new Date().getHours() < 6;
    $("gece").className = gece ? "acik" : "";
  }

  var bildirimZamani = null;
  function bildir(m) {
    $("bildirim").textContent = m;
    $("bildirim").className = "ipucu bildirim acik";
    clearTimeout(bildirimZamani);
    bildirimZamani = setTimeout(function () { $("bildirim").className = "ipucu bildirim"; }, 4000);
  }

  function ipucu() {
    var n = +(depoOku("frameby.acilis") || 0);
    depoYaz("frameby.acilis", n + 1);
    if (n >= 3) return;
    $("ipucu").textContent = L("▾ menü  ·  ◂ ▸ kareler  ·  ▴ yer ve saat", "▾ menu  ·  ◂ ▸ frames  ·  ▴ place and time");
    setTimeout(function () { $("ipucu").className = "ipucu acik"; }, AYAR.acilis + 1500);
    setTimeout(function () { $("ipucu").className = "ipucu"; }, AYAR.acilis + 11500);
  }

  // ---------------------------------------------------------------- Kumanda

  var TUS = { SOL: 37, YUKARI: 38, SAG: 39, ASAGI: 40, TAMAM: 13, GERI: 461, BACKSPACE: 8, ESC: 27,
    OYNAT: 415, DURAKLAT: 19, OYNAT_DURAKLAT: 179, DURDUR: 413, BOSLUK: 32 };

  function cik() {
    // webOS: sistemin "geri" davranışı (ana ekrana döner). Tarayıcıda yalnız bildirir.
    if (window.PalmSystem && window.PalmSystem.platformBack) { window.PalmSystem.platformBack(); return; }
    bildir(L("Geri: TV'de uygulamadan çıkar", "Back: exits the app on the TV"));
  }

  function tus(e) {
    var k = e.keyCode;
    Calar.izinVerildi();
    if (G.menuAcik) {
      if (k === TUS.YUKARI) G.menuyuKaydir(-1);
      else if (k === TUS.ASAGI) G.menuyuKaydir(1);
      else if (k === TUS.TAMAM || k === TUS.BOSLUK) { var s = G._satirlar[G.menuOdak]; if (s) s.s.eylem(); }
      else if (k === TUS.GERI || k === TUS.BACKSPACE || k === TUS.ESC || k === TUS.SOL) G.menuyuKapat();
      else return;
      e.preventDefault();
      return;
    }
    if (k === TUS.SAG) G.ileri();
    else if (k === TUS.SOL) G.geri();
    else if (k === TUS.ASAGI) G.menuyuAc();
    else if (k === TUS.YUKARI || k === TUS.TAMAM) G.koseAcKapat();
    else if (k === TUS.OYNAT || k === TUS.DURAKLAT || k === TUS.OYNAT_DURAKLAT || k === TUS.DURDUR || k === TUS.BOSLUK) {
      Calar.sessizYap(!Calar.sessiz);
      bildir(Calar.sessiz ? L("Ses kapalı", "Sound off") : L("Ses açık", "Sound on"));
    }
    else if (k === TUS.GERI || k === TUS.BACKSPACE || k === TUS.ESC) cik();
    else return;
    e.preventDefault();
  }

  // ---------------------------------------------------------------- Başlangıç

  function basla() {
    olcekle();
    window.addEventListener("resize", olcekle);
    document.addEventListener("keydown", tus);
    document.addEventListener("click", function () { Calar.izinVerildi(); });
    $("imza").addEventListener("click", function () { G.menuyuAc(); });
    $("menuPerde").addEventListener("click", function () { G.menuyuKapat(); });
    $("sonuBaslik").textContent = L("Bugünlük bu kadar.\nYarın yeni kareler.", "That's all for today.\nNew frames tomorrow.");
    $("sonuAlt").textContent = L("Baştan başlıyor.", "Starting over.");
    $("menuEtiket").textContent = L("KATMANLAR", "LAYERS");
    $("menuAlt").textContent = L("Ses her zaman o radyonun canlı yayını.\nby. atölyesi · Berkay Doğan", "Sound is always the station's live broadcast.\nby. workshop · Berkay Doğan");
    $("acilisAlt").textContent = gunMetni();

    Calar.kur();
    Calar.susunca = function (slug) { G.yedegeGec(slug); };
    geceyiDenetle();
    setInterval(geceyiDenetle, 60000);
    setInterval(function () { if (G.hal === "kare") G.istanbulSaatiniYaz(); }, 30000);
    uyanikTut();
    ipucu();

    // Arka plana alınınca (webOS'ta Ana ekran tuşu) radyo durur; dönünce akış saate yeniden hizalanır.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { G.yeniKusak(); Calar.durdur(); G._izlenen = null; clearInterval(G.sarkiGorevi); }
      else { uyanikTut(); G.hal = "acilis"; G.akisiBaslat(false); }
    });

    var acilisBitti = bekle(AYAR.acilis);
    // Açılış ekranındayken: katalog ve hava (en çok 3 sn), sonra radyolar ve günün ilk karesi.
    Promise.all([Katalog.yukle(), Hava.guncelle(3000)]).then(function () {
      var acik = Katalog.acikKatmanlar().map(function (k) { return k.id; });
      var istenen = Q.katman || depoOku("frameby.katman") || "gun";
      G.katman = acik.indexOf(istenen) >= 0 ? istenen : (acik[0] || "gun");
      G.gun = G.gununListesi();
      G.halYap("acilis");
      G.radyolariAl();
      var ilk = G.akisKonumu().sira;
      if (ilk !== null && G.gun[ilk]) Gorsel.hazirla(G.gun[ilk]);
      return acilisBitti;
    }).then(function () { G.akisiBaslat(false); });

    // Deneme ve hata ayıklama için (tarayıcı konsolu / webOS inspector).
    window.frameby = { G: G, Calar: Calar, Katalog: Katalog, gununKareleri: gununKareleri };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", basla);
  else basla();
})();
