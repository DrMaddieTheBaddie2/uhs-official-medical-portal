import type { LucideIcon } from 'lucide-react'
import { Mail, Phone, Radio, ShieldPlus } from 'lucide-react'

function MiniEcg() {
  return (
    <svg viewBox="0 0 120 32" className="h-7 w-24 shrink-0" aria-hidden="true">
      <path
        d="M0 16 H28 L36 20 L44 4 L52 28 L60 12 L66 16 H120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

function Group({ icon: Icon, children }: { icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 xl:px-6 first:xl:pl-0 last:xl:pr-0">
      {Icon && <Icon size={24} strokeWidth={1.6} className="shrink-0 opacity-90" aria-hidden="true" />}
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/** Full-width five-group information bar: brand, emergency, service, chain of command, copyright. */
export function FooterInfoBar() {
  return (
    <footer
      className="text-(--text-on-dark) transition-colors"
      style={{ background: 'var(--footer-background)' }}
    >
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 lg:px-10 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-white/20">
        <Group icon={ShieldPlus}>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em]">Unmatched Ambulance Service</p>
          <p className="mt-1 text-xs leading-relaxed opacity-85">
            Delivering excellence in healthcare,
            <br />
            every patient, every time.
          </p>
        </Group>

        <Group icon={Phone}>
          <p className="text-xs opacity-85">Emergency</p>
          <p className="mt-0.5 text-sm font-bold tracking-wide">000 / 111</p>
        </Group>

        <Group icon={Radio}>
          <p className="text-sm font-semibold leading-snug">
            Providing Top-Tier
            <br />
            Healthcare 24/7
          </p>
        </Group>

        <Group icon={Mail}>
          <p className="text-xs leading-relaxed opacity-90">
            Always follow the chain
            <br />
            of command with any
            <br />
            queries you may have.
          </p>
        </Group>

        <div className="flex items-center justify-between gap-4 xl:justify-end xl:pl-6">
          <p className="whitespace-nowrap text-xs leading-relaxed opacity-85">
            © 2025 Unmatched Ambulance Service.
            <br />
            All rights reserved.
          </p>
          <MiniEcg />
        </div>
      </div>
    </footer>
  )
}
