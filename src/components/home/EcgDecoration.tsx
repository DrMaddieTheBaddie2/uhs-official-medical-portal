const TRACE = 'M0 60 H68 L84 66 L102 18 L122 106 L140 48 L154 60 H360'

/**
 * Decorative background layer for the hero: a thin ECG trace on each side,
 * soft curved waves, and dotted halftone patches in opposite corners. Purely
 * decorative — hidden from screen readers, sits behind all content, and the
 * gentle pulse is disabled globally under prefers-reduced-motion.
 */
export function EcgDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft curved waves */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M-120 660 Q 380 380 820 640 T 1560 560"
          fill="none"
          stroke="var(--hero-wave)"
          strokeWidth="110"
          strokeLinecap="round"
        />
        <path
          d="M-80 260 Q 460 120 900 300 T 1560 230"
          fill="none"
          stroke="var(--hero-wave)"
          strokeWidth="70"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* ECG traces, one each side at mid height */}
      <svg
        viewBox="0 0 360 120"
        className="portal-ecg absolute left-0 top-1/2 h-24 w-[26vw] max-w-90 -translate-y-1/2"
      >
        <path d={TRACE} fill="none" stroke="var(--ecg-line)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 360 120"
        className="portal-ecg absolute right-0 top-1/2 h-24 w-[26vw] max-w-90 -translate-y-1/2 -scale-x-100"
      >
        <path d={TRACE} fill="none" stroke="var(--ecg-line)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>

      {/* Halftone dot patches in opposite corners */}
      <div className="portal-dots absolute -left-6 top-10 h-40 w-56 text-(--accent) opacity-15" />
      <div className="portal-dots absolute -right-6 bottom-10 h-40 w-56 text-(--accent) opacity-15" />
    </div>
  )
}
