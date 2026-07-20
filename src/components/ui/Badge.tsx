import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'blue' | 'pink' | 'neutral'

const styles: Record<BadgeVariant, string> = {
  blue: 'bg-(--color-nhs-blue-50) text-(--color-nhs-blue)',
  pink: 'bg-(--color-accent-pink-light) text-(--color-accent-pink)',
  neutral: 'bg-(--bg-canvas) text-(--text-muted) border border-(--border-subtle)',
}

export function Badge({ children, variant = 'neutral' }: { children: ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', styles[variant])}>
      {children}
    </span>
  )
}
