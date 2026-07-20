import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { transitionFast } from '@/components/motion/variants'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-(--color-nhs-blue) text-white hover:bg-(--color-nhs-blue-dark)',
  secondary: 'bg-(--bg-surface) text-(--text-primary) border border-(--border-subtle) hover:border-(--color-nhs-blue-light)',
  ghost: 'bg-transparent text-(--text-primary) hover:bg-(--color-nhs-blue-50)',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={transitionFast}
      className={cn(
        'inline-flex items-center justify-center rounded-(--radius-control) font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
