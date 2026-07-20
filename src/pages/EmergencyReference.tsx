import { Siren } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const emergencyDrugs = [
  { id: 'e1', name: 'Adrenaline 1:10,000', use: 'Cardiac arrest', dose: '1mg IV every 3–5 min' },
  { id: 'e2', name: 'Naloxone', use: 'Opioid overdose', dose: '400mcg IV/IM, repeat as needed' },
  { id: 'e3', name: 'Glucagon', use: 'Severe hypoglycaemia', dose: '1mg IM if no IV access' },
]

export default function EmergencyReference() {
  return (
    <div>
      <PageHeader
        title="Emergency Reference"
        description="Critical drug doses, algorithms and quick actions for time-sensitive situations."
        actions={<Badge variant="pink">High priority</Badge>}
      />

      <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {emergencyDrugs.map((drug) => (
          <RevealItem key={drug.id}>
            <Card className="px-4 py-4">
              <div className="flex items-center gap-2">
                <Siren size={15} className="text-(--color-accent-pink)" />
                <p className="text-sm font-semibold text-(--text-primary)">{drug.name}</p>
              </div>
              <p className="mt-2 text-xs text-(--text-faint)">{drug.use}</p>
              <p className="mt-1 text-sm text-(--text-muted)">{drug.dose}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wide text-(--text-faint)">
        Algorithms
      </h2>
      <Card interactive={false} className="px-5 py-2">
        <Accordion>
          <AccordionItem title="Adult Cardiac Arrest (ALS)">
            <p>Confirm unresponsiveness and absent breathing, call for help, start CPR 30:2, attach defibrillator and follow the shockable/non-shockable rhythm pathway.</p>
          </AccordionItem>
          <AccordionItem title="Anaphylaxis">
            <p>Remove trigger, call for help, IM adrenaline into the anterolateral thigh, lie patient flat with legs raised, repeat adrenaline every 5 minutes if no improvement.</p>
          </AccordionItem>
          <AccordionItem title="Major Haemorrhage">
            <p>Apply direct pressure, activate major haemorrhage protocol, request O-negative blood while awaiting group and save.</p>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
