import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '@/data/navigation'

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const current = navItems.find((item) => item.path === pathname)

  return (
    <div className="flex items-center gap-1.5 text-sm text-(--text-faint)">
      <Link to="/" className="hover:text-(--text-primary) transition-colors">
        Home
      </Link>
      {current && current.path !== '/' && (
        <>
          <ChevronRight size={14} />
          <span className="font-medium text-(--text-primary)">{current.label}</span>
        </>
      )}
    </div>
  )
}
