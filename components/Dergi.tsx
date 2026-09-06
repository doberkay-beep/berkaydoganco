/* Edebi Dergi dil öğeleri — sunucu ve istemci bileşenlerinde ortak.
   Stiller globals.css'te (ed-*). */

export function Folio({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="ed-folio" aria-hidden="false">
      <span className="ed-folio-no">№ {no}</span>
      <span className="ed-folio-label">{children}</span>
    </div>
  );
}

export function Masthead({ left, center, right }: { left: React.ReactNode; center?: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="ed-masthead">
      <span><b>{left}</b></span>
      {center !== undefined && <span>{center}</span>}
      <span>{right}</span>
    </div>
  );
}
