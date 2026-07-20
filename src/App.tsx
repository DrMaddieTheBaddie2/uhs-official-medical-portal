import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import SopHandbook from '@/pages/SopHandbook'
import MedicationLibrary from '@/pages/MedicationLibrary'
import ClinicalProcedures from '@/pages/ClinicalProcedures'
import CareerPath from '@/pages/CareerPath'
import LearningCentre from '@/pages/LearningCentre'
import EmergencyReference from '@/pages/EmergencyReference'
import StaffStandards from '@/pages/StaffStandards'
import Administration from '@/pages/Administration'

export default function App() {
  return (
    <Routes>
      {/* Portal homepage — standalone brand surface, outside the handbook chrome */}
      <Route path="/" element={<Home />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sop-handbook" element={<SopHandbook />} />
        <Route path="/medication-library" element={<MedicationLibrary />} />
        <Route path="/clinical-procedures" element={<ClinicalProcedures />} />
        <Route path="/career-path" element={<CareerPath />} />
        <Route path="/learning-centre" element={<LearningCentre />} />
        <Route path="/emergency-reference" element={<EmergencyReference />} />
        <Route path="/staff-standards" element={<StaffStandards />} />
        <Route path="/administration" element={<Administration />} />
      </Route>
    </Routes>
  )
}
