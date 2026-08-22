/* BD mührü — çember içinde çizgi-BD monogramı, tepesinde köz noktası.
   Harfler path (font bağımsız); renk currentColor, köz her zaman accent. */
export function Muhur({ size = 24, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
      {/* B */}
      <path
        d="M21 22 V42 M21 22 H26.5 Q31 22 31 27 Q31 31.4 26.5 32 H21 M26.5 32 Q32 32.6 32 37 Q32 42 26.5 42 H21"
        stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* D */}
      <path
        d="M38 22 V42 M38 22 H41 Q48 22 48 32 Q48 42 41 42 H38"
        stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* köz — mührün tepesinde, çemberin üzerinde */}
      <circle cx="32" cy="4" r="3.4" fill="#E5402A" />
    </svg>
  );
}
