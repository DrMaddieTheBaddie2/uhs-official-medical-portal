import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'motion/react'
import { type ReactNode, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { cn } from '@/lib/cn'

interface MagneticButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'ref'> {
  children: ReactNode
  strength?: number
}

/** Subtly pulls toward the cursor on hover, springs back on leave. Keep strength small (6–10px). */
export function MagneticButton({ children, className, strength = 8, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 })

  function handlePointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength)
    y.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * strength)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
