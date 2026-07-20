import { GraduationCap, CheckSquare, HelpCircle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const modules = [
  { id: 'l1', title: 'Basic Life Support', progress: 100, icon: GraduationCap },
  { id: 'l2', title: 'Safeguarding Level 2', progress: 60, icon: GraduationCap },
  { id: 'l3', title: 'Manual Handling Refresher', progress: 0, icon: GraduationCap },
  { id: 'l4', title: 'Information Governance', progress: 100, icon: GraduationCap },
]

export default function LearningCentre() {
  return (
    <div>
      <PageHeader title="Learning Centre" description="Training modules, competency checklists and assessments." />

      <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <RevealItem key={mod.id}>
            <Card className="px-4 py-4">
              <mod.icon size={18} className="text-(--color-nhs-blue)" />
              <p className="mt-2.5 text-sm font-medium text-(--text-primary)">{mod.title}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-(--bg-canvas)">
                <div
                  className="h-full rounded-full bg-(--color-nhs-blue) transition-[width] duration-500"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-(--text-faint)">
                {mod.progress === 100 ? 'Complete' : mod.progress === 0 ? 'Not started' : `${mod.progress}% complete`}
              </p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Card interactive={false} className="px-5 py-4">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-(--color-nhs-blue)" />
            <h3 className="text-sm font-semibold text-(--text-primary)">Competency checklist</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-(--text-muted)">
            <li>✓ IV cannulation signed off</li>
            <li>✓ Medication administration signed off</li>
            <li className="text-(--text-faint)">○ Venepuncture — pending assessment</li>
          </ul>
        </Card>
        <Card interactive={false} className="px-5 py-4">
          <div className="flex items-center gap-2">
            <HelpCircle size={16} className="text-(--color-accent-pink)" />
            <h3 className="text-sm font-semibold text-(--text-primary)">Knowledge check</h3>
          </div>
          <p className="mt-2 text-sm text-(--text-muted)">
            Take the Safeguarding Level 2 quiz to complete your annual competency requirement.
          </p>
          <Badge variant="pink">10 questions · 8 min</Badge>
        </Card>
      </div>
    </div>
  )
}
