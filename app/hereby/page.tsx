import type { Metadata } from "next";
import { HerebyTanitim, HEREBY_TR } from "@/components/HerebyTanitim";

export const metadata: Metadata = {
  title: { absolute: "hereby. — Düşünceni bir yere bırak" },
  description: "Berkay Doğan'ın uygulaması Hereby: aklından geçen satırı geçtiğin yere bırak, yalnızca oraya gelen okusun. Şiir yürüyüşleri, zaman kapsülleri, kendine notlar. Beğeni yok, takipçi yok.",
  alternates: { canonical: "/hereby", languages: { tr: "/hereby", en: "/en/hereby" } },
  openGraph: { title: "hereby. — Düşünceni bir yere bırak", description: "Aklından geçen satırı geçtiğin yere bırak. Okumak için oraya gitmen gerek.", images: ["/hereby/vitrin-1.jpg"] },
};

export default function HerebyPage() {
  return <HerebyTanitim m={HEREBY_TR} />;
}
