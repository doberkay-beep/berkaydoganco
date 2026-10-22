import type { Metadata } from "next";
import { NowbyYasal, h2 } from "@/components/NowbyYasal";

export const metadata: Metadata = {
  title: { absolute: "Gizlilik Politikası — nowby." },
  description: "nowby. uygulamasının hangi bilgileri neden kullandığı: hesap yok, konum yok, reklam ve takip yok.",
  alternates: { canonical: "/nowby/gizlilik", languages: { tr: "/nowby/gizlilik", en: "/en/nowby/privacy" } },
};

export default function GizlilikPage() {
  return (
    <NowbyYasal baslik="Gizlilik politikası" guncelleme="22 Ekim 2026">
      <p>nowby'ı Berkay Doğan geliştirir. Bu sayfa; iPhone, iPad, Mac, Apple TV ve Apple Watch'taki nowby. uygulamalarının hangi bilgileri neden kullandığını açıklar.</p>
      <h2 style={h2}>Hesap yok</h2>
      <p>nowby. kayıt istemez. Adın, e-postan, telefon numaran ya da konumun alınmaz.</p>
      <h2 style={h2}>Radyo yayınları</h2>
      <p>Bir radyoyu dinlediğinde yayın doğrudan o radyonun kendi sunucusundan çalınır; radyo, her internet bağlantısında olduğu gibi IP adresini görür. Bazı yayınlar teknik nedenle nowby.co üzerinden aktarılır; bu durumda IP adresin yalnızca kötüye kullanımı sınırlamak için anlık kullanılır ve kaydedilmez. Barındırma sağlayıcımızın (Vercel) olağan sunucu kayıtları dışında hiçbir kayıt tutulmaz.</p>
      <h2 style={h2}>Şarkı bilgileri ve arama</h2>
      <p>Radyolarda çalan şarkılar nowby.co'dan alınır. Uygulamada yaptığın aramalar sonuçları getirmek için sunucuya gönderilir, saklanmaz.</p>
      <h2 style={h2}>Radyo notları (Kalp defteri)</h2>
      <p>Bir radyonun altına bıraktığın kısa notlar herkese açıktır ve adsız olarak saklanır; kimin yazdığı kaydedilmez. Kurallara aykırı notlar kaldırılır. Bıraktığın kalpler anlık olarak dinleyenlere gösterilir, saklanmaz.</p>
      <h2 style={h2}>"Şu an seninle dinleyenler" ve Birlikte dinle</h2>
      <p>Aynı radyoyu dinleyenlerin sayısını gösterebilmek için uygulama, telefonuna özel rastgele bir sayı kullanır. Bu sayı yalnızca dinlediğin süre boyunca anlık olarak paylaşılır, hiçbir yerde saklanmaz ve seninle ilişkilendirilmez. Birlikte dinle odaları da rastgele bir kodla, yalnızca oda açıkken çalışır.</p>
      <h2 style={h2}>Hafıza kodu (isteğe bağlı)</h2>
      <p>İstersen favorilerini, Av Defteri'ni ve takip ettiğin sanatçıları rastgele bir hafıza koduyla yedekleyebilirsin. Yedek, yalnızca bu koda bağlı olarak sunucuda saklanır; kodu bilen herkes yedeği geri yükleyebilir, o yüzden kodunu kimseyle paylaşma. Yedeğinin silinmesini istersen kodunu do.berkay@icloud.com adresine gönderman yeterli.</p>
      <h2 style={h2}>İstasyon önerisi ve yanlış şarkı bildirimi</h2>
      <p>Gönderdiğin öneri ya da bildirim metni, incelenmek üzere adsız olarak saklanır.</p>
      <h2 style={h2}>Yalnızca cihazında kalanlar</h2>
      <p>Favorilerin, Av Defteri'n, dinleme sürelerin, radyo alarmın ve ayarların yalnızca cihazında saklanır. Cihazların arasında eşitlemek için Apple'ın iCloud hizmeti kullanılır; bu veriler senin iCloud hesabında kalır, bize gelmez. Apple Watch ile iPhone arasındaki bağlantı ve ana ekran bileşeni de yalnızca cihazların arasında çalışır. Radyo alarmı bildirimleri telefonunda oluşturulur.</p>
      <h2 style={h2}>Reklam, analitik ve takip yok</h2>
      <p>nowby. reklam göstermez, analitik ya da reklam aracı kullanmaz, seni başka uygulamalar ya da siteler arasında takip etmez ve verini satmaz. nowby. şarkıları sayar, insanları değil.</p>
      <h2 style={h2}>Verilerin nerede?</h2>
      <p>Radyo notları, hafıza kodu yedekleri ve bildirimler Supabase altyapısıyla Japonya'da (Tokyo) bulunan sunucularda; nowby.co sitesi Vercel altyapısında saklanır.</p>
      <h2 style={h2}>KVKK kapsamında aydınlatma</h2>
      <p><strong>Veri sorumlusu:</strong> Berkay Doğan (iletişim: do.berkay@icloud.com).</p>
      <p><strong>İşlenen veriler:</strong> radyo notlarının, önerilerin ve bildirimlerin metni ile tarihi; isteğe bağlı hafıza kodu yedeği (favoriler, Av Defteri, takip edilen sanatçılar). Ad, e-posta, telefon numarası, konum gibi kimlik bilgileri işlenmez.</p>
      <p><strong>Amaç ve hukuki sebep:</strong> veriler, nowby. hizmetinin sunulması (6698 sayılı Kanun m.5/2-c) ile kurallara aykırı içeriğin incelenmesi ve hizmetin kötüye kullanılmasının önlenmesi (m.5/2-f, meşru menfaat) amacıyla işlenir. Reklam, profilleme ya da pazarlama amacıyla işlenmez.</p>
      <p><strong>Aktarım:</strong> veriler barındırma hizmeti için Japonya'daki (Supabase) ve Vercel'in sunucularında saklanır; bu nedenle yurt dışına aktarılmış olur. Başka hiçbir üçüncü kişiyle paylaşılmaz; yasal bir zorunluluk olursa yetkili mercilerle paylaşılabilir.</p>
      <p><strong>Saklama süresi:</strong> radyo notları kaldırılana kadar, öneri ve bildirimler incelendikten sonra makul bir süre, hafıza kodu yedekleri sen silinmesini isteyene kadar saklanır.</p>
      <p><strong>Hakların (m.11):</strong> verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, işlenme amacını öğrenme, aktarıldığı kişileri bilme, eksik ya da yanlışsa düzeltilmesini, silinmesini isteme, itiraz etme ve zarara uğradıysan giderilmesini talep etme haklarına sahipsin. Başvurularını do.berkay@icloud.com adresine gönderebilirsin.</p>
    </NowbyYasal>
  );
}
