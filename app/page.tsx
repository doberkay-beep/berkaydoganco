/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { WebSiteSchema, PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";
import { KITAPLAR } from "@/lib/kitaplar";
import { site, EMAIL, YOUTUBE_URL, INSTAGRAM_URL, SUBSTACK_URL } from "@/lib/site";
import { BASIN } from "@/lib/basinda";
import { YAYINDA } from "@/lib/yazilar";
import { menuGruplari } from "@/lib/menu";
import { KARELER } from "@/lib/goruntu";
import { TemaDugmesi } from "@/components/TemaDugmesi";
import { GununKaresi, type GunKaresi } from "@/components/anasayfa/GununKaresi";
import s from "@/components/anasayfa/ilkSayfa.module.css";

// hreflang çifti: Türkçe ana sayfa ↔ İngilizce sayfa (/en/).
// alternates sığ birleşir — layout'taki RSS bağlantısı burada yeniden verilir.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Berkay Doğan — Yazılar" }] },
  },
};

/* "İlk sayfa" (taslak, 24 Kas): bir kitabın iç kapağı gibi. Önce bir dize, sonra ad, sonra kitaplar.
   Bütün metinler sitenin mevcut kaynaklarından: lib/sozler (yayımlanmış, doğrulanmış dizeler),
   lib/kitaplar, lib/site (Hakkımda), lib/yazilar, lib/basinda. Yeni metin yazılmaz. */

const t = site.tr;
const AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
function tarih(iso: string, sadeceAy = false) {
  const [y, m, d] = iso.split("-").map(Number);
  return sadeceAy || !d ? `${AY[m - 1]} ${y}` : `${d} ${AY[m - 1]} ${y}`;
}
const dis = { target: "_blank", rel: "noopener noreferrer" } as const;
const KITAP_ADI = { mvk: "Mürekkep ve Köz", tas: "Tasfiye" } as const;

// Açılış: Berkay'ın kendi fotoğrafları ve yanlarındaki doğrulanmış dizeler (lib/goruntu).
const kaynak = (k: (typeof KARELER)[number]) => `${KITAP_ADI[k.k]}${k.p ? `, s. ${k.p}` : ""}`;
const KARELER_GUN: GunKaresi[] = KARELER.map((k) => ({ no: k.no, w: k.w, h: k.h, s: k.s, kaynak: kaynak(k) }));
const ILK = KARELER_GUN.find((k) => k.no === "0323")!;

// Şerit: açılıştakinden farklı, kısa dizeli üç kare (sabit; sayfa her gün aynı üçlüyü göstermesin diye açılış döner).
const SERIT = KARELER_GUN.filter((k) => ["0219", "0734", "0254"].includes(k.no));

export default function Page() {
  const [tasfiye, murekkep] = KITAPLAR;
  const yazilar = [...YAYINDA].sort((a, b) => b.dateISO.localeCompare(a.dateISO)).slice(0, 3);
  const sonBasin = [...BASIN].sort((a, b) => b.tarihISO.localeCompare(a.tarihISO))[0];
  const menu = menuGruplari("tr")[0].linkler;

  return (
    <>
      <WebSiteSchema />
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />

      {/* gz-ana: layout'taki genel üst çubuğu gizler (gazete.css); bu sayfanın kendi satırı var. */}
      <div className={`${s.sayfa} gz-ana`} id="top">
        <header className={s.ust}>
          <Link href="/" className={s.marka}>Berkay Doğan</Link>
          <nav className={s.menu} aria-label="Ana menü">
            {menu.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
          </nav>
          <span className={s.sag}>
            <b>Türkçe</b>
            <a href="/en/" lang="en" hrefLang="en">English</a>
            <TemaDugmesi lang="tr" className="tema-dugme" />
          </span>
        </header>

        <section className={s.acilis} aria-label="Günün fotoğrafı ve dizesi">
          <GununKaresi
            kareler={KARELER_GUN}
            ilk={ILK}
            imza={<p className={s.imza}><b>Berkay Doğan<span className={s.nokta} aria-hidden /></b>Şair ve yazar. İstanbul.</p>}
          />
        </section>

        <main>
          <section className={s.bolum} aria-labelledby="kitaplar-baslik">
            <h2 id="kitaplar-baslik" className={s.etiket}>Kitaplar</h2>
            <div className={s.kitaplar}>
              {[tasfiye, murekkep].map((k) => {
                const a = k.slug === tasfiye.slug ? k.alintilar[2] : null;
                return (
                  <article key={k.slug} className={s.kitap}>
                    <Link href={`/kitaplar/${k.slug}/`}>
                      <img src={k.kapak} srcSet={`${k.kapak400} 400w, ${k.kapak} ${k.kapakW}w`} sizes="(max-width: 860px) 240px, 340px" alt={`${k.ad} kapağı`} loading="lazy" />
                    </Link>
                    <h2><Link href={`/kitaplar/${k.slug}/`}>{k.ad}</Link></h2>
                    <p className={s.tur}>{k.tur} · {k.altBaslik} · İskenderiye Yayınları, {k.cikis}</p>
                    <p className={s.alinti}>“{a ? a.text : t.books.murekkep.excerpt}”</p>
                    <p className={s.baglar}>
                      <Link href={`/kitaplar/${k.slug}/`}>Kitap sayfası</Link>
                      <a href={k.slug === tasfiye.slug ? "/git/trendyol/" : "/git/mvk-trendyol/"} {...dis}>Satın al</a>
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={s.bolum} aria-labelledby="goruntu-baslik">
            <h2 id="goruntu-baslik" className={s.etiket}>Görüntü ve dize</h2>
            <div className={s.serit}>
              {SERIT.map((k) => (
                <figure key={k.no}>
                  <Link href="/goruntu/"><img src={`/goruntu/${k.no}.jpg`} alt="Berkay Doğan'ın fotoğrafı" width={k.w} height={k.h} loading="lazy" /></Link>
                  <figcaption>“{k.s}”<span>{k.kaynak}</span></figcaption>
                </figure>
              ))}
            </div>
            <p className={s.tumu}><Link href="/goruntu/">Bütün fotoğraflar</Link></p>
          </section>

          <section className={s.bolum} aria-labelledby="yazar-baslik">
            <h2 id="yazar-baslik" className={s.etiket}>Yazar</h2>
            <div className={s.yazar}>
              <div>
                <p className={s.giris}>{t.about.paras[0]}</p>
                <p>{t.about.paras[1]}</p>
                <p className={s.baglar}><Link href="/hakkimda/">Hakkımda</Link><Link href="/ogrenciler/">Öğrenciler için</Link></p>
              </div>
              <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="(max-width: 860px) 260px, 400px" alt="Berkay Doğan portresi" width={600} height={750} loading="lazy" />
            </div>
          </section>

          <section className={s.bolum} aria-labelledby="yazilar-baslik">
            <h2 id="yazilar-baslik" className={s.etiket}>Yazılar</h2>
            <ul className={s.liste}>
              {yazilar.map((y) => (
                <li key={y.slug}>
                  <Link href={`/yazilar/${y.slug}/`}>{y.title}</Link>
                  <time dateTime={y.dateISO}>{tarih(y.dateISO)}</time>
                </li>
              ))}
            </ul>
            <p className={s.tumu}><Link href="/yazilar/">Bütün yazılar</Link></p>
          </section>

          <section className={s.bolum} aria-label="Basın ve atölye">
            <div className={s.satirlar}>
              <p>
                <b>Basında</b>
                <a href={sonBasin.url} {...(sonBasin.url.startsWith("http") ? dis : {})}>{sonBasin.yayin}: {sonBasin.baslik.tr}</a>
                {" · "}<Link href="/press/">Basın odası</Link>
              </p>
              {/* İki cümle de Hakkımda metninden (lib/site about.paras[4]). */}
              <p><b>by. atölyesi</b><Link href="/hereby/">hereby.</Link> Bir yerde aklından geçen satırı oraya bırakmanı sağlıyor; o satırı yalnızca oraya gelen okuyabiliyor.</p>
              <p><b>&nbsp;</b><Link href="/nowby/">nowby.</Link> Yayınlarının paylaşılmasına izin veren radyolarda o an çalan şarkıları tek ekranda gösteriyor.</p>
            </div>
          </section>
        </main>

        <footer className={s.alt} id="contact">
          <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>
            <a href={INSTAGRAM_URL} {...dis}>Instagram</a>
            <a href={YOUTUBE_URL} {...dis}>YouTube</a>
            <a href={SUBSTACK_URL} {...dis}>Substack</a>
            <a href="/en/" lang="en" hrefLang="en">English</a>
            <span>© 2026 · İstanbul</span>
          </span>
        </footer>
      </div>
    </>
  );
}
