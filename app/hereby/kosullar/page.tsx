import type { Metadata } from "next";
import { HerebySayfa, h2 } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "Kullanım Koşulları — hereby." },
  description: "Hereby uygulamasının kullanım koşulları: burada ne bırakılır, ne bırakılmaz.",
  alternates: { canonical: "/hereby/kosullar" },
};

export default function KosullarPage() {
  return (
    <HerebySayfa ust="Hereby" baslik="Kullanım koşulları" guncelleme="20 Ekim 2026">
      <p>Bir yere yazmak, birini o yere çağırmaktır. Hereby'yi kullanarak aşağıdaki kuralları kabul etmiş olursun.</p>
      <h2 style={h2}>Burada düşünceler bırakılır</h2>
      <p>Hereby, bir yerin sana düşündürdüklerini bırakman için. Bir satır, bir dize, bir itiraf. Bir iz en fazla 280 karakterdir.</p>
      <h2 style={h2}>Kimseyi ifşa etme</h2>
      <p>Bir kişinin adını, adresini, telefonunu, fotoğrafını ya da onu tanıtacak başka bilgileri yazma. Kendi kişisel bilgilerini de paylaşma.</p>
      <h2 style={h2}>Kimseye zarar verme</h2>
      <p>Taciz, tehdit, nefret söylemi, ayrımcılık, şiddete çağrı ve yasa dışı içerik yasaktır.</p>
      <h2 style={h2}>Reklam ve spam yok</h2>
      <p>Hereby bir duyuru panosu değildir. Ticari tanıtım ve tekrarlayan içerik kaldırılır.</p>
      <h2 style={h2}>Şikâyet, engelleme ve kaldırma</h2>
      <p>Rahatsız edici bir izi uygulama içinden şikâyet edebilir, yazarını engelleyebilirsin. Üç farklı kişinin şikâyet ettiği bir iz incelenene kadar herkesten gizlenir. Kurallara uymayan izler kaldırılır; kuralları tekrar tekrar çiğneyenlerin erişimi kapatılır. Şikâyetler en geç 24 saat içinde incelenir.</p>
      <h2 style={h2}>Zor bir andaysan</h2>
      <p>Kendine ya da bir başkasına zarar verme düşüncen varsa 112'yi ara.</p>
      <h2 style={h2}>İçeriğin sana ait</h2>
      <p>Bıraktığın satırlar sana aittir. Onları Hereby'de, o yere gelenlere gösterilmek üzere paylaşırsın. İzlerini ve hesabını uygulama içinden istediğin zaman silebilirsin.</p>
      <h2 style={h2}>Sorumluluk</h2>
      <p>Hereby deneme aşamasında bir uygulamadır ve olduğu gibi sunulur. İzlerin içeriğinden onları yazan kullanıcılar sorumludur.</p>
    </HerebySayfa>
  );
}
