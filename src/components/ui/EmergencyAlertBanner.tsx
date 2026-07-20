import { motion } from 'motion/react'
import { Siren, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { transitionBase } from '@/components/motion/variants'

export interface EmergencyAlert {
  id: string
  title: string
  severity: 'High' | 'Medium' | 'Low'
}

/** Pink-accented alert strip linking to the Emergency Reference section. Render only when an alert is active. */
export function EmergencyAlertBanner({ alert }: { alert: EmergencyAlert }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionBase}
      className="flex items-center gap-3 rounded-xl border border-(--color-accent-pink)/30 bg-(--color-accent-pink-light) px-4 py-3.5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-accent-pink) text-white">
        <Siren size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-(--text-primary)">{alert.title}</p>
        <p className="text-xs text-(--color-accent-pink)">{alert.severity} priority</p>
      </div>
      <Link to="/emergency-reference" className="flex shrink-0 items-center gap-1 text-sm font-medium text-(--color-accent-pink) hover:underline">
        View
        <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  )
}
