import { motion } from 'motion/react'
import { useId } from 'react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { softEase } from '@/components/motion/variants'

/**
 * Accessible SVG donut: the visual ring is aria-hidden, and the percentage
 * + label are exposed via the aria-label so screen readers get the same
 * information sighted users get from the chart, not just "75%."
 */
export function DonutProgress({ percent, label }: { percent: number; label: string }) {
  const gradientId = useId()
  const radius = 42
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative flex h-32 w-32 items-center justify-center" role="img" aria-label={`${label}: ${percent}% complete`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-nhs-blue-light)" />
            <stop offset="100%" stopColor="var(--color-nhs-blue)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth={9} />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - percent / 100) }}
          transition={{ duration: 1, ease: softEase }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-(--text-primary)" aria-hidden="true">
          <AnimatedCounter value={percent} suffix="%" />
        </span>
      </div>
    </div>
  )
}
