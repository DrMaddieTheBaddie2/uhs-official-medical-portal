import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * A calm, slow shimmer — not a pulse, not a spinner. Communicates "loading"
 * without drawing attention to itself.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('rounded-md bg-(--border-subtle) overflow-hidden relative', className)}
      animate={{ opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-(--radius-card) border border-(--border-subtle) bg-(--bg-surface) p-5 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  )
}
