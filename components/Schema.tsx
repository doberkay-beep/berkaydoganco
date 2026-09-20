import { TRENDYOL_URL } from "@/lib/content";
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
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
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
          "İstanbul'da yaşayan şair ve yazar. Kitapları: Mürekkep ve Köz (şiir) ve Tasfiye (deneme).",
        hasOccupation: [
          { "@type": "Occupation", name: "Yazar" },
          { "@type": "Occupation", name: "Şair" },
        ],
        knowsAbout: ["Şiir", "Deneme", "Türk edebiyatı", "Modern Türk şiiri"],
        nationality: "TR",
        homeLocation: { "@type": "Place", name: "İstanbul, Türkiye" },
        sameAs: [
          INSTAGRAM_URL,
          YOUTUBE_URL,
          SUBSTACK_URL,
          GOODREADS_URL,
          "https://necaliyor.co",
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

/** Tasfiye — Book (yakında) */
export function TasfiyeBookSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Book",
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

