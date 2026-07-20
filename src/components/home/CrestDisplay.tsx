import { useState } from 'react'

/**
 * Displays the ORIGINAL official crest image, untouched: contain sizing (never
 * cover), no cropping, no generated lettering, no redrawing. Supply the asset
 * at public/images/uhs-crest.png — until it exists, a neutral pending panel is
 * shown instead (deliberately NOT a recreation of the crest).
 */
export function CrestDisplay() {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div className="flex aspect-square w-full max-w-[300px] items-center justify-center rounded-3xl border-2 border-dashed border-(--border-strong) p-8 text-center sm:max-w-[380px] lg:max-w-[440px]">
        <p className="text-sm leading-relaxed text-(--text-secondary)">
          Official UHS crest
          <br />
          <span className="text-xs">
            Awaiting the supplied artwork at{' '}
            <code className="font-mono text-[11px]">public/images/uhs-crest.png</code>
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]">
      {/* Theme-appropriate glow behind (never over) the crest */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-110 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)' }}
      />
      <img
        src="/images/uhs-crest.png"
        alt="Official Unmatched Ambulance Service crest"
        className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(2,12,32,0.35)]"
        onError={() => setMissing(true)}
      />
    </div>
  )
}
