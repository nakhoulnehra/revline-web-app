import { useState } from 'react'
import { ScrollJourney } from '@/components/journey/ScrollJourney.tsx'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter.tsx'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader.tsx'
import './LandingPage.css'

export function LandingPage() {
  const [activeSection, setActiveSection] = useState('revline')

  return (
    <div className="site-shell">
      <SiteHeader activeSection={activeSection} />
      <main className="landing-canvas" aria-label="Revline landing page">
        <ScrollJourney onActiveSectionChange={setActiveSection} />
      </main>
      <SiteFooter />
    </div>
  )
}
