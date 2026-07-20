import type { Transition, Variants } from 'motion/react'

/**
 * Shared easing/timing so every animation in the app feels like one hand drew it.
 * Soft, slightly decelerated — no bounce, no overshoot.
 */
export const softEase = [0.22, 1, 0.36, 1] as const

export const transitionFast: Transition = { duration: 0.22, ease: softEase }
export const transitionBase: Transition = { duration: 0.32, ease: softEase }
export const transitionSlow: Transition = { duration: 0.45, ease: softEase }

/** Page-level fade + slight rise. Used by PageTransition. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitionBase },
  exit: { opacity: 0, y: -6, transition: transitionFast },
}

/** Cards/list items fading + sliding up into place. */
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
}

/** Container that staggers its children's fadeSlideUp. */
export const staggerContainer = (stagger = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.02 },
  },
})

/** Gentle scale+fade for elements that pop in (e.g. search result rows). */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: transitionFast },
}

/** Splash-screen logo mark: blur-scale in, gently blur-scale away. */
export const splashLogoVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: softEase } },
  exit: { opacity: 0, scale: 1.04, filter: 'blur(8px)', transition: { duration: 0.5, ease: softEase } },
}
