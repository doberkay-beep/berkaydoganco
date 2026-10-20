import type { Metadata } from "next";
import { HerebySayfa, h2 } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "Gizlilik Politikası — hereby." },
  description: "Hereby uygulamasının hangi bilgileri neden kullandığı: yaklaşık konum, bıraktığın izler, reklam ve takip yok.",
  alternates: { canonical: "/hereby/gizlilik" },
};

export default function GizlilikPage() {
  return (
    <HerebySayfa ust="Hereby" baslik="Gizlilik politikası" guncelleme="20 Ekim 2026">
      <p>Hereby'yi Berkay Doğan geliştirir. Bu sayfa, uygulamanın hangi bilgileri neden kullandığını açıklar.</p>
      <h2 style={h2}>Hesap</h2>
      <p>Hereby kayıt istemez. Uygulama açıldığında telefonuna özel, anonim bir kimlik oluşturulur. Adın, e-postan ya da telefon numaran alınmaz.</p>
      <h2 style={h2}>Konum</h2>
      <p>Yakınındaki izleri göstermek ve bırakacağın izin yerini belirlemek için konumun yaklaşık olarak (yaklaşık 100 metre hassasiyetle) kullanılır. Anlık konumun başka kullanıcılara gösterilmez ve sunucuda saklanmaz. Bir izin yeri de tam nokta yerine yaklaşık bir alan olarak gösterilir.</p>
      <p>Sık bulunduğun yerlere (evin, okulun gibi) iz bırakmadan önce seni uyarmak için, hangi bölgede kaç farklı gün bulunduğun yalnızca telefonunda tutulur; hiçbir sunucuya gönderilmez.</p>
      <h2 style={h2}>Bıraktığın izler ve cevaplar</h2>
      <p>Yazdığın satırlar, bıraktığın yerin yaklaşık konumuyla birlikte saklanır ve o yere gelen kullanıcılara adsız olarak gösterilir. Kimin yazdığı hiçbir kullanıcıya gösterilmez.</p>
      <h2 style={h2}>Hesap defteri</h2>
      <p>Gece sorularına verdiğin cevaplar yalnızca telefonunda saklanır, hiçbir sunucuya gönderilmez. Bir cevabı iz olarak bırakmayı seçersen yalnızca o satır paylaşılır.</p>
      <h2 style={h2}>Şikâyetler ve engellemeler</h2>
      <p>Şikâyet ettiğin izler ve sebebi incelenmek üzere kaydedilir. Engellediğin kişiyle ilgili kayıt, onun izlerini sana göstermemek için tutulur; engellenen kişi bunu bilmez.</p>
      <h2 style={h2}>Reklam ve takip yok</h2>
      <p>Hereby reklam göstermez, seni başka uygulamalar ya da siteler arasında takip etmez ve verini satmaz.</p>
      <h2 style={h2}>Verilerin nerede?</h2>
      <p>Veriler, Supabase altyapısıyla Avrupa Birliği'nde (Frankfurt) bulunan sunucularda saklanır.</p>
      <h2 style={h2}>Silme</h2>
      <p>Uygulamada İzlerim → Verilerimi sil ile bütün izlerin, cevapların ve anonim kimliğin kalıcı olarak silinir.</p>
    </HerebySayfa>
  );
}
