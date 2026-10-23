import type { Metadata } from "next";
import { WrittenbySanatci, SANATCI_TR } from "@/components/WrittenbySanatci";

export const metadata: Metadata = {
  title: { absolute: "writtenby. — Sanatçılar" },
  description: "writtenby.'nin sanatçı katmanı: bir şehrin satırları arasında, seçilmiş sanatçıların imzalı sayfaları. Başvuru ya da davetle; konu ve biçim serbest. İstanbul 2027 kitabında buluşur.",
  alternates: { canonical: "/writtenby/sanatcilar", languages: { tr: "/writtenby/sanatcilar", en: "/en/writtenby/artists" } },
  openGraph: { title: "writtenby. — Sanatçılar", description: "Bir şehrin satırları arasında, imzalı sayfalar.", images: ["/writtenby/poster.jpg"] },
};

export default function Sayfa() {
  return <WrittenbySanatci m={SANATCI_TR} />;
}
