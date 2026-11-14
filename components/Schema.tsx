import { TRENDYOL_URL } from "@/lib/content";
import { BASIN, EKRAN } from "@/lib/basinda";
import { TASFIYE_URL, PERSON_ID, AUTHOR_REF, SUBSTACK_URL, YOUTUBE_URL, INSTAGRAM_URL, GOODREADS_URL } from "@/lib/site";

const SITE = "https://www.berkaydogan.co";

// Yeniden kullanılabilir breadcrumb — bölüm sayfaları için (Ana → Bölüm).
export function BreadcrumbSchema({ name, path }: { name: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
        ],
      }}
    />
  );
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


// Basında çıkan yazılar → Person/uygulama kaydına "subjectOf" olarak bağlanır (Google haberleri kişiyle eşleştirsin).
// Tek kaynak lib/basinda.ts: yeni haber oraya eklenince burası da kendiliğinden güncellenir.
function basinYazilari(filtre?: (b: (typeof BASIN)[number]) => boolean) {
  return BASIN.filter((b) => (filtre ? filtre(b) : true)).map((b) => ({
    "@type": b.tur === "haber" ? "NewsArticle" : "Article",
    headline: b.baslik.tr,
    url: b.url,
    datePublished: b.sadeceAy ? b.tarihISO.slice(0, 7) : b.tarihISO,
    publisher: { "@type": "Organization", name: b.yayin },
    about: { "@id": PERSON_ID },
  }));
}

/** /hereby — SoftwareApplication (uygulama kimliği + hakkındaki haberler) */
export function HerebyAppSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${SITE}/hereby#app`,
        name: "hereby.",
        alternateName: "hereby",
        url: `${SITE}/hereby`,
        description: "Aklından geçen satırı geçtiğin yere bırak; yalnızca oraya gelen okuyabilir. Beğeni yok, takipçi yok.",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "iOS 26 ve üzeri",
        offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        datePublished: "2026-10-28",
        inLanguage: ["tr", "en"],
        sameAs: ["https://apps.apple.com/tr/app/hereby/id6825787016", "https://www.wikidata.org/wiki/Q142153975"],
        subjectOf: basinYazilari((b) => b.tur === "haber"),
      }}
    />
  );
}

/** Ana sayfa — WebSite (site kimliği + yazar entity'sine bağ) */
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "Berkay Doğan",
        inLanguage: "tr",
        publisher: { "@id": PERSON_ID },
      }}
    />
  );
}

/** /hakkimda — ProfilePage (kişi profili; Knowledge Panel için güçlü sinyal) */
export function ProfilePageSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: `${SITE}/hakkimda/`,
        name: "Berkay Doğan — Hakkında",
        // Google, ProfilePage'in mainEntity'sini satır içi Person olarak istiyor (yalnız @id geçersiz sayılıyor).
        mainEntity: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: "Berkay Doğan",
          url: SITE,
          image: `${SITE}/images/portre.jpg`,
          jobTitle: "Şair ve yazar",
        },
        isPartOf: { "@id": `${SITE}/#website` },
      }}
    />
  );
}

/** Ana sayfa — Person */
export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Berkay Doğan",
        alternateName: "Berkay Dogan",
        url: SITE,
        image: `${SITE}/images/portre.jpg`,
        jobTitle: "Şair ve yazar",
        disambiguatingDescription: "Türk şair ve yazar; Mürekkep ve Köz (şiir) ve Tasfiye (deneme) kitaplarının yazarı.",
        description:
          "İstanbul'da yaşayan şair ve yazar. Kitapları: Mürekkep ve Köz (şiir, 2025) ve Tasfiye (deneme, 2026). Konum tabanlı not uygulaması hereby'nin ve radyolarda o an çalan şarkıyı gösteren nowby'ın (nowby.co) geliştiricisi.",
        birthDate: "2000",
        alumniOf: { "@type": "CollegeOrUniversity", name: "Trakya Üniversitesi", sameAs: "https://www.wikidata.org/wiki/Q845682" },
        hasOccupation: [
          { "@type": "Occupation", name: "Yazar" },
          { "@type": "Occupation", name: "Şair" },
        ],
        knowsAbout: ["Şiir", "Deneme", "Türk edebiyatı", "Modern Türk şiiri"],
        nationality: "TR",
        homeLocation: { "@type": "Place", name: "İstanbul, Türkiye" },
        sameAs: [
          "https://www.wikidata.org/wiki/Q141592752",
          "https://x.com/thisisbdgn",
          INSTAGRAM_URL,
          YOUTUBE_URL,
          SUBSTACK_URL,
          GOODREADS_URL,
          "https://1000kitap.com/BerkayDogan01",
          "https://open.spotify.com/show/033qeXeBwqI0ZArYivqfaL",
          "https://nowby.co",
          "https://necaliyor.co",
        ],
        mainEntityOfPage: `${SITE}/hakkimda/`,
        subjectOf: [
          ...basinYazilari(),
          ...EKRAN.filter((e) => e.link).map((e) => ({
            "@type": "VideoObject",
            name: e.baslik,
            url: e.link,
            uploadDate: e.tarihISO,
            publisher: { "@type": "Organization", name: e.kanal },
            about: { "@id": PERSON_ID },
          })),
        ],
      }}
    />
  );
}

/** Mürekkep ve Köz — Book (yayında) */
export function MurekkepBookSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Book",
        "@id": `${SITE}/kitaplar/murekkep-ve-koz/#book`,
        name: "Mürekkep ve Köz: Bir Şairin Hesabı",
        author: AUTHOR_REF,
        publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
        isbn: "978-625-9620-32-9",
        datePublished: "2025-12",
        inLanguage: "tr",
        genre: "Şiir",
        image: `${SITE}/murekkep-ve-koz-on-kapak.jpg`,
        url: `${SITE}/kitaplar/murekkep-ve-koz/`,
        offers: {
          "@type": "Offer",
          price: "269",
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
          url: TRENDYOL_URL,
        },
      }}
    />
  );
}

/** Tasfiye — Book (25 Ağustos 2026'da çıktı) */
export function TasfiyeBookSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Book",
        "@id": `${SITE}/kitaplar/tasfiye/#book`,
        name: "Tasfiye",
        author: AUTHOR_REF,
        publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
        isbn: "978-625-9031-24-8",
        numberOfPages: 151,
        datePublished: "2026-08-25",
        inLanguage: "tr",
        genre: "Deneme",
        image: `${SITE}/tasfiye-on-kapak.jpg`,
        url: `${SITE}/kitaplar/tasfiye/`,
        offers: {
          "@type": "Offer",
          url: TASFIYE_URL,
          price: "289",
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
        },
      }}
    />
  );
}

