import { portalNavItems } from '@/data/navigation'
import { cn } from '@/lib/cn'

interface NavigationProps {
  orientation?: 'horizontal' | 'vertical'
  /** Called after selecting an item — used to close the mobile menu. */
  onItemSelect?: () => void
}

/**
 * Portal section navigation. Sections beyond Home are not built yet, so items
 * are real buttons without navigation side effects; Home carries the active
 * state. Sits inside a rounded, bordered container on the navy header.
 */
export function Navigation({ orientation = 'horizontal', onItemSelect }: NavigationProps) {
  const horizontal = orientation === 'horizontal'

  return (
    <nav
      aria-label="Portal sections"
      className={cn(
        horizontal &&
          'flex items-center gap-1 rounded-2xl border border-(--header-border) bg-(--header-surface) px-2.5 py-2',
        !horizontal && 'flex flex-col gap-1',
      )}
    >
      {portalNavItems.map((item) => (
        <button
          key={item.label}
          aria-current={item.active ? 'page' : undefined}
          onClick={onItemSelect}
          className={cn(
            'relative flex items-center gap-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
            horizontal ? 'px-3 py-2' : 'px-4 py-3',
            item.active
              ? 'text-white'
              : 'text-(--header-text-muted) hover:text-white',
            !horizontal && item.active && 'bg-(--glass-surface)',
          )}
        >
          <item.icon size={17} strokeWidth={1.8} aria-hidden="true" />
          {item.label}
          {item.active && horizontal && (
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-1/2 h-[3px] w-9 -translate-x-1/2 rounded-full bg-(--accent)"
            />
          )}
          {item.active && !horizontal && (
            <span aria-hidden="true" className="ml-auto h-2 w-2 rounded-full bg-(--accent)" />
          )}
        </button>
      ))}
    </nav>
  )
}
