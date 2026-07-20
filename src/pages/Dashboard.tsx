import { Link } from 'react-router-dom'
import { Pin, FileText, ArrowUpRight, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { recentUpdates, pinnedSops, quickActions, recentDocuments } from '@/data/dashboard'

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Good morning"
        description="Here's what's new across the handbook since you last checked."
      />

      <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <RevealItem key={action.id}>
            <Link to={action.path}>
              <Card className="flex items-center justify-between gap-3 px-4 py-3.5">
                <span className="flex items-center gap-2.5 text-sm font-medium text-(--text-primary)">
                  <Sparkles size={16} className="text-(--color-nhs-blue)" />
                  {action.label}
                </span>
                <ArrowUpRight size={15} className="text-(--text-faint)" />
              </Card>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-(--text-faint) uppercase tracking-wide">
            Recent updates
          </h2>
          <RevealGroup className="flex flex-col gap-2.5" stagger={0.05}>
            {recentUpdates.map((update) => (
              <RevealItem key={update.id}>
                <Card interactive={false} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-(--text-primary)">{update.title}</p>
                    <p className="mt-1 text-xs text-(--text-faint)">{update.date}</p>
                  </div>
                  <Badge variant="blue">{update.section}</Badge>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold text-(--text-faint) uppercase tracking-wide">
            Pinned SOPs
          </h2>
          <RevealGroup className="flex flex-col gap-2.5" stagger={0.05}>
            {pinnedSops.map((sop) => (
              <RevealItem key={sop.id}>
                <Card className="flex items-start gap-3 px-4 py-3.5">
                  <Pin size={15} className="mt-0.5 shrink-0 text-(--color-accent-pink)" />
                  <div>
                    <p className="text-sm font-medium text-(--text-primary)">{sop.title}</p>
                    <p className="mt-0.5 text-xs text-(--text-faint)">{sop.updated}</p>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <h2 className="mb-4 mt-8 text-sm font-semibold text-(--text-faint) uppercase tracking-wide">
            Recent documents
          </h2>
          <RevealGroup className="flex flex-col gap-2.5" stagger={0.05}>
            {recentDocuments.map((doc) => (
              <RevealItem key={doc.id}>
                <Card interactive={false} className="flex items-center gap-3 px-4 py-3">
                  <FileText size={15} className="shrink-0 text-(--text-faint)" />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-(--text-primary)">{doc.title}</p>
                    <p className="text-xs text-(--text-faint)">
                      {doc.type} · {doc.viewed}
                    </p>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </div>
    </div>
  )
}
