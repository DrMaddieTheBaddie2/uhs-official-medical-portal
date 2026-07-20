import { motion, AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { splashLogoVariants, transitionSlow } from '@/components/motion/variants'

const SPLASH_SEEN_KEY = 'uhs-splash-seen'
const SPLASH_DURATION_MS = 1400

/** Shows once per browser session, then fades+blurs away into the app already mounted underneath. */
export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SPLASH_SEEN_KEY))
  const done = useRef(false)

  const finish = useCallback(() => {
    if (done.current) return
    done.current = true
    onDone()
  }, [onDone])

  useEffect(() => {
    if (!visible) {
      finish()
      return
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem(SPLASH_SEEN_KEY, '1')
      setVisible(false)
    }, SPLASH_DURATION_MS)
    return () => clearTimeout(timer)
  }, [visible, finish])

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={transitionSlow}
          className="fixed inset-0 z-100 flex items-center justify-center bg-(--bg-canvas)"
        >
          <motion.div initial="initial" animate="animate" exit="exit" variants={splashLogoVariants} className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-(--color-nhs-blue) text-xl font-bold text-white shadow-(--shadow-popover)">
              UHS
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold tracking-tight text-(--text-primary)">UHS Medical Portal</p>
              <p className="mt-0.5 text-sm text-(--text-muted)">Handbook · SOPs · Training</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
