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
import { MASADA } from "@/lib/masada";
import { TemaDugmesi } from "@/components/TemaDugmesi";
import { Bugun } from "@/components/anasayfa/Bugun";
import s from "@/components/anasayfa/gazete.module.css";

/* /en/ — tek sayfalık İngilizce tanıtım + basın kiti, ana sayfayla aynı gazete düzeni.
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

const dis = { target: "_blank", rel: "noopener noreferrer" } as const;
const kare = KARELER.find((k) => k.no === "0334")!;

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

  const [tasfiye, murekkep] = EN_BOOKS;
  const kitap = (slug: string) => KITAPLAR.find((x) => x.slug === slug)!;
  const tk = kitap(tasfiye.slug);
  const arsiv = menuGruplari("en").slice(1).flatMap((g) => g.linkler).filter(([href, , tur]) => href && tur !== "ara" && tur !== true);

  return (
    <div className={`${s.sayfa} gz-ana`} lang="en" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />

      <div className={s.ust}>
        <span className={s.yer}><b>Istanbul</b><Bugun lang="en" /></span>
        <span className={s.ustSag}>
          <Link href="/" hrefLang="tr" lang="tr">Türkçe</Link>
          <b>English</b>
          <TemaDugmesi lang="en" />
        </span>
      </div>

      <header className={s.kafa}>
        <h1>Berkay Doğan</h1>
        <p>Turkish poet and writer, Istanbul. His books are published in Turkish; this page is for international readers, editors and press.</p>
      </header>

      <nav className={s.menu} aria-label="Main menu">
        {menuGruplari("en")[0].linkler.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
      </nav>

      <main className={s.izgara}>
        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className={s.kunye}>About</h2>
          <article className={s.yazi}>
            <p style={{ fontSize: 19, lineHeight: 1.45 }}>{BIO_KISA_EN}</p>
            <p className={s.devam}><KopyalaMetin metin={BIO_KISA_EN} etiket="Copy one-line bio" tamam="Copied ✓" /></p>
          </article>
          <h2 id="recognition" className={s.kunye} style={{ marginTop: 8 }}>Recognition</h2>
          <ul className={s.liste}>
            {EN_RECOGNITION.map((r) => <li key={r.label}><b style={{ fontFamily: "var(--font-etiket)", fontSize: 12 }}>{r.value}</b><br />{r.label}</li>)}
          </ul>
          <p className={s.not}>Coverage in the Turkish press is collected in the <Link href="/press/#basinda" hrefLang="tr">Press Room (Turkish)</Link>.</p>
        </section>

        <article className={s.manset} id="books" aria-labelledby="tasfiye-heading">
          <span id="tasfiye" />
          <p className={s.kunye}><span>New book · {tasfiye.genre}</span><span>Published in Turkish</span></p>
          {/* Başlık, kitap tanıtımının ilk cümlesi (lib/en EN_BOOKS blurb[0]). */}
          <h2 id="tasfiye-heading"><Link href={`/kitaplar/${tasfiye.slug}/`} hrefLang="tr">{tasfiye.blurb[0].split(". ")[0]}.</Link></h2>
          <p className={s.ozet}><span lang="tr">{tasfiye.title}: {tasfiye.subtitle}</span>. {tasfiye.gloss}.</p>
          <div className={s.govde}>
            <figure>
              <Link href={`/kitaplar/${tasfiye.slug}/`} hrefLang="tr">
                <img src={tk.kapak} srcSet={`${tk.kapak400} 400w, ${tk.kapak} ${tk.kapakW}w`} sizes="(max-width: 960px) 230px, 220px" alt={`${tasfiye.title} — cover`} />
              </Link>
              <figcaption>İskenderiye Yayınları · {tasfiye.pages} pages · ISBN {tasfiye.isbn}</figcaption>
            </figure>
            <div>
              {tasfiye.blurb.map((p, j) => <p key={j} className={j === 0 ? s.ilkHarf : undefined}>{p}</p>)}
              <p className={s.devam}><Link href={`/kitaplar/${tasfiye.slug}/`} hrefLang="tr">Book page (Turkish)</Link><Link href="/film/">Watch the short film</Link></p>
              {tasfiye.original && (
                <p className={s.alinti}><span lang="tr" style={{ display: "inline", font: "inherit", color: "inherit", margin: 0 }}>“{tasfiye.original}”</span><span>From the book, in the original Turkish{tasfiye.literally ? <> · literally: “{tasfiye.literally}”</> : null}</span></p>
              )}
            </div>
          </div>
        </article>

        <section className={s.basin} id="press-kit" aria-labelledby="press-heading">
          <h2 id="press-heading" className={s.kunye}>Press kit</h2>
          <ul>
            <li><b>ZIP · free to use with credit</b><a href="/basin/berkay-dogan-basin-kiti.zip" download>Download press kit</a><br /><span className={s.kaynak}>Includes biographies in Turkish and English, the author portrait, covers and logo. The fact sheet, quotes and one-page press release inside are in Turkish.</span></li>
            {EN_IMAGES.map((g) => <li key={g.file}><b>{g.note}</b><a href={g.file} download>{g.name}</a></li>)}
          </ul>
          <p className={s.not}>All images may be used for news and promotional purposes. Credit: Berkay Doğan / berkaydogan.co</p>
          <h2 className={s.kunye} style={{ marginTop: 26 }}>On the desk</h2>
          <ul>
            {MASADA.map((m) => <li key={m.ad}><b>{m.durum.en}</b><span lang="tr">{m.ad}</span> · {m.tur.en}</li>)}
          </ul>
        </section>
      </main>

      <section className={s.serit} aria-label="Mürekkep ve Köz and the apps">
        <figure>
          <img src={`/goruntu/${kare.no}.jpg`} alt="The Bosphorus in Istanbul on a stormy day; the bridge under heavy clouds" width={kare.w} height={kare.h} loading="lazy" />
          <figcaption className={s.resimAlti}>The Bosphorus · photo by Berkay Doğan</figcaption>
        </figure>
        <div>
          <div className={s.kutu} id={murekkep.slug}>
            <p className={s.kunye}><span>First book · {murekkep.genre}</span><span>{murekkep.published}</span></p>
            <h3 lang="tr"><Link href={`/kitaplar/${murekkep.slug}/`} hrefLang="tr">{murekkep.title}</Link></h3>
            <p><span lang="tr">{murekkep.subtitle}</span>. {murekkep.gloss}.</p>
            {murekkep.blurb.map((p, j) => <p key={j}>{p}</p>)}
            {murekkep.original && <p className={s.okur}><span lang="tr">“{murekkep.original}”</span> <span className={s.kaynak}>literally: “{murekkep.literally}”</span></p>}
            <p className={s.not}>İskenderiye Yayınları · {murekkep.pages} pages · ISBN {murekkep.isbn}</p>
          </div>
          <div className={s.kutu} id="hereby">
            <p className={s.kunye}><span>The apps</span><Link href="/en/by/">by. workshop</Link></p>
            <p><Link href="/en/hereby/"><b>hereby.</b></Link> Leave a thought in a place. Leave the line on your mind in the place you pass; only someone who comes there can read it. No likes, no followers. Free on the App Store.</p>
            <p><Link href="/en/nowby/"><b>nowby.</b></Link> What&apos;s on the radio right now. Hundreds of frequencies on one screen, live, on iPhone, iPad, Mac, Apple TV and Apple Watch.</p>
            <p className={s.devam}><Link href="/en/studio/">Work with the studio · apps and websites</Link></p>
          </div>
        </div>
      </section>

      <section className={s.yazar} aria-label="Biography, story ideas and facts">
        <figure>
          <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="200px" alt="Portrait of Berkay Doğan" width={600} height={750} loading="lazy" />
          <figcaption className={s.resimAlti}>Portrait · free to use with credit</figcaption>
        </figure>
        <div>
          <p className={s.kunye}><span>Biography</span></p>
          <p>{BIO_ORTA_EN}</p>
          <p className={s.devam}><KopyalaMetin metin={BIO_ORTA_EN} etiket="Copy short paragraph" tamam="Copied ✓" /></p>
          <p className={s.kunye} id="topics" style={{ marginTop: 26 }}><span>Interview &amp; story ideas</span></p>
          <ul className={s.liste}>
            {EN_TOPICS.map((k) => <li key={k}>{k}</li>)}
          </ul>
        </div>
        <div>
          <p className={s.kunye}><span>Fact sheet</span></p>
          <dl className={s.liste}>
            {EN_FACTS.map((f) => <li key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></li>)}
          </dl>
        </div>
      </section>

      <footer className={s.alt} id="contact">
        <div className={s.altUst}>
          <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span className={s.sosyal}>
            <a href={INSTAGRAM_URL} {...dis}>Instagram</a>
            <a href={YOUTUBE_URL} {...dis}>YouTube</a>
            <a href={SUBSTACK_URL} {...dis}>Substack (Turkish)</a>
            <Link href="/" hrefLang="tr" lang="tr">Türkçe</Link>
          </span>
        </div>
        <p style={{ margin: "14px 0 0", maxWidth: 720, lineHeight: 1.6 }}>Available for interviews in English. Translation and publishing rights: İskenderiye Yayınları — enquiries are welcome at the address above and will be forwarded. For review copies, please write to the same address.</p>
        <nav className={s.arsiv} aria-label="Archive">
          <b style={{ color: "var(--murekkep)", fontWeight: 600, marginRight: 10 }}>Archive</b>
          {arsiv.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
        </nav>
        <p className={s.telif}>© 2026 Berkay Doğan · Istanbul</p>
      </footer>
    </div>
  );
}
