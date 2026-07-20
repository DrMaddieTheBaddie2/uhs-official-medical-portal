import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { transitionFast } from '@/components/motion/variants'

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionFast}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={transitionFast}
            className="fixed left-1/2 top-[18%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
          >
            <Command
              className="overflow-hidden rounded-(--radius-card) border border-(--border-subtle) bg-(--bg-surface)"
              style={{ boxShadow: 'var(--shadow-popover)' }}
              shouldFilter
            >
              <div className="flex items-center gap-2 border-b border-(--border-subtle) px-4">
                <Search size={16} className="text-(--text-faint)" />
                <Command.Input
                  autoFocus
                  placeholder="Search SOPs, medications, procedures…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-(--text-faint)"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-(--text-faint)">
                  No results found.
                </Command.Empty>
                <Command.Group heading="Sections" className="px-1 py-1 text-xs font-medium text-(--text-faint) [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                  {navItems.map((item) => (
                    <Command.Item
                      key={item.path}
                      onSelect={() => {
                        navigate(item.path)
                        onClose()
                      }}
                      className="flex items-center gap-2.5 rounded-(--radius-control) px-3 py-2.5 text-sm text-(--text-primary) data-[selected=true]:bg-(--color-nhs-blue-50) data-[selected=true]:text-(--color-nhs-blue)"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
