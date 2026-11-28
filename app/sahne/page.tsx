import type { Metadata } from "next";
import { ETKINLIKLER, ayrilmis, etkinlikLd } from "@/lib/etkinlikler";
import { EMAIL, PERSON_ID } from "@/lib/site";
import { SahneListesi } from "@/components/Sahne";
import s from "@/components/anasayfa/noir.module.css";

export const metadata: Metadata = {
  title: { absolute: "Sahne — Berkay Doğan" },
  description: "İmza günleri, okumalar, söyleşiler — Berkay Doğan'ın etkinlik takvimi.",
  alternates: { canonical: "/sahne" },
  openGraph: {
    title: "Sahne — Berkay Doğan",
    description: "İmza günleri, okumalar, söyleşiler.",
    url: "https://www.berkaydogan.co/sahne",
    type: "website",
  },
};

/* Sahne — yazar-noir. Etkinlikler lib/etkinlikler.ts'ten (yalnız teyitli kayıtlar).
   Yaklaşan etkinlikler için schema.org Event yapısal verisi basılır. */
export default function Sayfa() {
  const { gelecek } = ayrilmis();
  const bos = ETKINLIKLER.length === 0;
  return (
    <div className={s.sayfa}>
      {gelecek.map((e) => (
        <script key={e.tarihISO + e.baslik} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(etkinlikLd(e, PERSON_ID)) }} />
      ))}
      <section className={`${s.dizin} ${s.sahneUst}`} aria-labelledby="sahne-baslik">
        <div className={s.dizinBas}>
          <span className={s.etiket}>Etkinlikler</span>
          <h1 id="sahne-baslik" className={s.sahneBaslik}>Sahne</h1>
          <p className={s.sahneGiris}>İmza günleri, okumalar, söyleşiler.</p>
        </div>
        <div className={s.dizinGovde}>
          {bos ? (
            <div>
              <p className={s.sahneBos}>Şu an takvimde duyurulmuş bir etkinlik yok.</p>
              <div className={s.sahneNot}>
                <p>Yeni imza günleri ve okumalar önce X&apos;te duyurulur: <a href="https://x.com/yazarberkaydgn" target="_blank" rel="noopener noreferrer">@yazarberkaydgn</a></p>
                <p>Söyleşi ve okuma davetleri için: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              </div>
            </div>
          ) : (
            <>
              <SahneListesi />
              <div className={s.sahneNot}>
                <p>Söyleşi ve okuma davetleri için: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
