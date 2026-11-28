/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, YOUTUBE_URL, SUBSTACK_URL, SITE_URL, PERSON_ID } from "@/lib/site";
import { BIO_KISA_EN, BIO_ORTA_EN } from "@/lib/basinKiti";
import { EN_BOOKS, EN_FACTS, EN_RECOGNITION, EN_TOPICS, EN_IMAGES } from "@/lib/en";
import { KITAPLAR } from "@/lib/kitaplar";
import { menuGruplari, arsivBaglantilari } from "@/lib/menu";
import { KopyalaMetin } from "@/components/KopyalaMetin";
import { MASADA } from "@/lib/masada";
import { TemaDugmesi } from "@/components/TemaDugmesi";
import { KARELER } from "@/lib/goruntu";
import { MenuDugmesi } from "@/components/anasayfa/MenuDugmesi";
import { SON_HABER } from "@/lib/haber";
import s from "@/components/anasayfa/ilkSayfa.module.css";

/* /en/ — tek sayfalık İngilizce tanıtım + basın kiti, ana sayfayla aynı "İlk sayfa" düzeni (taslak, 24 Kas).
   Sunucuda İngilizce render edilir: Google bu sayfayı İngilizce olarak dizinler,
   ana sayfayla hreflang çifti kurar (app/page.tsx). Dize ÇEVRİLMEZ — kitaptan
   gösterilen satırlar Türkçe aslıyla, lang="tr". Metinler lib/en + lib/basinKiti'den. */

const DESC =
  "Berkay Doğan is an Istanbul-based Turkish poet and writer: author of Mürekkep ve Köz (poetry, 2025) and Tasfiye (essays, 2026); he builds the apps hereby., nowby. and frameby. Biography, books, press kit and contact in English.";

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
  const arsiv = arsivBaglantilari("en");
  const kare = KARELER.find((k) => k.s === murekkep.original) ?? KARELER.find((k) => k.no === "0406")!;

  return (
    <div className={`${s.sayfa} gz-ana`} lang="en" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />

      <header className={s.ust}>
        <Link href="/en/" className={s.marka}>Berkay Doğan</Link>
        <nav className={s.menu} aria-label="Main menu">
          {menuGruplari("en")[0].linkler.map(([href, ad]) => <a key={href} href={href}>{ad}</a>)}
        </nav>
        <span className={s.sag}>
          <Link href="/" hrefLang="tr" lang="tr">Türkçe</Link>
          <b>English</b>
          <TemaDugmesi lang="en" className="tema-dugme" />
          <MenuDugmesi lang="en" className={s.menuAc} />
        </span>
      </header>
      {SON_HABER?.metinEn && (
        <p className={s.haber}>
          {SON_HABER.url ? <a href={SON_HABER.url}>{SON_HABER.metinEn}</a> : SON_HABER.metinEn}
        </p>
      )}

      {/* Dize çevrilmez: Türkçe aslı, altında Berkay'ın onayladığı birebir anlam notu (lib/en).
          Fotoğraf, aynı dizeyle eşleşmiş kendi karesi (lib/goruntu); onaylı notu olan dize az olduğu için sabit. */}
      <h1 className="sr-only">Berkay Doğan, poet and writer</h1>
      <section className={s.acilis} aria-label="A photograph and a line from the books">
        <div className={`${s.kare} ${kare.h > kare.w ? s.dikey : s.yatay}`}>
          <figure className={s.kareFoto}>
            <img src={`/goruntu/${kare.no}.jpg`} alt="Photograph by Berkay Doğan" width={kare.w} height={kare.h} fetchPriority="high" />
            <figcaption>Photograph: Berkay Doğan</figcaption>
          </figure>
          <div className={s.kareYazi}>
            <figure className={s.dize}>
              <blockquote lang="tr">{murekkep.original}</blockquote>
              <figcaption>literally: “{murekkep.literally}” · <span lang="tr">{murekkep.title}</span></figcaption>
            </figure>
            <p className={s.imza}>
              <b>Berkay Doğan<span className={s.nokta} aria-hidden /></b>
              Turkish poet and writer, Istanbul. His books are published in Turkish; this page is for international readers, editors and press.
            </p>
          </div>
        </div>
      </section>

      <main>
        <section className={s.bolum} id="books" aria-labelledby="books-heading">
          <span id="tasfiye" />
          <h2 id="books-heading" className={s.etiket}>Books · published in Turkish</h2>
          <div className={s.kitaplar}>
            {[tasfiye, murekkep].map((b) => {
              const k = kitap(b.slug);
              return (
                <article key={b.slug} id={b.slug === murekkep.slug ? murekkep.slug : undefined} className={s.kitap}>
                  <Link href={`/kitaplar/${b.slug}/`} hrefLang="tr">
                    <img src={k.kapak} srcSet={`${k.kapak400} 400w, ${k.kapak} ${k.kapakW}w`} sizes="(max-width: 860px) 240px, 340px" alt={`${b.title} — cover`} loading="lazy" />
                  </Link>
                  <h2 lang="tr"><Link href={`/kitaplar/${b.slug}/`} hrefLang="tr">{b.title}</Link></h2>
                  <p className={s.tur}>{b.genre} · {b.published} · <span lang="tr">{b.subtitle}</span>. {b.gloss}.</p>
                  {b.blurb.map((p, j) => <p key={j} className={s.metin}>{p}</p>)}
                  {b.original && <p className={s.alinti}><span lang="tr">“{b.original}”</span><span className={s.not}>literally: “{b.literally}”</span></p>}
                  <p className={s.not}>İskenderiye Yayınları · {b.pages} pages · ISBN {b.isbn}</p>
                  <p className={s.baglar}>
                    <Link href={`/kitaplar/${b.slug}/`} hrefLang="tr">Book page (Turkish)</Link>
                    {b.slug === tasfiye.slug && <Link href="/film/">Watch the short film</Link>}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={s.bolum} id="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className={s.etiket}>About</h2>
          <div className={s.yazar}>
            <div>
              <p className={s.giris}>{BIO_KISA_EN}</p>
              <p>{BIO_ORTA_EN}</p>
              <p className={s.baglar}>
                <KopyalaMetin metin={BIO_KISA_EN} etiket="Copy one-line bio" tamam="Copied ✓" />
                <KopyalaMetin metin={BIO_ORTA_EN} etiket="Copy short paragraph" tamam="Copied ✓" />
              </p>
            </div>
            <figure style={{ margin: 0 }}>
              <img src="/images/portre-dikey-600.jpg" srcSet="/images/portre-dikey-600.jpg 600w, /images/portre-dikey.jpg 827w" sizes="(max-width: 860px) 260px, 400px" alt="Portrait of Berkay Doğan" width={600} height={750} loading="lazy" />
              <figcaption className={s.not}>Portrait · free to use with credit</figcaption>
            </figure>
          </div>
        </section>

        <section className={s.bolum} aria-label="Recognition, story ideas and facts">
          <div className={s.satirlar}>
            <div id="recognition">
              <h2 className={s.etiket}>Recognition</h2>
              <ul className={s.kisaListe}>
                {EN_RECOGNITION.map((r) => <li key={r.label}><b>{r.value}</b>{r.label}</li>)}
              </ul>
              <p className={s.not}>Coverage in the Turkish press is collected in the <Link href="/press/#basinda" hrefLang="tr">Press Room (Turkish)</Link>.</p>
            </div>
            <div id="topics">
              <h2 className={s.etiket}>Interview &amp; story ideas</h2>
              <ul className={s.kisaListe}>
                {EN_TOPICS.map((k) => <li key={k}>{k}</li>)}
              </ul>
            </div>
            <div>
              <h2 className={s.etiket}>Fact sheet</h2>
              <dl className={s.kisaListe}>
                {EN_FACTS.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        <section className={s.bolum} id="press-kit" aria-labelledby="press-heading">
          <div className={s.satirlar}>
            <div>
              <h2 id="press-heading" className={s.etiket}>Press kit</h2>
              <ul className={s.kisaListe}>
                <li><b>ZIP · free to use with credit</b><a href="/basin/berkay-dogan-basin-kiti.zip" download>Download press kit</a><span className={s.not}>Includes biographies in Turkish and English, the author portrait, covers and logo. The fact sheet, quotes and one-page press release inside are in Turkish.</span></li>
                {EN_IMAGES.map((g) => <li key={g.file}><b>{g.note}</b><a href={g.file} download>{g.name}</a></li>)}
              </ul>
              <p className={s.not}>All images may be used for news and promotional purposes. Credit: Berkay Doğan / berkaydogan.co</p>
            </div>
            <div>
              <h2 className={s.etiket}>On the desk</h2>
              <ul className={s.kisaListe}>
                {MASADA.map((m) => <li key={m.ad}><b>{m.durum.en}</b><span lang="tr">{m.ad}</span> · {m.tur.en}</li>)}
              </ul>
            </div>
            <div id="hereby">
              <h2 className={s.etiket}>The apps · <Link href="/en/by/">by. workshop</Link></h2>
              <p><Link href="/en/hereby/">hereby.</Link> Leave a thought in a place. Leave the line on your mind in the place you pass; only someone who comes there can read it. No likes, no followers. Free on the App Store.</p>
              <p><Link href="/en/nowby/">nowby.</Link> Shows, on one screen, the songs playing right now on stations that have given permission for their broadcasts to be shared. On iPhone, iPad, Mac, Apple TV and Apple Watch.</p>
              <p className={s.baglar}><Link href="/en/studio/">Work with the studio</Link></p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.alt} id="contact">
        <div>
          <a className={s.posta} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p className={s.not} style={{ maxWidth: 620 }}>Available for interviews in English. Translation and publishing rights: İskenderiye Yayınları — enquiries are welcome at the address above and will be forwarded. For review copies, please write to the same address.</p>
          <p className={s.not}>Archive: {arsiv.map(([href, ad], i) => <span key={href}>{i ? " · " : ""}<a href={href}>{ad}</a></span>)}</p>
        </div>
        <span>
          <a href={INSTAGRAM_URL} {...dis}>Instagram</a>
          <a href={YOUTUBE_URL} {...dis}>YouTube</a>
          <a href={SUBSTACK_URL} {...dis}>Substack (Turkish)</a>
          <Link href="/" hrefLang="tr" lang="tr">Türkçe</Link>
          <span>© 2026 · Istanbul</span>
        </span>
      </footer>
    </div>
  );
}
