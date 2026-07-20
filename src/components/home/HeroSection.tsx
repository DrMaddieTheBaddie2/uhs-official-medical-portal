import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { CrestDisplay } from '@/components/home/CrestDisplay'
import { EcgDecoration } from '@/components/home/EcgDecoration'
import { fadeSlideUp, staggerContainer, transitionFast } from '@/components/motion/variants'
import { cn } from '@/lib/cn'

function HeroButton({ variant, children }: { variant: 'primary' | 'secondary'; children: ReactNode }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={transitionFast}
      className={cn(
        'flex min-w-[180px] items-center justify-between gap-5 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-(--accent) text-white shadow-(--shadow) hover:bg-(--accent-hover)'
          : 'border border-(--border-strong) bg-(--surface)/60 text-(--text-primary) hover:bg-(--accent-soft)',
      )}
    >
      {children}
      <ChevronRight size={18} aria-hidden="true" />
    </motion.button>
  )
}

/** Two-column crest hero: brand text left, the official crest right, ECG/wave decorations behind. */
export function HeroSection() {
  return (
    <section
      className="relative flex flex-1 items-center overflow-hidden py-16 transition-colors lg:py-20"
      style={{ background: 'var(--hero-background)' }}
    >
      <EcgDecoration />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* Text column */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeSlideUp}
            className="flex h-20 w-[136px] items-center justify-center rounded-2xl bg-(--accent) text-5xl font-black italic tracking-tight text-white shadow-(--shadow)"
          >
            UHS
          </motion.span>

          <motion.h1
            variants={fadeSlideUp}
            className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-(--text-primary) sm:text-5xl xl:text-6xl"
          >
            Unmatched
            <br />
            Ambulance Service
          </motion.h1>

          <motion.p variants={fadeSlideUp} className="mt-4 text-2xl font-bold text-(--accent) sm:text-3xl">
            UHS Foundation Trust
          </motion.p>

          <motion.p variants={fadeSlideUp} className="mt-5 text-lg font-semibold text-(--text-primary)">
            Caring. Competent. Committed.
          </motion.p>

          <motion.p variants={fadeSlideUp} className="mt-2 text-base leading-relaxed text-(--text-secondary)">
            Delivering exceptional care in every situation,
            <br className="hidden sm:block" /> anywhere, anytime.
          </motion.p>

          <motion.div variants={fadeSlideUp} className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <HeroButton variant="primary">Explore Portal</HeroButton>
            <HeroButton variant="secondary">About UHS</HeroButton>
          </motion.div>
        </motion.div>

        {/* Crest column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex justify-center"
        >
          <CrestDisplay />
        </motion.div>
      </div>
    </section>
  )
}
