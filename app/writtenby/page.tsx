import type { Metadata } from "next";
import { WrittenbySayfa, WRITTENBY_TR } from "@/components/WrittenbySayfa";

export const metadata: Metadata = {
  title: { absolute: "writtenby. — Bir şehrin yazdığı kitap" },
  description: "writtenby.: her gün herkese aynı soru, bulunduğun yerden tek satır. Yıl sonunda Berkay Doğan bu satırlardan basılı bir kitap kuruyor. İlk kitap: İstanbul 2027.",
  alternates: { canonical: "/writtenby", languages: { tr: "/writtenby", en: "/en/writtenby" } },
  openGraph: { title: "writtenby. — Bir şehrin yazdığı kitap", description: "Günde tek soru, bulunduğun yerden tek satır, yıl sonunda basılı kitap. İstanbul 2027.", images: ["/writtenby/poster.jpg"] },
};

export default function Sayfa() {
  return <WrittenbySayfa m={WRITTENBY_TR} />;
}
