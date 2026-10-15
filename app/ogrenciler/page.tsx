import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, INSTAGRAM_URL } from "@/lib/site";
import { SOZLER, KITAP_ADI } from "@/lib/sozler";
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

/* Derste tartışmak için: cümleler YALNIZ lib/sozler.ts korpusundan (baskıdan
   doğrulanmış) çekilir; korpusta bulunmayan satır sayfaya hiç girmez.
   Tartışma soruları cümleye ait değildir, öğretmene yardımcı olsun diye yazıldı. */
const TARTISMA: { s: string; soru: string }[] = [
  { s: "Düşünmek, zihnin kendisine karşı bir devrim yapmasıdır.", soru: "En son ne zaman kendi fikrini değiştirdin? Bu bir yenilgi miydi, bir devrim mi?" },
  { s: "Belki de kimlik, bir cevap değil, sürekli bir sorudur.", soru: "Kimliğimiz bize mi verilir, yoksa her gün yeniden mi yazarız?" },
  { s: "Prangalarımız demirden değil, kadifeden yapılmıştır.", soru: "Bizi rahat ettirirken özgürlüğümüzü kısıtlayan şeyler neler olabilir?" },
  { s: "Cesaret, korkunun yokluğu değil, korkuya rağmen adım atabilme iradesidir.", soru: "Korkmadan yapılan bir şeye cesaret denebilir mi?" },
  { s: "Dil, düşüncenin hem evi hem de en hassas terazisidir.", soru: "Bir şeyi anlatacak kelimemiz yoksa, onu gerçekten düşünebilir miyiz?" },
  { s: "Ben artık sadece kendimim.", soru: "Başkalarının beklentilerinden arınmış bir \"ben\" mümkün mü?" },
];
const CUMLELER = TARTISMA
  .map((t) => ({ ...t, soz: SOZLER.find((x) => x.s === t.s) }))
  .filter((t): t is typeof t & { soz: NonNullable<typeof t.soz> } => Boolean(t.soz));

const KONULAR_OGRENCI: [string, string][] = [
  ["Yazmak ve felsefe", "Bir düşünceyi kâğıda dökmek onu nasıl değiştirir? Felsefe ile edebiyatın kesiştiği yer."],
  ["17 yaşında yazmaya başlamak", "Lisenin son yılında başlayan bir yolculuk: sessizce yazılan sekiz yıl ve sonrasında gelen kitaplar."],
  ["Şiirden denemeye", "Mürekkep ve Köz'den Tasfiye'ye: aynı soruları önce dizeyle, sonra düzyazıyla sormak."],
  ["Sosyal medya çağında derinlik", "Her şeyin hızla tüketildiği bir dünyada yavaş düşünmeyi savunmak."],
  ["Yazarını sanık koltuğuna oturtan kitap", "Tasfiye'nin mahkeme kurgusu: yazar kendini yargılarsa ne olur?"],
];

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

      {/* 2 · Söyleşi */}
      <section id="soylesi" style={secStil}>
        <h2 style={secBaslik}>02 · Okul ve kulüp söyleşisi</h2>
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

      {/* 3 · Derste tartışmak için */}
      <section id="tartisma" style={secStil}>
        <h2 style={secBaslik}>03 · Derste tartışmak için</h2>
        <p style={govde}>
          Kitaplarımdan birebir alınmış cümleler ve her birinin altında sınıfta açılabilecek bir soru.
          Öğretmenler derste, öğrenciler ödevlerinde kaynak göstererek kullanabilir.
        </p>
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
        <h2 style={secBaslik}>04 · Bana ulaş</h2>
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
