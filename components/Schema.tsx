import { TRENDYOL_URL } from "@/lib/content";

const SITE = "https://www.berkaydogan.co";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
        name: "Berkay Doğan",
        url: SITE,
        image: `${SITE}/images/portre.jpg`,
        jobTitle: "Şair ve yazar",
        nationality: "TR",
        homeLocation: { "@type": "Place", name: "İstanbul, Türkiye" },
        sameAs: [
          "https://instagram.com/berkaydgn__",
          "https://youtube.com/@yazarberkaydogan",
          "https://www.goodreads.com/book/show/252900764-m-rekkep-ve-k-z",
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
        author: { "@type": "Person", name: "Berkay Doğan", url: SITE },
        publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
        isbn: "978-625-9620-32-9",
        datePublished: "2025-12",
        inLanguage: "tr",
        genre: "Şiir",
        image: `${SITE}/murekkep-ve-koz-on-kapak.jpg`,
        url: `${SITE}/murekkep-ve-koz/`,
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
        author: { "@type": "Person", name: "Berkay Doğan", url: SITE },
        publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
        isbn: "978-625-92142-2-1",
        datePublished: "2026-08-25",
        inLanguage: "tr",
        genre: "Deneme",
        image: `${SITE}/tasfiye-on-kapak.jpg`,
        url: `${SITE}/tasfiye/`,
      }}
    />
  );
}

