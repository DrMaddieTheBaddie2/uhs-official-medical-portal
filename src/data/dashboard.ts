import { BookOpen, Pill, Stethoscope, type LucideIcon } from 'lucide-react'

export const recentUpdates = [
  { id: 'u1', title: 'Sepsis Six pathway revised', section: 'Clinical Procedures', date: '2 days ago' },
  { id: 'u2', title: 'New IV antibiotic dosing chart', section: 'Medication Library', date: '4 days ago' },
  { id: 'u3', title: 'Uniform policy — updated footwear standard', section: 'Staff Standards', date: '1 week ago' },
  { id: 'u4', title: 'Band 6 promotion criteria clarified', section: 'Career Path', date: '1 week ago' },
]

export const pinnedSops = [
  { id: 'p1', title: 'Medication Administration', category: 'Clinical', updated: 'Reviewed 12 Jun' },
  { id: 'p2', title: 'Infection Control Precautions', category: 'Safety', updated: 'Reviewed 03 Jun' },
  { id: 'p3', title: 'Patient Handover Protocol', category: 'Operations', updated: 'Reviewed 28 May' },
]

export const quickActions = [
  { id: 'q1', label: 'Emergency Drug Guide', path: '/emergency-reference' },
  { id: 'q2', label: 'Report an Incident', path: '/administration' },
  { id: 'q3', label: 'Find an SOP', path: '/sop-handbook' },
  { id: 'q4', label: 'Start a Training Module', path: '/learning-centre' },
]

export const recentDocuments = [
  { id: 'd1', title: 'Falls Risk Assessment Form', type: 'Form', viewed: 'Today' },
  { id: 'd2', title: 'Controlled Drugs Register', type: 'SOP', viewed: 'Yesterday' },
  { id: 'd3', title: 'MDT Referral Template', type: 'Template', viewed: '2 days ago' },
]

export interface StatusStat {
  label: string
  value: number
  suffix?: string
  trend?: string
}

export const statusStats: StatusStat[] = [
  { label: 'SOPs reviewed this month', value: 12, trend: '+3 vs last month' },
  { label: 'Training completion', value: 94, suffix: '%', trend: '+2.1%' },
  { label: 'Open incident reports', value: 2, trend: '-1 this week' },
]

export const favouriteMedications = [
  { id: 'm1', name: 'Amoxicillin', dose: '500mg PO TDS', tag: 'Antibiotic' },
  { id: 'm2', name: 'Morphine Sulfate', dose: '2.5–10mg IV PRN', tag: 'Controlled Drug' },
  { id: 'm3', name: 'Furosemide', dose: '20–80mg PO/IV', tag: 'Diuretic' },
]

export const activeStaff = [
  { id: 'st1', name: 'Emma Mitchell', role: 'Staff Nurse', initials: 'EM', status: 'On shift' },
  { id: 'st2', name: 'James Okafor', role: 'Ward Manager', initials: 'JO', status: 'On shift' },
  { id: 'st3', name: 'Priya Shah', role: 'Senior Nurse', initials: 'PS', status: 'On break' },
  { id: 'st4', name: 'Tom Reilly', role: 'Healthcare Asst.', initials: 'TR', status: 'On shift' },
]

export const announcements = [
  { id: 'a1', title: 'New uniform standard effective 1 July', body: 'Updated footwear policy now live under Staff Standards.', date: 'Today' },
  { id: 'a2', title: 'Ward 4 winter rota published', body: 'Check Administration for the full shift schedule.', date: 'Yesterday' },
]

export const emergencyAlerts = [{ id: 'e1', title: 'Major incident drill — Thursday 09:00', severity: 'High' as const }]

export const shiftOverview = {
  ward: 'Ward 4 — Acute Medicine',
  staffOnDuty: 8,
  patientsOnWard: 24,
  nextHandover: '19:00',
}

export const learningProgress = { modulesComplete: 9, modulesTotal: 12, percent: 75 }
export const careerProgress = { currentRank: 'Band 6 — Senior Staff Nurse', nextRank: 'Band 7 — Ward Manager', percent: 60 }

export const trendingSearches = ['Sepsis Six', 'Controlled drugs', 'Falls risk', 'Uniform policy']

export const todaysSchedule = [
  { id: 't1', time: '08:00', title: 'Handover', subtitle: 'Ward 4', priority: false },
  { id: 't2', time: '09:00', title: 'Major Incident Drill', subtitle: 'High priority', priority: true },
  { id: 't3', time: '11:30', title: 'Team Briefing', subtitle: 'Staff Room', priority: false },
]

export interface ClinicalShortcut {
  id: string
  label: string
  icon: LucideIcon
}

export const clinicalShortcuts: ClinicalShortcut[] = [
  { id: 'cs1', label: 'NEWS2 Calculator', icon: Stethoscope },
  { id: 'cs2', label: 'Drug Interaction Check', icon: Pill },
  { id: 'cs3', label: 'Sepsis Pathway', icon: BookOpen },
]
