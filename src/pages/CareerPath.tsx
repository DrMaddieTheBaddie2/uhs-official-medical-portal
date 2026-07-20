import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { transitionBase } from '@/components/motion/variants'

const ranks = [
  { id: 'r1', title: 'Band 5 — Staff Nurse', requirements: ['Registered with NMC', 'Completed preceptorship', 'Mandatory training up to date'] },
  { id: 'r2', title: 'Band 6 — Senior Staff Nurse', requirements: ['18 months at Band 5', 'Mentorship qualification', 'Leads shift coordination'] },
  { id: 'r3', title: 'Band 7 — Ward Manager', requirements: ['Demonstrated leadership portfolio', 'Budget management training', 'MDT chairing experience'] },
  { id: 'r4', title: 'Band 8a — Matron', requirements: ['Cross-ward operational oversight', 'Postgraduate leadership qualification', 'Service improvement project led'] },
]

export default function CareerPath() {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <PageHeader title="Career Path" description="Progression ranks, requirements and promotion criteria." />

      <div className="relative flex flex-col gap-0">
        <div className="absolute left-[15px] top-3 bottom-3 w-px bg-(--border-subtle)" />
        {ranks.map((rank, index) => {
          const isSelected = selected === index
          return (
            <button key={rank.id} onClick={() => setSelected(index)} className="relative flex gap-4 py-3 text-left">
              <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-(--border-subtle) bg-(--bg-surface)">
                {index < selected ? (
                  <Check size={14} className="text-(--color-nhs-blue)" />
                ) : (
                  <motion.span
                    animate={{ scale: isSelected ? 1 : 0 }}
                    transition={transitionBase}
                    className="h-2.5 w-2.5 rounded-full bg-(--color-nhs-blue)"
                  />
                )}
              </span>
              <span className={isSelected ? 'font-semibold text-(--text-primary)' : 'text-(--text-muted)'}>
                {rank.title}
              </span>
            </button>
          )
        })}
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionBase}
        className="mt-6"
      >
        <Card interactive={false} className="px-5 py-5">
          <h3 className="text-base font-semibold text-(--text-primary)">{ranks[selected].title}</h3>
          <p className="mb-3 mt-1 text-xs uppercase tracking-wide text-(--text-faint)">Promotion criteria</p>
          <ul className="space-y-2">
            {ranks[selected].requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-(--text-muted)">
                <Check size={14} className="mt-0.5 shrink-0 text-(--color-nhs-blue)" />
                {req}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  )
}
