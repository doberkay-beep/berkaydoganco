import type { Metadata } from "next";
import { FramebyYasalSayfa, h2 } from "@/components/FramebyYasalSayfa";

export const metadata: Metadata = {
  title: { absolute: "Gizlilik Politikası — frameby." },
  description: "frameby uygulaması hangi bilgileri kullanır: hesap yok, takip yok, kişisel veri toplanmaz.",
  alternates: { canonical: "/frameby/gizlilik", languages: { en: "/en/frameby/privacy" } },
};

export default function Sayfa() {
  return (
    <FramebyYasalSayfa baslik="Gizlilik politikası" guncelleme="25 Kasım 2026">
      <p>frameby’ı Berkay Doğan geliştirir. Bu sayfa, uygulamanın hangi bilgileri neden kullandığını açıklar. Kısaca: frameby senden hiçbir kişisel bilgi toplamaz.</p>
      <h2 style={h2}>Hesap yok</h2>
      <p>frameby kayıt istemez. Ad, e-posta, telefon numarası ya da konum alınmaz. Uygulama sana özel bir kimlik de oluşturmaz.</p>
      <h2 style={h2}>Kareler</h2>
      <p>Galerideki fotoğraflar Berkay Doğan’a ve kamu malı arşivlere aittir. Uygulama günün karelerini frameby sunucusundan indirir ve cihazında saklar. Bu sırada cihazının internet adresi (IP) sunucuya ulaşır, ama kaydedilmez ve seninle ilişkilendirilmez.</p>
      <h2 style={h2}>Radyo</h2>
      <p>Her karenin arkasında çalan radyo, doğrudan o radyonun kendi yayın adresinden çalar; ses kaydedilmez. Bu sırada cihazının internet adresi, her internet radyosunda olduğu gibi, o radyonun yayın sunucusuna ulaşır. Radyo listesi ve çalan şarkının adı nowby’ın veritabanından okunur; bu sırada senden hiçbir bilgi gönderilmez.</p>
      <h2 style={h2}>frameby+ aboneliği</h2>
      <p>Abonelik Apple üzerinden alınır ve yönetilir. Ödeme bilgilerin Apple’da kalır; biz yalnızca aboneliğin geçerli olup olmadığını görürüz. Apple’ın gizlilik politikası için: apple.com/legal/privacy.</p>
      <h2 style={h2}>Reklam, ölçüm ve takip yok</h2>
      <p>frameby reklam göstermez, kullanımını ölçen bir araç içermez, seni başka uygulamalar ya da siteler arasında takip etmez ve hiçbir veriyi satmaz.</p>
      <h2 style={h2}>KVKK kapsamında aydınlatma</h2>
      <p><strong>Veri sorumlusu:</strong> Berkay Doğan (iletişim: hello@berkaydogan.co).</p>
      <p><strong>İşlenen veriler:</strong> frameby kişisel veri işlemez. Kare ve radyo istekleri sırasında cihazının internet adresi teknik olarak sunuculara ulaşır; frameby bunu saklamaz. Abonelik bilgisi Apple’da tutulur.</p>
      <p><strong>Hakların (m.11):</strong> 6698 sayılı Kanun’un 11. maddesindeki haklarınla ilgili her başvurunu hello@berkaydogan.co adresine yazabilirsin; en geç 30 gün içinde yanıtlanır.</p>
    </FramebyYasalSayfa>
  );
}
