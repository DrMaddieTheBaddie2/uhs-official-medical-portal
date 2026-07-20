import { FileText, Users, ClipboardList, Folder } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const groups = [
  { id: 'g1', title: 'MDTs', icon: Users, items: ['Weekly MDT Schedule', 'Referral Pathways', 'Meeting Minutes Template'] },
  { id: 'g2', title: 'Forms', icon: ClipboardList, items: ['Falls Risk Assessment', 'Incident Report Form', 'Discharge Checklist'] },
  { id: 'g3', title: 'Templates', icon: FileText, items: ['SBAR Handover Template', 'Care Plan Template', 'MDT Referral Template'] },
  { id: 'g4', title: 'Documents', icon: Folder, items: ['Trust Policies Index', 'Ward Standard Operating Hours', 'Escalation Contacts'] },
]

export default function Administration() {
  return (
    <div>
      <PageHeader title="Administration" description="MDTs, forms, templates and shared documents." />

      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.06}>
        {groups.map((group) => (
          <RevealItem key={group.id}>
            <Card interactive={false} className="px-5 py-4">
              <div className="flex items-center gap-2">
                <group.icon size={16} className="text-(--color-nhs-blue)" />
                <h3 className="text-sm font-semibold text-(--text-primary)">{group.title}</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-(--text-muted) hover:text-(--color-nhs-blue) transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
