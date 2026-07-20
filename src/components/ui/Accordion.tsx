import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { createContext, useContext, useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { transitionBase, transitionFast } from '@/components/motion/variants'

interface AccordionContextValue {
  openId: string | null
  setOpenId: (id: string | null) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

/** Single-open accordion container — opening one section closes the other, like NHS.uk's expanders. */
export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className={cn('divide-y divide-(--border-subtle)', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  title,
  children,
  badge,
}: {
  title: ReactNode
  children: ReactNode
  badge?: ReactNode
}) {
  const ctx = useContext(AccordionContext)
  const id = useId()
  if (!ctx) throw new Error('AccordionItem must be used within Accordion')
  const isOpen = ctx.openId === id

  return (
    <div>
      <button
        onClick={() => ctx.setOpenId(isOpen ? null : id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="flex items-center gap-2.5 font-medium text-(--text-primary)">
          {title}
          {badge}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={transitionFast}
          className="shrink-0 text-(--text-faint)"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitionBase}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm leading-relaxed text-(--text-muted)">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
