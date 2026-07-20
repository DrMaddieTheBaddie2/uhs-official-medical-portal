import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { navItems } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { transitionBase } from '@/components/motion/variants'

const primaryItems = navItems.filter((item) => item.primary)

export function BottomNav() {
  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-(--border-subtle) bg-(--bg-surface-glass) backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5">
        {primaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center gap-1 py-2.5 text-xs"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="bottomnav-active"
                    className="absolute top-1 h-1 w-8 rounded-full bg-(--color-nhs-blue)"
                    transition={transitionBase}
                  />
                )}
                <item.icon
                  size={20}
                  className={cn('mt-1.5', isActive ? 'text-(--color-nhs-blue)' : 'text-(--text-faint)')}
                />
                <span className={cn(isActive ? 'text-(--color-nhs-blue) font-medium' : 'text-(--text-faint)')}>
                  {item.label.split(' ')[0]}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
