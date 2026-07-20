import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const sections = [
  { id: 'st1', title: 'Uniform Standards', detail: 'Approved uniform must be worn for all clinical shifts, laundered daily, with sleeves rolled above the elbow for bare-below-the-elbows compliance.' },
  { id: 'st2', title: 'Appearance', detail: 'Hair tied back if below collar length, minimal jewellery, short clean nails, no false nails or gel polish in clinical areas.' },
  { id: 'st3', title: 'Professional Behaviour', detail: 'Maintain courtesy and respect with patients, families and colleagues at all times; raise concerns through the appropriate channel.' },
  { id: 'st4', title: 'Conduct', detail: 'Adhere to the Trust code of conduct and relevant professional body standards (NMC, HCPC, GMC) at all times.' },
]

export default function StaffStandards() {
  return (
    <div>
      <PageHeader title="Staff Standards" description="Uniform, appearance, behaviour and conduct expectations." />

      <RevealGroup className="grid grid-cols-1 gap-3" stagger={0.05}>
        {sections.map((section) => (
          <RevealItem key={section.id}>
            <Card interactive={false} className="px-5">
              <Accordion>
                <AccordionItem title={section.title}>
                  <p>{section.detail}</p>
                </AccordionItem>
              </Accordion>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
