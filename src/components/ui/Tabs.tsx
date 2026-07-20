import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { transitionBase } from '@/components/motion/variants'

interface TabsProps<T extends string> {
  tabs: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
  layoutId?: string
}

/**
 * Pill-style tab switcher with a single shared `layoutId` indicator that
 * glides between tabs via Framer Motion's layout animation — no manual
 * position math, no flicker.
 */
export function Tabs<T extends string>({ tabs, value, onChange, className, layoutId = 'tab-indicator' }: TabsProps<T>) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-full bg-(--color-nhs-blue-50) p-1', className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              isActive ? 'text-white' : 'text-(--text-muted) hover:text-(--text-primary)',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-(--color-nhs-blue)"
                transition={transitionBase}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
