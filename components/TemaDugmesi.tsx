"use client";

/* Aydınlık / karanlık tema düğmesi. Seçim localStorage'da ("bd-tema");
   ilk boyamadan önce app/layout.tsx'teki satır içi betik uygular (yanıp sönme yok).
   Görünen etiket CSS'le seçilir ([data-theme]); böylece sunucu/istemci farkı doğmaz. */
export function TemaDugmesi({ lang = "tr", className = "tema-dugme" }: { lang?: "tr" | "en"; className?: string }) {
  const degistir = () => {
    const kok = document.documentElement;
    const yeni = kok.getAttribute("data-theme") === "dark" ? "light" : "dark";
    kok.setAttribute("data-theme", yeni);
    try { localStorage.setItem("bd-tema", yeni); } catch { /* yoksay */ }
  };
  const tr = lang === "tr";
  return (
    <button type="button" className={className} onClick={degistir} aria-label={tr ? "Aydınlık ve karanlık tema arasında geç" : "Switch between light and dark theme"}>
      <span className="tema-karanlik" aria-hidden>{tr ? "Karanlık" : "Dark"}</span>
      <span className="tema-aydinlik" aria-hidden>{tr ? "Aydınlık" : "Light"}</span>
    </button>
  );
}
