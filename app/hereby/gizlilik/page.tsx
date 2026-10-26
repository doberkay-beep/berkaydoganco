import type { Metadata } from "next";
import { HerebySayfa, h2 } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "Gizlilik Politikası — hereby." },
  description: "Hereby uygulamasının hangi bilgileri neden kullandığı: yaklaşık konum, bıraktığın izler, reklam ve takip yok.",
  alternates: { canonical: "/hereby/gizlilik" },
};

export default function GizlilikPage() {
  return (
    <HerebySayfa ust="Hereby" baslik="Gizlilik politikası" guncelleme="22 Ekim 2026">
      <p>Hereby'yi Berkay Doğan geliştirir. Bu sayfa, uygulamanın hangi bilgileri neden kullandığını açıklar.</p>
      <h2 style={h2}>Hesap</h2>
      <p>Hereby kayıt istemez. Uygulama açıldığında telefonuna özel, anonim bir kimlik oluşturulur. Adın, e-postan ya da telefon numaran alınmaz. Bu kimlik telefonunun Anahtar Zinciri'nde saklanır; uygulamayı silip yeniden kursan da izlerin seninle kalır.</p>
      <h2 style={h2}>Konum</h2>
      <p>Yakınındaki izleri göstermek ve bırakacağın izin yerini belirlemek için konumun kullanılır. Anlık konumun başka kullanıcılara gösterilmez ve sunucuda saklanmaz. Bir iz ya da satır bıraktığında o yerin konumu yaklaşık 10 metre hassasiyetle saklanır; diğer kullanıcılara ise tam nokta yerine yaklaşık 150 metrelik bir alan olarak gösterilir.</p>
      <p>Sık bulunduğun yerlere (evin, okulun gibi) iz bırakmadan önce seni uyarmak için, hangi bölgede kaç farklı gün bulunduğun yalnızca telefonunda tutulur; hiçbir sunucuya gönderilmez.</p>
      <h2 style={h2}>Yakınlık bildirimi (isteğe bağlı)</h2>
      <p>"Yakınında bir iz olunca haber ver" ayarı kapalı gelir. Açarsan, konumun arka planda ve yalnızca önemli yer değişikliklerinde (yaklaşık 500 metrede bir) kullanılır: uygulama sunucuya yakınında açılabilir bir iz olup olmadığını sorar ve varsa sana bildirim gönderir. Bu sorgularda konumun saklanmaz. Ayarı istediğin zaman kapatabilirsin.</p>
      <h2 style={h2}>Mahlas (isteğe bağlı)</h2>
      <p>İstersen bir mahlas seçip izlerini onunla imzalayabilirsin; her izde ayrıca sorulur. Mahlas yalnızca imzaladığın izlerde, o izi okuyan kişilere görünür; mahlastan bir kişinin bütün izlerine ulaşılamaz. Mahlası kaldırdığında geçmiş imzaların da adsız olur.</p>
      <h2 style={h2}>Kendine izler ve zaman kapsülleri</h2>
      <p>"Yalnız bana" seçeneğiyle bıraktığın izler yalnızca sana görünür; o yere döndüğünde hatırlatabilmek için bu izlerin tam noktası saklanır ve başka hiçbir kullanıcıya gösterilmez. Hatırlatma, yalnızca yakınlık bildirimini açtıysan ve telefonun izin verdiyse çalışır; bu kontrol telefonunda yapılır, konumun sunucuya gönderilmez. Zaman kapsülleri açılış tarihine kadar kimse tarafından okunamaz.</p>
      <h2 style={h2}>Bıraktığın izler ve cevaplar</h2>
      <p>Yazdığın satırlar, bıraktığın yerin yaklaşık konumuyla birlikte saklanır ve o yere gelen kullanıcılara adsız olarak gösterilir. Kimin yazdığı hiçbir kullanıcıya gösterilmez.</p>
      <h2 style={h2}>writtenby. (Kitap sekmesi)</h2>
      <p>Kitap sekmesinde yazdığın satırlar; yazdığın yerin konumu ve semt adıyla birlikte saklanır ve o yere gelen kullanıcılara adsız olarak gösterilir. Basım izni kendiliğinden kapalıdır. İzin verdiğin satırlar, yıl sonunda basılacak kitap için Berkay Doğan tarafından derlenebilir; kitapta mahlasınla ya da adsız yer alırsın. Kitap baskıya gidene kadar iznini geri alabilir, satırını tamamen çekebilirsin.</p>
      <h2 style={h2}>Şarkı iliştirme</h2>
      <p>Bir ize o an radyoda çalan şarkıyı iliştirirsen, şarkının ve radyonun adı izle birlikte saklanır. Şarkı listesi nowby.co'dan alınır; bu sırada senden hiçbir bilgi gönderilmez.</p>
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
      <h2 style={h2}>KVKK kapsamında aydınlatma</h2>
      <p><strong>Veri sorumlusu:</strong> Berkay Doğan (iletişim: hello@berkaydogan.co).</p>
      <p><strong>İşlenen veriler:</strong> telefonuna özel anonim kimlik numarası; bıraktığın izlerin, cevapların ve writtenby. satırlarının metni, tarihi, konumu ve semt adı; basım izni tercihin; isteğe bağlı mahlasın; şikâyet ve engelleme kayıtları. Ad, e-posta, telefon numarası gibi kimlik bilgileri işlenmez.</p>
      <p><strong>Amaç ve hukuki sebep:</strong> veriler, Hereby hizmetinin sunulması (6698 sayılı Kanun m.5/2-c, sözleşmenin kurulması ve ifası) ile kullanıcıların güvenliği ve kurallara aykırı içeriğin incelenmesi (m.5/2-f, meşru menfaat) amacıyla işlenir. Reklam, profilleme ya da satış amacıyla işlenmez.</p>
      <p><strong>Aktarım:</strong> veriler, barındırma hizmeti için Supabase altyapısıyla Almanya'daki (Avrupa Birliği) sunucularda saklanır; bu nedenle yurt dışına aktarılmış olur. Veriler başka hiçbir üçüncü kişiyle paylaşılmaz; yasal bir zorunluluk olursa yetkili mercilerle paylaşılabilir.</p>
      <p><strong>Saklama süresi:</strong> izlerin ve cevapların, sen silene ya da kurallara aykırı olduğu için kaldırılana kadar saklanır. Verilerimi sil dediğinde anonim kimliğinle birlikte hepsi kalıcı olarak silinir.</p>
      <p><strong>Hakların (m.11):</strong> verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, işlenme amacını öğrenme, aktarıldığı kişileri bilme, eksik ya da yanlışsa düzeltilmesini, silinmesini isteme, itiraz etme ve zarara uğradıysan giderilmesini talep etme haklarına sahipsin. Başvurunu hello@berkaydogan.co adresine yazabilirsin; en geç 30 gün içinde yanıtlanır. Anonim kimlikle çalıştığımız için başvurunda hangi izden söz ettiğini belirtmen gerekebilir.</p>
    </HerebySayfa>
  );
}
