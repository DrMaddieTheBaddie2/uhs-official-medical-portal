import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeSlideUp, staggerContainer } from './variants'

/** Stagger wrapper — put around a list of <Reveal.Item> or motion children with the fadeSlideUp variant. */
export function RevealGroup({
  children,
  stagger,
  className,
}: {
  children: ReactNode
  stagger?: number
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(stagger)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** A single fade+slide-up item — use inside RevealGroup, or standalone with whileInView for scroll reveals. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeSlideUp} className={className}>
      {children}
    </motion.div>
  )
}
