import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { pageVariants } from './variants'

/**
 * Wraps a route's content. Pair with <AnimatePresence mode="wait"> at the
 * router level (see AppRoutes) and a unique `key` per page so exit/enter
 * transitions run on navigation, not on every re-render.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
