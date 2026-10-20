import type { Metadata } from "next";
import Link from "next/link";
import { HerebySayfa } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "hereby. — Düşünceni bir yere bırak" },
  description: "Hereby, aklından geçen satırı geçtiğin yere bırakmanın yolu. Bir iz yalnızca oraya gidince okunur. Beğeni yok, takipçi yok.",
  alternates: { canonical: "/hereby" },
};

export default function HerebyPage() {
  return (
    <HerebySayfa ust="Berkay Doğan'ın bir uygulaması" baslik="Düşünceni bir yere bırak." guncelleme="20 Ekim 2026">
      <p>İnsanlar düşünmeyi unuttu. Bazen düşünürken içinden geçirirsin ve o düşünceni ancak o yere yeniden gittiğinde hatırlarsın.</p>
      <p>Hereby, o düşünceyi o yere bırakmanın yolu. Bir vapur iskelesinde, bir merdivende, bir sahilde aklından geçen satırı yaz ve bırak. O satırı yalnızca oraya gelen biri okuyabilir. Beğeni yok, takipçi yok; sadece yerler ve cümleler.</p>
      <p>Uygulama şu an deneme aşamasında. <Link href="/hereby/kosullar" style={{ textDecoration: "underline" }}>Kullanım koşulları</Link> · <Link href="/hereby/gizlilik" style={{ textDecoration: "underline" }}>Gizlilik politikası</Link></p>
    </HerebySayfa>
  );
}
