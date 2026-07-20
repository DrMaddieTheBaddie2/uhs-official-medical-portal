import { motion } from 'motion/react'

/** Slow-drifting blue/pink blobs fixed behind all content — depth without distraction. */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-nhs-blue-light) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-accent-pink) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-nhs-blue) 0%, transparent 70%)' }}
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
