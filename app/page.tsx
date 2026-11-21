/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { WebSiteSchema, PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";
import { KITAPLAR } from "@/lib/kitaplar";
import { site, EMAIL, YOUTUBE_URL, INSTAGRAM_URL, SUBSTACK_URL, REVIEWS } from "@/lib/site";
import { BASIN, EKRAN } from "@/lib/basinda";
import { YAYINDA } from "@/lib/yazilar";
import { menuGruplari, arsivBaglantilari } from "@/lib/menu";
import { KARELER } from "@/lib/goruntu";
import { TemaDugmesi } from "@/components/TemaDugmesi";
import { Bugun } from "@/components/anasayfa/Bugun";
import s from "@/components/anasayfa/gazete.module.css";

// hreflang çifti: Türkçe ana sayfa ↔ İngilizce sayfa (/en/).
// alternates sığ birleşir — layout'taki RSS bağlantısı burada yeniden verilir.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Berkay Doğan — Yazılar" }] },
  },
};

/* Gazete ana sayfası. Bütün metinler sitenin mevcut kaynaklarından gelir:
   lib/site (biyografi, okur yorumları), lib/kitaplar (künye, arka kapak, alıntılar),
   lib/basinda (basın ve ekran), lib/yazilar (yazılar), lib/goruntu (fotoğraf ve dize).
   Yeni metin yazılmaz; dize yalnız yayımlanmış satırlardan. */

const t = site.tr;
const AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
function tarih(iso: string, sadeceAy = false) {
  const [y, m, d] = iso.split("-").map(Number);
  return sadeceAy || !d ? `${AY[m - 1]} ${y}` : `${d} ${AY[m - 1]} ${y}`;
}
const dis = { target: "_blank", rel: "noopener noreferrer" } as const;
const kare = KARELER.find((k) => k.no === "0323")!;

export default function Page() {
  const [tasfiye, murekkep] = KITAPLAR;
  const sayfa = (k: typeof tasfiye) => k.kunye.find((x) => x.k === "Sayfa")?.v;
  const yazilar = [...YAYINDA].sort((a, b) => b.dateISO.localeCompare(a.dateISO)).slice(0, 3);
  const basin = [
    ...BASIN.map((b) => ({ iso: b.tarihISO, yayin: b.yayin, baslik: b.baslik.tr, url: b.url, ay: !!b.sadeceAy })),
    ...EKRAN.map((e) => ({ iso: e.tarihISO, yayin: e.kanal, baslik: e.baslik, url: e.link ?? "/video/", ay: false })),
  ].sort((a, b) => b.iso.localeCompare(a.iso)).slice(0, 6);
  const okurlar = REVIEWS.slice(1, 4);
  const arsiv = arsivBaglantilari("tr");

  return (
    <>
      <WebSiteSchema />
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />

      <div className={`${s.sayfa} gz-ana`} id="top">
        <div className={s.ust}>
          <span className={s.yer}><b>İstanbul</b><Bugun /></span>
          <span className={s.ustSag}>
            <b>Türkçe</b>
            <a href="/en/" lang="en" hrefLang="en">English</a>
            <TemaDugmesi lang="tr" />
          </span>
        </div>

        <header className={s.kafa}>
          <h1>Berkay Doğan</h1>
          <p>Şair ve yazar. {murekkep.ad} ({murekkep.cikis}), {tasfiye.ad} (2026).</p>
        </header>

        <nav className={s.menu} aria-label="Ana menü">
          {menuGruplari("tr")[0].linkler.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
        </nav>

        <main className={s.izgara}>
          <section aria-labelledby="yazilar-baslik">
            <h2 id="yazilar-baslik" className={s.kunye}>Yazılar</h2>
            {yazilar.map((y) => (
              <article key={y.slug} className={s.yazi}>
                <h3><Link href={`/yazilar/${y.slug}/`}>{y.title}</Link></h3>
                <p>{y.dek}</p>
                <time className={s.zaman} dateTime={y.dateISO}>{tarih(y.dateISO)}</time>
              </article>
            ))}
            <p className={s.devam}><Link href="/yazilar/">Bütün yazılar</Link></p>
          </section>

          <article className={s.manset} aria-labelledby="manset-baslik">
            <p className={s.kunye}><span>Yeni kitap · {tasfiye.tur}</span></p>
            {/* Başlık Tasfiye'nin arka kapak metninden (lib/kitaplar arkaKapak[0]). */}
            <h2 id="manset-baslik"><Link href={`/kitaplar/${tasfiye.slug}/`}>Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi.</Link></h2>
            <p className={s.ozet}>{tasfiye.ad}: {tasfiye.altBaslik}. İskenderiye Yayınları, {tasfiye.cikis}.</p>
            <div className={s.govde}>
              <figure>
                <Link href={`/kitaplar/${tasfiye.slug}/`}>
                  <img src={tasfiye.kapak} srcSet={`${tasfiye.kapak400} 400w, ${tasfiye.kapak} ${tasfiye.kapakW}w`} sizes="(max-width: 960px) 230px, 220px" alt={`${tasfiye.ad} kapağı`} />
                </Link>
                <figcaption>{tasfiye.ad}, {sayfa(tasfiye)} sayfa</figcaption>
              </figure>
              <div>
                <p className={s.ilkHarf}>{tasfiye.arkaKapak[0]}</p>
                <p className={s.devam}>
                  <Link href={`/kitaplar/${tasfiye.slug}/`}>Kitap sayfası</Link>
                  <a href="/git/trendyol/" {...dis}>Satın al</a>
                  <Link href="/film/">Kısa filmi izle</Link>
                </p>
                <p className={s.alinti}>“{tasfiye.alintilar[2].text}”<span>{tasfiye.ad}, {tasfiye.alintilar[2].sayfa.toLowerCase()}</span></p>
              </div>
            </div>
          </article>

          <section className={s.basin} aria-labelledby="basin-baslik">
            <h2 id="basin-baslik" className={s.kunye}>Basında</h2>
            <ul>
              {basin.map((b) => {
                const disari = b.url.startsWith("http");
                return (
                  <li key={b.url + b.baslik}>
                    <b>{b.yayin} · <time dateTime={b.iso}>{tarih(b.iso, b.ay)}</time></b>
                    <a href={b.url} {...(disari ? dis : {})}>{b.baslik}</a>
                  </li>
                );
              })}
            </ul>
            <p className={s.devam}><Link href="/press/">Basın odası</Link></p>
          </section>
        </main>

        <section className={s.serit} aria-label="Mürekkep ve Köz ve uygulamalar">
          <figure>
            <img src={`/goruntu/${kare.no}.jpg`} alt="İstanbul; Berkay Doğan'ın fotoğrafı" width={kare.w} height={kare.h} loading="lazy" />
            <figcaption className={s.resimAlti}><i>“{kare.s}”</i> {murekkep.ad}, s. {kare.p}. Fotoğraf: Berkay Doğan</figcaption>
          </figure>
          <div>
            <div className={s.kutu}>
              <p className={s.kunye}><span>İlk kitap · {murekkep.tur}</span></p>
              <h3><Link href={`/kitaplar/${murekkep.slug}/`}>{murekkep.ad}</Link></h3>
              <p>{t.books.murekkep.desc}</p>
              <p className={s.okur}>“{REVIEWS[0].text}” <span className={s.kaynak}>Okur, {REVIEWS[0].source}</span></p>
              <p className={s.devam}><Link href={`/kitaplar/${murekkep.slug}/`}>Kitap sayfası</Link><a href="/git/mvk-trendyol/" {...dis}>Satın al</a></p>
            </div>
            <div className={s.kutu}>
              <p className={s.kunye}><span>by. atölyesi</span><Link href="/by/">Uygulamalar</Link></p>
              {/* İki cümle de Hakkımda metninden (lib/site about.paras[4]). */}
              <p><Link href="/hereby/"><b>hereby.</b></Link> Bir yerde aklından geçen satırı oraya bırakmanı sağlıyor; o satırı yalnızca oraya gelen okuyabiliyor.</p>
              <p><Link href="/nowby/"><b>nowby.</b></Link> Yayınlarının paylaşılmasına izin veren radyolarda o an çalan şarkıları tek ekranda gösteriyor.</p>
            </div>
          </div>
        </section>

        <section className={s.yazar} aria-labelledby="yazar-baslik">
          <figure>
            <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="200px" alt="Berkay Doğan portresi" width={600} height={750} loading="lazy" />
            <figcaption className={s.resimAlti}>Berkay Doğan</figcaption>
          </figure>
          <div>
            <p className={s.kunye}><span>Yazar</span></p>
            <h2 id="yazar-baslik">{t.about.paras[0]}</h2>
            <p>{t.about.paras[1]}</p>
            <p className={s.devam}><Link href="/hakkimda/">Hakkımda</Link><Link href="/ogrenciler/">Öğrenciler için</Link></p>
          </div>
          <div className={s.okurlar}>
            <p className={s.kunye}><span>Okurlardan</span></p>
            {okurlar.map((r) => (
              <blockquote key={r.text}>
                “{r.text}”
                <footer className={s.kaynak}>{r.kitap} · {r.source}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <footer className={s.alt} id="contact">
          <div className={s.altUst}>
            <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span className={s.sosyal}>
              <a href={INSTAGRAM_URL} {...dis}>Instagram</a>
              <a href={YOUTUBE_URL} {...dis}>YouTube</a>
              <a href={SUBSTACK_URL} {...dis}>Substack</a>
              <a href="/en/" lang="en" hrefLang="en">English</a>
            </span>
          </div>
          <nav className={s.arsiv} aria-label="Arşiv">
            <b style={{ color: "var(--murekkep)", fontWeight: 600, marginRight: 10 }}>Arşiv</b>
            {arsiv.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
          </nav>
          <p className={s.telif}>© 2026 Berkay Doğan · İstanbul</p>
        </footer>
      </div>
    </>
  );
}
