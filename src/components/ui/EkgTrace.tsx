import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const WAVEFORM = 'M0,60 L60,60 L80,60 L95,20 L115,100 L130,40 L145,60 L200,60 L220,60 L235,30 L255,90 L270,50 L285,60 L360,60'

/** Three beats per loop (0.833s × 3 ≈ 2.5s) — roughly a 72bpm rhythm. */
const LOOP_DURATION = 2.5

/**
 * A single looping heartbeat trace with a soft bloom halo beneath the crisp
 * line. Bright cyan/blue glow — designed to sit on dark surfaces. Decorative,
 * so it's marked aria-hidden; any readable status belongs in text next to it.
 * Respects reduced-motion by freezing on a fully-drawn line instead of looping.
 */
export function EkgTrace({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const id = useId()
  const gradientId = `${id}-gradient`
  const bloomId = `${id}-bloom`

  return (
    <svg viewBox="0 0 720 120" className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3faeff" stopOpacity="0" />
          <stop offset="55%" stopColor="#3faeff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.95" />
        </linearGradient>
        <filter id={bloomId} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {[0, 360].map((offset) => (
        <g key={offset} transform={`translate(${offset}, 0)`}>
          {/* Bloom halo */}
          <motion.path
            d={WAVEFORM}
            fill="none"
            stroke="#00d4ff"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.5}
            filter={`url(#${bloomId})`}
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            animate={reduceMotion ? undefined : { pathLength: [0, 1] }}
            transition={reduceMotion ? undefined : { duration: LOOP_DURATION, repeat: Infinity, ease: 'linear', delay: offset === 360 ? LOOP_DURATION / 2 : 0 }}
          />
          {/* Crisp trace */}
          <motion.path
            d={WAVEFORM}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.7 : 1 }}
            animate={reduceMotion ? undefined : { pathLength: [0, 1] }}
            transition={reduceMotion ? undefined : { duration: LOOP_DURATION, repeat: Infinity, ease: 'linear', delay: offset === 360 ? LOOP_DURATION / 2 : 0 }}
          />
        </g>
      ))}
    </svg>
  )
}
