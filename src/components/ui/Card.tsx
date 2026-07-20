import { motion } from 'motion/react'
import type { ReactNode, MouseEventHandler } from 'react'
import { cn } from '@/lib/cn'
import { transitionFast } from '@/components/motion/variants'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  as?: 'div' | 'button'
  interactive?: boolean
}

/**
 * Base surface used across the app. `interactive` adds a subtle lift + shadow
 * on hover/focus — never a scale-up, never a bounce. Just enough to say
 * "this responds to you."
 */
export function Card({ children, className, onClick, interactive = true }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      whileHover={interactive ? { y: -3, boxShadow: 'var(--shadow-card-hover)' } : undefined}
      whileTap={interactive && onClick ? { y: -1 } : undefined}
      transition={transitionFast}
      className={cn(
        'rounded-(--radius-card) border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-card)',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {children}
    </motion.div>
  )
}
