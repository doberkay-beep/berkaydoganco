import type { Metadata } from "next";
import { FramebyYasalSayfa, h2 } from "@/components/FramebyYasalSayfa";

export const metadata: Metadata = {
  title: { absolute: "Kullanım Koşulları — frameby." },
  description: "frameby uygulamasının ve frameby+ aboneliğinin kullanım koşulları.",
  alternates: { canonical: "/frameby/kosullar", languages: { en: "/en/frameby/terms" } },
};

export default function Sayfa() {
  return (
    <FramebyYasalSayfa baslik="Kullanım koşulları" guncelleme="25 Kasım 2026">
      <p>frameby, evdeki ekranı gerçek bir yerin gerçek bir anına açan küçük bir galeridir. Uygulamayı kullanarak aşağıdaki koşulları kabul etmiş olursun. Bunlara ek olarak Apple’ın standart son kullanıcı lisans sözleşmesi (apple.com/legal/internet-services/itunes/dev/stdeula) geçerlidir.</p>
      <h2 style={h2}>Ücretsiz olanlar</h2>
      <p>Uygulama, radyolar, Gün katmanı ve Eski İstanbul katmanı ücretsizdir. Radyolar hiçbir zaman aboneliğe bağlanmaz.</p>
      <h2 style={h2}>frameby+ aboneliği</h2>
      <p>frameby+, Berkay Doğan’ın fotoğraf katmanlarını ve ileride eklenecek canlı kareleri açan yıllık bir aboneliktir. Fiyatı satın alma ekranında gösterilir. İlk kez abone olanlar için 7 günlük ücretsiz deneme vardır.</p>
      <p>Ödeme, satın almayı onayladığında Apple hesabından alınır. Abonelik, dönem bitmeden en az 24 saat önce iptal edilmedikçe her yıl kendiliğinden yenilenir ve yenileme bedeli dönem bitmeden önceki 24 saat içinde alınır. Aboneliğini Apple hesabının ayarlarından yönetebilir ve iptal edebilirsin. Ücretsiz deneme süresi içinde abone olursan denemenin kalan kısmı geçersiz olur. İadeler Apple’ın kurallarına tabidir.</p>
      <p>İlk abonelerin fiyatı, abonelikleri sürdükçe artırılmaz.</p>
      <h2 style={h2}>Kişisel kullanım</h2>
      <p>frameby evde ve kişisel kullanım içindir. Kafe, otel, mağaza gibi halka açık yerlerde ekranda oynatmak, radyo yayınları için ayrıca lisans gerektirebilir; bu kullanım frameby’ın kapsamında değildir.</p>
      <h2 style={h2}>Fotoğraflar ve radyolar</h2>
      <p>Galerideki fotoğrafların hakları Berkay Doğan’a aittir; Eski İstanbul katmanındaki fotoğraflar kamu malıdır ve fotoğrafçılarının adıyla gösterilir. Fotoğrafları uygulama dışında çoğaltamaz, satamaz ya da yayımlayamazsın. Radyo yayınları ve şarkılar kendi sahiplerine aittir; frameby onları yalnızca kendi resmî adreslerinden, canlı olarak çalar ve kaydetmez.</p>
      <h2 style={h2}>Değişiklikler</h2>
      <p>Katmanlar ve kareler zaman içinde değişebilir. Bu koşullarda önemli bir değişiklik olursa bu sayfada duyurulur.</p>
      <h2 style={h2}>Sorumluluk</h2>
      <p>frameby olduğu gibi sunulur. Radyoların yayınları kendi sunucularına bağlıdır; bir radyo susarsa uygulama başka bir radyoya geçer.</p>
    </FramebyYasalSayfa>
  );
}
