/* nowby. radyo seçme ilkeleri (28 Kas 2026, Berkay onaylı metin).
   "Yazılı izin veren radyolar" duvarının hemen üstünde durur. Metnin kaynağı:
   by-atolye/nowby-izin/ILKELER-TASLAK.md. Ünlem, övgü sıfatı ve slogan yok. */

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };

const METIN = {
  tr: {
    etiket: "Bir radyo nowby.'da nasıl yer alır",
    giris: "nowby.'da bir radyoyu açtığında o an çalan şarkıyı seçen bir algoritma değil, orada oturan bir insan. Liste büyürken bunun kaybolmaması için yedi kurala bağlı kalıyorum.",
    ilkeler: [
      ["Yazılı izin.", "Uygulamada yalnız kendi sözüyle \"evet\" diyen radyolar var. Vazgeçen radyo aynı gün çıkar."],
      ["Bir insan, bir şehir.", "Her radyonun arkasında adını bildiğim biri ve yayın yaptığı bir yer olsun isterim."],
      ["Az kanal.", "Bir yayıncıdan ana kanalı ve en çok üç yan kanalını alırım. Liste tek bir evin odalarıyla dolmasın."],
      ["Yeni bir yer, yeni bir ses.", "Listede olmayan bir şehri, bir dili ya da bir türü getiren radyo önce gelir."],
      ["Radyonun kendi yüzü.", "Logo yalnız radyonun gönderdiği dosyadır. Göndermeyen radyo kendi rengi ve baş harfiyle görünür."],
      ["Açık kayıt.", "Yayının sesi kaydedilmez. Çalan şarkının adı ve kimliksiz dinleme sayısı tutulur; dinleyenin kim olduğu tutulmaz."],
      ["Sayı değil, yer.", "Kaç radyo olduğunu değil, hangi şehirlerden olduklarını söylerim."],
    ],
  },
  en: {
    etiket: "How a station comes to be on nowby.",
    giris: "When you open a station on nowby., the song playing right now was chosen by a person sitting there, not by an algorithm. To keep that true as the list grows, I hold to seven rules.",
    ilkeler: [
      ["Written permission.", "The app carries only stations that said yes in their own words. A station that changes its mind is removed the same day."],
      ["A person, a city.", "Behind each station I want someone whose name I know, and a place it broadcasts from."],
      ["Few channels.", "From one broadcaster I take the main channel and at most three side channels, so the list does not fill up with the rooms of a single house."],
      ["A new place, a new sound.", "A station that brings a city, a language or a genre the list does not have yet comes first."],
      ["The station's own face.", "A logo is only the file the station sent. A station that has not sent one appears with its colour and initial."],
      ["Open records.", "The sound of the broadcast is not recorded. The title of the song playing and an anonymous listen count are kept; who is listening is not."],
      ["Places, not numbers.", "I say which cities the stations are from, not how many there are."],
    ],
  },
} as const;

export function NowbyIlkeler({ dil }: { dil: "tr" | "en" }) {
  const m = METIN[dil];
  return (
    <div style={{ marginTop: "2.2rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1.4rem" }}>
      <p style={{ ...mono, opacity: 0.6 }}>{m.etiket}</p>
      <p style={{ marginTop: "0.9rem", lineHeight: 1.65, opacity: 0.85, maxWidth: "680px" }}>{m.giris}</p>
      <ol style={{ listStyle: "none", padding: 0, margin: "1.2rem 0 0", maxWidth: "680px", display: "grid", gap: "0.85rem" }}>
        {m.ilkeler.map(([baslik, metin], i) => (
          <li key={baslik} style={{ display: "grid", gridTemplateColumns: "1.6rem 1fr", columnGap: "0.6rem", lineHeight: 1.6 }}>
            <span style={{ ...mono, opacity: 0.5, paddingTop: "0.28rem" }}>{i + 1}</span>
            <span>
              <span style={{ ...serif, fontSize: "1.08rem" }}>{baslik}</span>{" "}
              <span style={{ opacity: 0.8 }}>{metin}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
