import { motion, AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeScale } from '@/components/motion/variants'

export interface SearchResultEntry {
  id: string
  content: ReactNode
}

/**
 * Results fade+scale in individually with a tiny stagger, and animate out
 * just as gently when the query changes — so results never just "snap"
 * to a new set.
 */
export function SearchResultList({ results }: { results: SearchResultEntry[] }) {
  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence mode="popLayout">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            layout
            variants={fadeScale}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ delay: index * 0.03 }}
          >
            {result.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
