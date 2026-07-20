import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const steps = [
  { id: 'st1', title: '1. Identify and assess', detail: 'Confirm patient identity, gather observations and assess severity using NEWS2.' },
  { id: 'st2', title: '2. Escalate', detail: 'Notify the responsible clinician immediately if NEWS2 ≥ 5 or any red flag observation.' },
  { id: 'st3', title: '3. Initiate Sepsis Six', detail: 'Oxygen, blood cultures, IV antibiotics, IV fluids, lactate measurement, urine output monitoring — within 1 hour.' },
  { id: 'st4', title: '4. Document and review', detail: 'Record timings against the Sepsis Six bundle and reassess response at 1 and 4 hours.' },
]

export default function ClinicalProcedures() {
  return (
    <div>
      <PageHeader title="Clinical Procedures" description="Step-by-step guidance for time-critical clinical pathways." />

      <Card interactive={false} className="px-5 py-2">
        <Accordion>
          {steps.map((step) => (
            <AccordionItem key={step.id} title={step.title}>
              <p>{step.detail}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wide text-(--text-faint)">
        Related procedures
      </h2>
      <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {['Catheterisation', 'Wound Dressing', 'Venepuncture', 'Cannulation', 'NG Tube Insertion', 'Manual Handling'].map((name) => (
          <RevealItem key={name}>
            <Card className="px-4 py-3.5">
              <p className="text-sm font-medium text-(--text-primary)">{name}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
