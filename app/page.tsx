/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { WebSiteSchema, PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";
import { KITAPLAR } from "@/lib/kitaplar";
import { site, EMAIL, YOUTUBE_URL, INSTAGRAM_URL, SUBSTACK_URL } from "@/lib/site";
import { BASIN, BASIN_TUR, EKRAN } from "@/lib/basinda";
import { YAYINDA } from "@/lib/yazilar";
import { menuGruplari } from "@/lib/menu";
import { KARELER } from "@/lib/goruntu";
import s from "@/components/anasayfa/noir.module.css";

// hreflang çifti: Türkçe ana sayfa ↔ İngilizce tanıtım sayfası (/en/).
// alternates sığ birleşir — layout'taki RSS bağlantısı burada yeniden verilir.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Berkay Doğan — Yazılar" }] },
  },
};

/* Yazar-noir ana sayfa. Bütün metinler sitenin mevcut kaynaklarından gelir:
   lib/site (biyografi), lib/kitaplar (künye, arka kapak, alıntılar), lib/basinda (basın),
   lib/yazilar (yazılar). Dize yalnız yayımlanmış satırlardan. */

const t = site.tr;
const acilisKare = KARELER.find((k) => k.no === "0334")!;
const AY = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
function tarih(iso: string, sadeceAy = false) {
  const [y, m, d] = iso.split("-").map(Number);
  return sadeceAy || !d ? `${AY[m - 1]} ${y}` : `${d} ${AY[m - 1]} ${y}`;
}
const no = (i: number) => String(i).padStart(2, "0");
const dis = { target: "_blank", rel: "noopener noreferrer" } as const;

type Satir = { iso: string; tarih: string; ad: string; alt?: string; tur: string; href: string };

export default function Page() {
  const [tasfiye, murekkep] = KITAPLAR;
  const kitaplar = [
    { k: tasfiye, satin: "/git/trendyol/", alinti: tasfiye.alintilar[2], yil: "2026" },
    { k: murekkep, satin: "/git/mvk-trendyol/", alinti: murekkep.epigraf ? { text: murekkep.epigraf, sayfa: "Epigraf" } : undefined, yil: "2025" },
  ];

  const dizin: { baslik: string; tum?: { href: string; ad: string }; satirlar: Satir[] }[] = [
    {
      baslik: "Kitaplar",
      tum: { href: "/kitaplar/", ad: "Kitaplar" },
      satirlar: KITAPLAR.map((k) => ({
        iso: k.datePublished, tarih: k.cikis, ad: k.ad, alt: k.altBaslik, tur: `${k.tur} · İskenderiye Yayınları`, href: `/kitaplar/${k.slug}/`,
      })),
    },
    {
      baslik: "Yazılar",
      tum: { href: "/yazilar/", ad: "Bütün yazılar" },
      satirlar: [...YAYINDA].sort((a, b) => b.dateISO.localeCompare(a.dateISO)).map((y) => ({
        iso: y.dateISO, tarih: tarih(y.dateISO), ad: y.title, alt: y.dek, tur: "Yazı", href: `/yazilar/${y.slug}/`,
      })),
    },
    {
      baslik: "Basında",
      tum: { href: "/press/", ad: "Basın odası" },
      satirlar: BASIN.map((b) => ({
        iso: b.tarihISO, tarih: tarih(b.tarihISO, b.sadeceAy), ad: b.yayin, alt: b.baslik.tr, tur: BASIN_TUR[b.tur].tr, href: b.url,
      })),
    },
    {
      baslik: "Ekran",
      tum: { href: "/video/", ad: "İzle & Dinle" },
      satirlar: EKRAN.map((e) => ({
        iso: e.tarihISO, tarih: tarih(e.tarihISO), ad: e.kanal, alt: e.baslik, tur: e.tur === "tv" ? "Televizyon" : e.tur === "podcast" ? "Podcast" : "Video", href: e.link ?? "/video/",
      })),
    },
  ].filter((g) => g.satirlar.length > 0);

  return (
    <>
      <WebSiteSchema />
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />

      <div className={s.sayfa}>
        {/* [00] AÇILIŞ */}
        <header className={`${s.acilis} ana-acilis`} id="top">
          {/* Başlığın arkasında Berkay'ın kendi karesi (Görüntü ve Dize, 0334); dizesi lib/goruntu.ts'ten. */}
          <figure className={`${s.foto} ${s.acilisFoto}`}>
            <img src={`/goruntu/${acilisKare.no}.jpg`} alt="Fırtınalı bir günde İstanbul Boğazı; bulutların altında köprü ve dalgalar" width={acilisKare.w} height={acilisKare.h} fetchPriority="high" />
            <figcaption><span>[00]</span> İstanbul Boğazı · fotoğraf Berkay Doğan</figcaption>
          </figure>
          <div className={s.kunye}>
            <span className={s.etiket}>[00] {t.hero.role}</span>
            <span className={`${s.etiket} ${s.kunyeOrta}`}>
              <Link href={`/kitaplar/${murekkep.slug}/`}>{murekkep.ad}, {murekkep.tur.toLowerCase()} — 2025</Link>
              <Link href={`/kitaplar/${tasfiye.slug}/`}>{tasfiye.ad}, {tasfiye.tur.toLowerCase()} — 2026</Link>
            </span>
          </div>

          <h1 className={s.ad} aria-label="Berkay Doğan">
            <span>berkay</span>
            <span className={s.adIkinci}>doğan</span>
          </h1>

          <div className={s.acilisAlt}>
            <a href="#gorsel" className={s.ok} aria-label="Görsel alanına in">↘</a>
            <p className={s.giris}>
              <span className={s.yildiz} aria-hidden>∗∗∗</span>
              İstanbul&apos;da yaşayan şair ve yazar. {t.hero.sub}
            </p>
            <nav className={s.davet} aria-label="Başlangıç">
              <Link href="/kitaplar/">Kitapları keşfet <span aria-hidden>↗</span></Link>
              <Link href="/yazilar/buraya-gurultuden-kacanlar-icin/">Bir metin oku <span aria-hidden>↗</span></Link>
            </nav>
          </div>
        </header>

        {/* [01] GÖRSEL */}
        <section className={s.gorsel} id="gorsel" aria-labelledby="gorsel-baslik">
          <h2 id="gorsel-baslik" className="sr-only">Görsel</h2>
          <figure className={`${s.foto} ${s.fotoGenis}`}>
            <img src="/images/portre.jpg" alt="Berkay Doğan, akşam vakti İstanbul'da bir terasta; arkada deniz ve şehir ışıkları" width={1551} height={1034} />
            <figcaption><span>[01]</span> Berkay Doğan, İstanbul</figcaption>
          </figure>
          <div className={s.gorselAlt}>
            <blockquote className={s.dize}>
              <p>Geri dönmüyorum, geleceğime âşığım.</p>
              <footer>— Geleceğime Âşığım · <Link href={`/kitaplar/${murekkep.slug}/`}>{murekkep.ad}</Link>, s. 77</footer>
            </blockquote>
            <figure className={`${s.foto} ${s.fotoEl}`}>
              <img src="/anasayfa/el-yazisi.webp" alt="Kâğıt üzerinde el yazısıyla Geleceğime Âşığım şiiri" width={1086} height={1448} loading="lazy" />
              <figcaption><span>[01.2]</span> El yazısı, s. 77</figcaption>
            </figure>
          </div>
        </section>

        {/* [02] KİTAPLAR */}
        <section className={s.koyu} id="kitaplar" aria-labelledby="kitaplar-baslik">
          <div className={s.ic}>
            <div className={s.bolumBas}>
              <span className={s.etiket}>[02] Kitaplar</span>
              <h2 id="kitaplar-baslik">İkisi arasında, şiirden denemeye uzanan bir hesaplaşma vardır.</h2>
              <span className={s.okSag} aria-hidden>↙</span>
            </div>
            <div className={s.kitaplar}>
              {kitaplar.map(({ k, satin, alinti, yil }, i) => (
                <article key={k.slug} className={s.kitap}>
                  <Link href={`/kitaplar/${k.slug}/`} className={s.kapak} aria-label={`${k.ad}: ${k.altBaslik} — kitap sayfası`}>
                    <img
                      src={k.kapak}
                      srcSet={`${k.kapak400} 400w, ${k.kapak} ${k.kapakW}w`}
                      sizes="(max-width: 700px) 80vw, 34vw"
                      alt={`${k.ad} kapağı`}
                      loading="lazy"
                    />
                  </Link>
                  <div className={s.meta}>
                    <span>[{no(i + 1)}] {k.ad} <span aria-hidden>↗</span></span>
                    <span>{k.tur} / {yil}</span>
                  </div>
                  <h3 className={s.kitapAd}>{k.ad}<span>{k.altBaslik}</span></h3>
                  <p className={s.kitapNot}>{k.arkaKapak[0]}</p>
                  {alinti && (
                    <p className={s.kitapAlinti}>“{alinti.text}” <span>{alinti.sayfa}</span></p>
                  )}
                  <dl className={s.kitapKunye}>
                    {k.kunye.filter((x) => ["Yayınevi", "Sayfa", "ISBN"].includes(x.k)).map((x) => (
                      <div key={x.k}><dt>{x.k}</dt><dd>{x.v}</dd></div>
                    ))}
                  </dl>
                  <p className={s.kitapLink}>
                    <Link href={`/kitaplar/${k.slug}/`}>Kitap sayfası →</Link>
                    <a href={satin} {...dis}>Satın al ↗</a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* [03] YAZAR */}
        <section className={s.yazar} id="yazar" aria-labelledby="yazar-baslik">
          <span className={s.etiket}>[03] Yazar</span>
          <div className={s.bio}>
            <h2 id="yazar-baslik">{t.about.paras[1]}</h2>
            <div className={s.bioKucuk}>
              <p>{t.about.paras[2]}</p>
              <p>{t.about.paras[4]}</p>
              <p><Link href="/hakkimda/">Hakkımda: yolculuk ve okur yorumları →</Link></p>
            </div>
          </div>
          <figure className={`${s.foto} ${s.fotoPortre}`}>
            <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="(max-width: 700px) 60vw, 22vw" alt="Berkay Doğan portresi" width={600} height={750} loading="lazy" />
            <figcaption><span>[03.1]</span> Portre</figcaption>
          </figure>
        </section>

        {/* [04] YAYIN DİZİNİ */}
        <section className={s.dizin} id="dizin" aria-labelledby="dizin-baslik">
          <div className={s.dizinBas}>
            <span className={s.etiket}>[04] Yayın dizini</span>
            <h2 id="dizin-baslik">Kitaplar, yazılar, basın ve ekran.</h2>
          </div>
          <div className={s.dizinGovde}>
            {dizin.map((g, gi) => (
              <div key={g.baslik} className={s.dizinGrup}>
                <h3 className={s.dizinGrupAd}>
                  <span>{no(gi + 1)}</span> {g.baslik}
                  {g.tum && <Link href={g.tum.href}>{g.tum.ad} →</Link>}
                </h3>
                <ul>
                  {g.satirlar.map((r) => {
                    const disari = r.href.startsWith("http");
                    return (
                      <li key={r.href + r.ad}>
                        <a href={r.href} className={s.satir} {...(disari ? dis : {})}>
                          <time dateTime={r.iso} className={s.satirTarih}>{r.tarih}</time>
                          <span className={s.satirAd}>
                            {r.ad}
                            {r.alt && <span>{r.alt}</span>}
                          </span>
                          <span className={s.satirTur}>{r.tur}</span>
                          <span className={s.satirOk} aria-hidden>{disari ? "↗" : "→"}</span>
                          {disari && <span className="sr-only"> (yeni sekmede açılır)</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* [05] İLETİŞİM + site dizini */}
        <footer className={s.son} id="contact">
          <div className={s.ic}>
            <div className={s.sonUst}>
              <span className={s.etiket}>[05] İletişim</span>
              <a href="#top" className={s.etiket}>Başa dön ↑</a>
            </div>
            <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className={s.sosyal}>
              <a href={YOUTUBE_URL} {...dis}>YouTube ↗</a>
              <a href={INSTAGRAM_URL} {...dis}>Instagram ↗</a>
              <a href={SUBSTACK_URL} {...dis}>Substack ↗</a>
              <a href="/en/" lang="en">In English →</a>
            </p>
            <nav className={s.siteDizin} aria-label="Site dizini">
              {menuGruplari("tr").map((g, gi) => (
                <div key={g.baslik}>
                  <p className={s.etiket}>[{no(gi + 1)}] {g.baslik}</p>
                  <ul>
                    {g.linkler.filter(([href, , tur]) => tur !== "ara" && href).map(([href, ad]) => (
                      <li key={href}><a href={href}>{ad}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className={s.sonAlt}>
              <span>©2026 Berkay Doğan</span>
              <span>İstanbul</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
