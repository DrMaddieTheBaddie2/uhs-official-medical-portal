import { AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const drugs = [
  {
    id: 'm1',
    name: 'Amoxicillin',
    class: 'Penicillin antibiotic',
    dosage: '500mg–1g PO/IV TDS, adjust for renal function',
    warning: 'Contraindicated in penicillin allergy. Caution in infectious mononucleosis.',
  },
  {
    id: 'm2',
    name: 'Morphine Sulfate',
    class: 'Opioid analgesic — Controlled Drug',
    dosage: '2.5–10mg IV/SC PRN, titrate to pain and respiratory rate',
    warning: 'Risk of respiratory depression. Requires CD register entry and witness.',
  },
  {
    id: 'm3',
    name: 'Furosemide',
    class: 'Loop diuretic',
    dosage: '20–80mg PO/IV OD–BD, monitor electrolytes and renal function',
    warning: 'Caution in hypokalaemia and dehydration. Monitor for ototoxicity at high IV doses.',
  },
]

export default function MedicationLibrary() {
  return (
    <div>
      <PageHeader title="Medication Library" description="Dosing, warnings and administration guidance." />

      <RevealGroup className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {drugs.map((drug) => (
          <RevealItem key={drug.id}>
            <Card interactive={false} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-(--text-primary)">{drug.name}</h3>
                  <p className="mt-0.5 text-xs text-(--text-faint)">{drug.class}</p>
                </div>
                <Badge variant="pink">CD watch</Badge>
              </div>

              <Accordion className="mt-2">
                <AccordionItem title="Dosage">
                  <p>{drug.dosage}</p>
                </AccordionItem>
                <AccordionItem
                  title={
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-(--color-accent-pink)" />
                      Warnings
                    </span>
                  }
                >
                  <p>{drug.warning}</p>
                </AccordionItem>
              </Accordion>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
