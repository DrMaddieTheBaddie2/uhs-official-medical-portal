import {
  LayoutDashboard,
  BookOpen,
  BookPlus,
  Pill,
  Stethoscope,
  TrendingUp,
  GraduationCap,
  Home,
  Siren,
  Shirt,
  Settings,
  FileText,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  /** shown only in the mobile bottom bar, a subset of all sections */
  primary?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, primary: true },
  { label: 'SOP Handbook', path: '/sop-handbook', icon: BookOpen, primary: true },
  { label: 'Medication Library', path: '/medication-library', icon: Pill, primary: true },
  { label: 'Clinical Procedures', path: '/clinical-procedures', icon: Stethoscope, primary: true },
  { label: 'Career Path', path: '/career-path', icon: TrendingUp },
  { label: 'Learning Centre', path: '/learning-centre', icon: GraduationCap },
  { label: 'Emergency Reference', path: '/emergency-reference', icon: Siren, primary: true },
  { label: 'Staff Standards', path: '/staff-standards', icon: Shirt },
  { label: 'Administration', path: '/administration', icon: Settings },
]

export interface PortalNavItem {
  label: string
  icon: LucideIcon
  /** Highlighted as the current section on the portal homepage. */
  active?: boolean
}

/** Homepage navigation — visual only for the first milestone; sections come later. */
export const portalNavItems: PortalNavItem[] = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Clinical Library', icon: BookPlus },
  { label: 'Medications', icon: Pill },
  { label: 'SOPs & Policies', icon: FileText },
  { label: 'Career Centre', icon: GraduationCap },
  { label: 'Resources', icon: FolderOpen },
]
