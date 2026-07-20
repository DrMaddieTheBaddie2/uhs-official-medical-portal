import { useMemo, useState } from 'react'
import { Bookmark, Search } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { SearchResultList } from '@/components/ui/SearchResultList'

const categories = ['All', 'Clinical', 'Safety', 'Operations', 'Admin'] as const

const sops = [
  { id: 's1', title: 'Medication Administration', category: 'Clinical', summary: 'Five rights, double-checking and documentation requirements for administering medication safely.' },
  { id: 's2', title: 'Infection Control Precautions', category: 'Safety', summary: 'Standard and transmission-based precautions, PPE selection and donning/doffing sequence.' },
  { id: 's3', title: 'Patient Handover Protocol', category: 'Operations', summary: 'SBAR structure for shift handover and escalation of clinical concerns.' },
  { id: 's4', title: 'Controlled Drugs Register', category: 'Admin', summary: 'Recording, witnessing and reconciling controlled drug stock.' },
  { id: 's5', title: 'Falls Prevention', category: 'Safety', summary: 'Risk assessment tools and environmental modifications to reduce inpatient falls.' },
]

export default function SopHandbook() {
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [query, setQuery] = useState('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    return sops.filter((sop) => {
      const matchesCategory = category === 'All' || sop.category === category
      const matchesQuery = sop.title.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  function toggleBookmark(id: string) {
    setBookmarked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      <PageHeader title="SOP Handbook" description="Standard operating procedures, organised by category." />

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          tabs={categories.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={setCategory}
          layoutId="sop-category"
        />
        <div className="flex items-center gap-2 rounded-(--radius-control) border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 sm:w-64">
          <Search size={15} className="text-(--text-faint)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SOPs…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-(--text-faint)"
          />
        </div>
      </div>

      <SearchResultList
        results={filtered.map((sop) => ({
          id: sop.id,
          content: (
            <Card interactive={false} className="relative px-4">
              <Accordion>
                <AccordionItem
                  title={sop.title}
                  badge={<Badge variant="blue">{sop.category}</Badge>}
                >
                  <p>{sop.summary}</p>
                </AccordionItem>
              </Accordion>
              <button
                onClick={() => toggleBookmark(sop.id)}
                className="absolute right-4 top-4 text-(--text-faint) hover:text-(--color-accent-pink)"
                aria-label="Bookmark"
              >
                <Bookmark size={16} fill={bookmarked.has(sop.id) ? 'currentColor' : 'none'} className={bookmarked.has(sop.id) ? 'text-(--color-accent-pink)' : ''} />
              </button>
            </Card>
          ),
        }))}
      />
    </div>
  )
}
