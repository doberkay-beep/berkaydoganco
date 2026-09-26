// Okur Mektupları — Supabase REST (radyo projesiyle aynı, public anon anahtar).
// Statik sitede API katmanı yok; okuma RLS'le yalnız onaylı mektuplara açık,
// yazma yalnız mektup_birak RPC'siyle (uzunluk + link denetimi sunucuda).

const URL = "https://uiouzizblrkojmsqvbjk.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb3V6aXpibHJrb2ptc3F2YmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3ODExMTQsImV4cCI6MjEwMjM1NzExNH0.rAPFD8zjD_LdGf4hnZW_asnxUS705XCxTII-RqhmZDM";

export type Mektup = { id: number; ad: string | null; mesaj: string; created_at: string };

const BASLIK = {
  apikey: ANON,
  Authorization: `Bearer ${ANON}`,
  "Content-Type": "application/json",
};

export async function mektuplariGetir(): Promise<Mektup[]> {
  try {
    const r = await fetch(
      `${URL}/rest/v1/okur_mektuplari?select=id,ad,mesaj,created_at&order=created_at.desc&limit=40`,
      { headers: BASLIK },
    );
    if (!r.ok) return [];
    return (await r.json()) as Mektup[];
  } catch {
    return [];
  }
}

export async function mektupBirak(ad: string, mesaj: string): Promise<{ ok: boolean; hata?: string }> {
  try {
    const r = await fetch(`${URL}/rest/v1/rpc/mektup_birak`, {
      method: "POST",
      headers: BASLIK,
      body: JSON.stringify({ p_ad: ad, p_mesaj: mesaj }),
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      return { ok: false, hata: (d as { message?: string }).message };
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
