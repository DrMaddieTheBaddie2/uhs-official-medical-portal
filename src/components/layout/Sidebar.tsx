import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { transitionBase } from '@/components/motion/variants'

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={transitionBase}
      className="hidden lg:flex sticky top-0 h-screen shrink-0 flex-col border-r border-(--border-subtle) bg-(--bg-surface)"
    >
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-nhs-blue) text-sm font-bold text-white">
          U
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transitionBase}
            className="truncate text-sm font-semibold text-(--text-primary)"
          >
            UHS Handbook
          </motion.span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-(--radius-control) px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-(--color-nhs-blue)'
                  : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--color-nhs-blue-50)',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-(--radius-control) bg-(--color-nhs-blue-50)"
                    transition={transitionBase}
                  />
                )}
                <item.icon size={18} className="relative z-10 shrink-0" />
                {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onToggle}
        className="mx-2.5 mb-3 flex items-center gap-2 rounded-(--radius-control) px-3 py-2.5 text-sm text-(--text-faint) hover:bg-(--color-nhs-blue-50) hover:text-(--text-primary)"
      >
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        {!collapsed && <span>Collapse</span>}
      </button>
    </motion.aside>
  )
}
