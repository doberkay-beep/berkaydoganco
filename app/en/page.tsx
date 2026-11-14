/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, YOUTUBE_URL, SUBSTACK_URL, SITE_URL, PERSON_ID } from "@/lib/site";
import { BIO_KISA_EN, BIO_ORTA_EN } from "@/lib/basinKiti";
import { EN_BOOKS, EN_FACTS, EN_RECOGNITION, EN_TOPICS, EN_IMAGES } from "@/lib/en";
import { KITAPLAR } from "@/lib/kitaplar";
import { KARELER } from "@/lib/goruntu";
import { menuGruplari } from "@/lib/menu";
import { KopyalaMetin } from "@/components/KopyalaMetin";
import { Masada } from "@/components/Masada";
import s from "@/components/anasayfa/noir.module.css";

/* /en/ — tek sayfalık İngilizce tanıtım + basın kiti, ana sayfayla aynı yazar-noir düzeni.
   Sunucuda İngilizce render edilir: Google bu sayfayı İngilizce olarak dizinler,
   ana sayfayla hreflang çifti kurar (app/page.tsx). Dize ÇEVRİLMEZ — kitaptan
   gösterilen satırlar Türkçe aslıyla, lang="tr". Metinler lib/en + lib/basinKiti'den. */

const DESC =
  "Berkay Doğan is an Istanbul-based Turkish poet and writer: author of Mürekkep ve Köz (poetry, 2025) and Tasfiye (essays, 2026); he builds the apps hereby. and nowby. Biography, books, press kit and contact in English.";

export const metadata: Metadata = {
  title: { absolute: "Berkay Doğan — Turkish Poet & Writer (in English)" },
  description: DESC,
  alternates: {
    canonical: "/en/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: "Berkay Doğan — Turkish Poet & Writer",
    description: DESC,
    url: `${SITE_URL}/en/`,
    siteName: "berkaydogan.co",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Turkish Poet & Writer",
    description: "Books: Mürekkep ve Köz (poetry) and Tasfiye (essays). Press kit in English.",
  },
};

const no = (i: number) => String(i).padStart(2, "0");
const dis = { target: "_blank", rel: "noopener noreferrer" } as const;
const kare = KARELER.find((k) => k.no === "0334")!;

type Satir = { sol: string; ad: string; alt?: string; tur?: string; href?: string; indir?: boolean; dil?: string };

function Satirlar({ satirlar }: { satirlar: Satir[] }) {
  return (
    <ul>
      {satirlar.map((r) => {
        const disari = !!r.href?.startsWith("http");
        const ic = (
          <>
            <span className={s.satirTarih}>{r.sol}</span>
            <span className={s.satirAd} lang={r.dil}>
              {r.ad}
              {r.alt && <span lang="en">{r.alt}</span>}
            </span>
            <span className={s.satirTur}>{r.tur}</span>
            <span className={s.satirOk} aria-hidden>{r.href ? (r.indir ? "↓" : disari ? "↗" : "→") : ""}</span>
          </>
        );
        return (
          <li key={r.sol + r.ad}>
            {r.href ? (
              <a href={r.href} className={s.satir} {...(disari ? dis : {})} {...(r.indir ? { download: "" } : {})}>{ic}</a>
            ) : (
              <div className={s.satir}>{ic}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function EnglishPage() {
  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/en/`,
    name: "Berkay Doğan — Turkish poet and writer",
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Berkay Doğan",
      url: SITE_URL,
      image: `${SITE_URL}/images/portre.jpg`,
      jobTitle: "Poet and writer",
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  const gruplar: { id: string; baslik: string; satirlar: Satir[]; not?: React.ReactNode }[] = [
    {
      id: "recognition",
      baslik: "Recognition",
      satirlar: EN_RECOGNITION.map((r) => ({ sol: r.value, ad: r.label })),
      not: <>Coverage in the Turkish press is collected in the <Link href="/press/#basinda" hrefLang="tr">Press Room (Turkish)</Link>.</>,
    },
    {
      id: "hereby",
      baslik: "The apps",
      satirlar: [
        { sol: "iOS · 2026", ad: "hereby. — Leave a thought in a place.", alt: "An iOS app by Berkay Doğan, 2026. Leave the line on your mind in the place you pass; only someone who comes there can read it. No likes, no followers. It includes poetry walks through Kadıköy and Beşiktaş, where lines from his books open only when you arrive. Free on the App Store.", tur: "Discover", href: "/en/hereby/" },
        { sol: "Radio", ad: "nowby. — What's on the radio right now.", alt: "Hundreds of frequencies on one screen, live. Charts built on real airplay counts, the world's radio, and a Frequency Fortune with lines from the books. The same frequency on iPhone, iPad, Mac, Apple TV and Apple Watch.", tur: "Discover", href: "/en/nowby/" },
        { sol: "by.", ad: "From by. — Berkay Doğan's workshop", href: "/en/by/" },
        { sol: "Studio", ad: "Work with the studio · apps and websites", href: "/en/studio/" },
      ],
    },
    {
      id: "film-radio",
      baslik: "Film & radio",
      satirlar: [
        { sol: "Sep 2026", ad: "TASFİYE: Film", alt: "An 8-minute short film built from the text of Tasfiye and narrated by the author in Turkish. Released on YouTube, September 2026.", tur: "Watch", href: "/film/" },
        { sol: "2026", ad: "nowby. — nowby.co", alt: "Founded by Berkay Doğan in 2026: a live view of what is playing right now across Turkey’s radio stations, and counted. A poet’s radio project, built around listening.", tur: "Open", href: "https://nowby.co" },
      ],
    },
    {
      id: "press-kit",
      baslik: "Press kit · free to use with credit",
      satirlar: [
        { sol: "ZIP", ad: "Download press kit", alt: "Includes biographies in Turkish and English, the author portrait, covers and logo. The fact sheet, quotes and one-page press release inside are in Turkish.", tur: "Download", href: "/basin/berkay-dogan-basin-kiti.zip", indir: true },
        ...EN_IMAGES.map((g) => ({ sol: g.note, ad: g.name, tur: "Download", href: g.file, indir: true })),
      ],
      not: <>All images may be used for news and promotional purposes. Credit: Berkay Doğan / berkaydogan.co</>,
    },
    {
      id: "topics",
      baslik: "Interview & story ideas",
      satirlar: EN_TOPICS.map((k, i) => ({ sol: no(i + 1), ad: k })),
    },
  ];

  return (
    <div className={s.sayfa} lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />

      {/* [00] OPENING */}
      <header className={`${s.acilis} ana-acilis`} id="top">
        <figure className={`${s.foto} ${s.acilisFoto}`}>
          <img src={`/goruntu/${kare.no}.jpg`} alt="The Bosphorus in Istanbul on a stormy day; the bridge under heavy clouds" width={kare.w} height={kare.h} fetchPriority="high" />
          <figcaption><span>[00]</span> The Bosphorus · photo by Berkay Doğan</figcaption>
        </figure>
        <div className={s.kunye}>
          <span className={s.etiket}>[00] Turkish poet &amp; writer — Istanbul</span>
          <span className={`${s.etiket} ${s.kunyeOrta}`}>
            <a href="#murekkep-ve-koz">Mürekkep ve Köz, poetry — 2025</a>
            <a href="#tasfiye">Tasfiye, essays — 2026</a>
          </span>
        </div>
        <h1 className={s.ad} aria-label="Berkay Doğan">
          <span>berkay</span>
          <span className={s.adIkinci}>doğan</span>
        </h1>
        <div className={s.acilisAlt}>
          <a href="#about" className={s.ok} aria-label="Go to About">↘</a>
          <p className={s.giris}>
            <span className={s.yildiz} aria-hidden>∗∗∗</span>
            Turkish poet and writer, Istanbul. Founder of nowby. His books are published in Turkish; this page is for international readers, editors and press.
          </p>
          <nav className={s.davet} aria-label="Contents">
            <a href="#books">Books <span aria-hidden>↓</span></a>
            <a href="#press-kit">Press kit <span aria-hidden>↓</span></a>
            <Link href="/" hrefLang="tr" lang="tr">Türkçe <span aria-hidden>→</span></Link>
          </nav>
        </div>
      </header>

      {/* [01] ABOUT */}
      <section className={s.yazar} id="about" aria-labelledby="about-heading">
        <span className={s.etiket}>[01] About</span>
        <div className={s.bio}>
          <h2 id="about-heading">{BIO_KISA_EN}</h2>
          <div className={s.bioKucuk}>
            <p><KopyalaMetin metin={BIO_KISA_EN} etiket="Copy one-line bio" tamam="Copied ✓" /></p>
            <p>{BIO_ORTA_EN}</p>
            <p><KopyalaMetin metin={BIO_ORTA_EN} etiket="Copy short paragraph" tamam="Copied ✓" /></p>
          </div>
          <dl className={s.olgular}>
            {EN_FACTS.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
          <div className={s.masada}><Masada lang="en" /></div>
        </div>
        <figure className={`${s.foto} ${s.fotoPortre}`}>
          <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="(max-width: 700px) 60vw, 22vw" alt="Portrait of Berkay Doğan" width={600} height={750} loading="lazy" />
          <figcaption><span>[01.1]</span> Portrait</figcaption>
        </figure>
      </section>

      {/* [02] BOOKS */}
      <section className={s.koyu} id="books" aria-labelledby="books-heading">
        <div className={s.ic}>
          <div className={s.bolumBas}>
            <span className={s.etiket}>[02] Books</span>
            <h2 id="books-heading">Books, published in Turkish.</h2>
            <span className={s.okSag} aria-hidden>↙</span>
          </div>
          <div className={s.kitaplar}>
            {EN_BOOKS.map((b, i) => {
              const k = KITAPLAR.find((x) => x.slug === b.slug);
              return (
                <article key={b.slug} id={b.slug} className={s.kitap}>
                  {k && (
                    <Link href={`/kitaplar/${b.slug}/`} hrefLang="tr" className={s.kapak} aria-label={`${b.title} — book page (Turkish)`}>
                      <img src={k.kapak} srcSet={`${k.kapak400} 400w, ${k.kapak} ${k.kapakW}w`} sizes="(max-width: 700px) 80vw, 34vw" alt={`${b.title} — cover`} loading="lazy" />
                    </Link>
                  )}
                  <div className={s.meta}>
                    <span>[{no(i + 1)}] {b.title}</span>
                    <span>{b.genre} / {b.published}</span>
                  </div>
                  <h3 className={s.kitapAd} lang="tr">{b.title}<span>{b.subtitle}</span></h3>
                  <p className={s.kitapNot}>{b.gloss}</p>
                  {b.blurb.map((p, j) => <p key={j} className={s.kitapNot}>{p}</p>)}
                  {b.original && (
                    <p className={s.kitapAlinti}>
                      <span lang="tr" className={s.kitapAlintiMetin}>“{b.original}”</span>{" "}
                      <span>From the book, in the original Turkish{b.literally ? <> · literally: “{b.literally}”</> : null}</span>
                    </p>
                  )}
                  <dl className={s.kitapKunye}>
                    {[["Publisher", "İskenderiye Yayınları"], ["Pages", String(b.pages)], ["ISBN", b.isbn], ["Language", "Turkish"]].map(([kk, v]) => (
                      <div key={kk}><dt>{kk}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <p className={s.kitapLink}>
                    <Link href={`/kitaplar/${b.slug}/`} hrefLang="tr">Book page (Turkish) →</Link>
                  </p>
                </article>
              );
            })}
          </div>
          <p className={s.koyuNot}>
            Both books are sold by Turkish online booksellers, including Trendyol and the publisher’s own shop. For review copies, please write to {EMAIL}.
          </p>
        </div>
      </section>

      {/* [03] INDEX */}
      <section className={s.dizin} aria-labelledby="index-heading">
        <div className={s.dizinBas}>
          <span className={s.etiket}>[03] Index</span>
          <h2 id="index-heading">Recognition, apps, film, press kit.</h2>
        </div>
        <div className={s.dizinGovde}>
          {gruplar.map((g, gi) => (
            <div key={g.id} id={g.id} className={s.dizinGrup}>
              <h3 className={s.dizinGrupAd}><span>{no(gi + 1)}</span> {g.baslik}</h3>
              <Satirlar satirlar={g.satirlar} />
              {g.not && <p className={s.dizinNot}>{g.not}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* [04] CONTACT */}
      <footer className={s.son} id="contact">
        <div className={s.ic}>
          <div className={s.sonUst}>
            <span className={s.etiket}>[04] Contact</span>
            <a href="#top" className={s.etiket}>Back to top ↑</a>
          </div>
          <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className={s.sonMetin}>
            <p>Available for interviews in English. Translation and publishing rights: İskenderiye Yayınları — enquiries are welcome at the address above and will be forwarded.</p>
            <p>Interviews, reviews, events and other enquiries.</p>
          </div>
          <p className={s.sosyal}>
            <a href={INSTAGRAM_URL} {...dis}>Instagram ↗</a>
            <a href={YOUTUBE_URL} {...dis}>YouTube ↗</a>
            <a href={SUBSTACK_URL} {...dis}>Substack (Turkish) ↗</a>
            <Link href="/" hrefLang="tr" lang="tr">Türkçe →</Link>
          </p>
          <nav className={s.siteDizin} aria-label="Site index">
            {menuGruplari("en").map((g, gi) => (
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
            <span>Istanbul</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
