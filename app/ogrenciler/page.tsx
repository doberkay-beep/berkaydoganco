import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, INSTAGRAM_URL } from "@/lib/site";
import { KITAP_ADI } from "@/lib/sozler";
import { CUMLELER, KONULAR_OGRENCI } from "@/lib/ogrenciler";
import { Muhur } from "@/components/Muhur";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Öğrenciler ve Öğretmenler İçin — Berkay Doğan" },
  description: "Ödevin ya da projen için yazarla röportaj, okul ve kulüp söyleşisi, derste tartışmak için kitaplardan cümleler.",
  alternates: { canonical: "/ogrenciler" },
  openGraph: {
    title: "Öğrenciler ve Öğretmenler İçin — Berkay Doğan",
    description: "Röportaj, okul söyleşisi ve derste tartışmak için cümleler.",
    url: "https://www.berkaydogan.co/ogrenciler",
    type: "website",
  },
};

/* ---- Veri ---- */

/* ---- Stil kısayolları ---- */
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };
const secStil: React.CSSProperties = { marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" };
const secBaslik: React.CSSProperties = { ...mono, letterSpacing: "0.22em", color: "var(--accent-2)", marginBottom: "1.5rem" };
const govde: React.CSSProperties = { fontSize: "1.02rem", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch" };
const buton: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.5rem", ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--paper, #fff)", background: "var(--accent)", padding: "0.85rem 1.3rem", borderRadius: "999px" };

const mailto = (konu: string, govdeMetni: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(govdeMetni)}`;

export default function OgrencilerPage() {
  return (
    <main lang="tr" style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <BreadcrumbSchema name="Öğrenciler ve öğretmenler" path="/ogrenciler/" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>
          <Muhur size={22} /> Berkay Doğan
        </Link>
        <Link href="/" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ ...mono, letterSpacing: "0.26em", color: "var(--accent-2)" }}>Öğrenciler ve öğretmenler için</span>
      <h1 className="cg-serif" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1.05, margin: "1rem 0 1.6rem", fontWeight: 600 }}>
        Sesin duyulsun.
      </h1>
      <p style={govde}>
        On yedi yaşında, lisenin son yılında yazmaya başladım. Bu yüzden bir öğrenciden gelen her soru
        benim için ayrı bir yerde duruyor.
      </p>
      <p style={{ ...govde, marginTop: "1rem" }}>
        Bir ödev, bir proje, bir kulüp etkinliği ya da sadece aklına takılan bir soru: yaz, cevap vereyim.
      </p>

      {/* 1 · Röportaj */}
      <section id="roportaj" style={secStil}>
        <h2 style={secBaslik}>01 · Ödevin ya da projen için röportaj</h2>
        <p style={govde}>
          Felsefe, edebiyat ya da Türkçe dersi için bir yazarla röportaj yapman gerekiyorsa sorularını e-postayla gönder;
          yazılı olarak yanıtlarım. Okulunu, dersini ve teslim tarihini de yazarsan ona göre zamanında dönerim.
        </p>
        <ul style={{ ...govde, marginTop: "1rem", paddingLeft: "1.2rem" }}>
          <li>Soruların kısa ya da uzun olabilir; "doğru" bir soru yoktur.</li>
          <li>Kitaplarımı okumuş olman gerekmiyor.</li>
          <li>Yanıtlarımı projende adımla birlikte kullanabilirsin.</li>
        </ul>
        <div style={{ marginTop: "1.6rem" }}>
          <a href={mailto("Öğrenci röportajı — [okul / ders]", "Merhaba Berkay Bey,\n\nAdım ... , ... okulunda ... sınıf öğrencisiyim. ... dersi için bir proje hazırlıyorum.\n\nTeslim tarihi: ...\n\nSorularım:\n1. \n2. \n3. \n")} style={buton}>
            Sorularımı gönder ↗
          </a>
        </div>
      </section>

      {/* 2 · Yazma çağrısı */}
      <section id="cagri" style={secStil}>
        <h2 style={secBaslik}>02 · Yazma çağrısı: Sesin Duyulsun</h2>
        <p className="cg-serif" style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.25, fontWeight: 600, maxWidth: "30ch", marginBottom: "1.2rem" }}>
          Bir şiirin ya da bir denemen mi var? Gönder; okuyayım.
        </p>
        <div style={{ display: "grid", gap: "0.9rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginBottom: "1.6rem" }}>
          {[
            ["Kimler", "Türkiye'deki lise ve üniversite öğrencileri"],
            ["Ne", "Kısa bir şiir (en fazla 30 dize) ya da kısa bir deneme (en fazla 500 kelime). Tema serbest."],
            ["Son gün", "21 Aralık 2026"],
            ["Sonra", "Seçilen 5 metin bu sitede yayımlanır; ilk üç metnin yazarına imzalı kitap seti gönderilir."],
          ].map(([b, a]) => (
            <div key={b} style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1rem 1.2rem" }}>
              <div style={{ ...mono, fontSize: "0.62rem", color: "var(--accent-2)" }}>{b}</div>
              <div style={{ fontSize: "0.98rem", lineHeight: 1.55, marginTop: "0.4rem" }}>{a}</div>
            </div>
          ))}
        </div>
        <ul style={{ ...govde, paddingLeft: "1.2rem", fontSize: "0.95rem" }}>
          <li>Metin sana ait ve özgün olmalı; yapay zekâyla yazılmamış olmalı.</li>
          <li>Metnin hakları sende kalır; yalnızca bu sitede yayımlama izni isterim.</li>
          <li>18 yaşından küçüksen, metnin yayımlanmadan önce velinin onayını isterim. İstersen adın yerine yalnızca ilk adın ya da bir takma ad görünür.</li>
          <li>Her metni kendim okuyorum; seçilenlere e-postayla haber veririm.</li>
        </ul>
        <div style={{ marginTop: "1.6rem" }}>
          <a href={mailto("Sesin Duyulsun — [şiir / deneme]", "Ad soyad: \nOkul ve sınıf: \nYaş: \nYayında görünmesini istediğim ad (ad, ilk ad ya da takma ad): \n\nMetnim (şiir ya da deneme):\n\n")} style={buton}>
            Metnimi gönder ↗
          </a>
        </div>
      </section>

      {/* 3 · Söyleşi */}
      <section id="soylesi" style={secStil}>
        <h2 style={secBaslik}>03 · Okul ve kulüp söyleşisi</h2>
        <p style={govde}>
          Lise ya da üniversite edebiyat, felsefe ve şiir kulüplerine, sınıflara çevrim içi ya da yüz yüze konuk olabilirim.
          Okul ve öğrenci kulüplerine yönelik söyleşiler <strong style={{ fontWeight: 600 }}>ücretsizdir</strong>. Konuyu birlikte belirleriz; işte birkaç öneri:
        </p>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1.6rem" }}>
          {KONULAR_OGRENCI.map(([b, a]) => (
            <div key={b} style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.1rem 1.3rem" }}>
              <div className="cg-serif" style={{ fontSize: "1.2rem", fontWeight: 600 }}>{b}</div>
              <div style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)", marginTop: "0.35rem" }}>{a}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.6rem" }}>
          <a href={mailto("Okul / kulüp söyleşisi daveti", "Merhaba Berkay Bey,\n\nOkul / kulüp: ...\nŞehir: ...\nÇevrim içi mi, yüz yüze mi: ...\nDüşündüğümüz tarih: ...\nKatılımcılar (yaklaşık sayı, sınıf): ...\n\n")} style={buton}>
            Söyleşiye davet et ↗
          </a>
        </div>
      </section>

      {/* 4 · Derste tartışmak için */}
      <section id="tartisma" style={secStil}>
        <h2 style={secBaslik}>04 · Derste tartışmak için</h2>
        <p style={govde}>
          Kitaplarımdan birebir alınmış cümleler ve her birinin altında sınıfta açılabilecek bir soru.
          Öğretmenler derste, öğrenciler ödevlerinde kaynak göstererek kullanabilir.
        </p>
        <div style={{ marginTop: "1.2rem" }}>
          <a href="/ogretmen-kiti.pdf" download style={{ ...buton, background: "transparent", color: "var(--ink)", border: "1px solid var(--accent)" }}>
            Öğretmen kitini indir (PDF, 4 sayfa) ↓
          </a>
        </div>
        <div style={{ display: "grid", gap: "1.1rem", marginTop: "1.8rem" }}>
          {CUMLELER.map((c) => (
            <figure key={c.s} style={{ margin: 0, borderLeft: "3px solid var(--accent)", padding: "0.4rem 0 0.4rem 1.2rem" }}>
              <blockquote className="cg-serif" style={{ margin: 0, fontSize: "1.25rem", lineHeight: 1.45, fontStyle: "italic" }}>“{c.s}”</blockquote>
              <figcaption style={{ ...mono, fontSize: "0.62rem", color: "var(--muted)", marginTop: "0.5rem" }}>{KITAP_ADI[c.soz.k]}</figcaption>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--ink)", marginTop: "0.6rem" }}>
                <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>Tartışma sorusu · </span>{c.soru}
              </p>
            </figure>
          ))}
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "1.6rem" }}>
          Daha fazlası: <Link href="/sozler/" style={{ borderBottom: "1px solid var(--accent)" }}>Sözler</Link> sayfasında kitaplardan iki yüz cümle.
        </p>
      </section>

      {/* 4 · İletişim */}
      <section id="iletisim" style={secStil}>
        <h2 style={secBaslik}>05 · Bana ulaş</h2>
        <p style={govde}>
          E-posta: <a href={`mailto:${EMAIL}`} style={{ borderBottom: "1px solid var(--accent)" }}>{EMAIL}</a>
          <br />
          Instagram: <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ borderBottom: "1px solid var(--accent)" }}>mesaj gönder ↗</a>
        </p>
        <p style={{ ...govde, marginTop: "1rem", color: "var(--muted)" }}>Gelen her mesajı kendim okuyor ve yanıtlıyorum.</p>
      </section>
    </main>
  );
}
