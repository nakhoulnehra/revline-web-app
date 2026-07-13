import { Brand } from '@/components/brand/Brand.tsx'
import { headerNavigation } from '@/config/site-navigation.ts'
import './SiteHeader.css'

type SiteHeaderProps = {
  activeSection: string
}

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />

        <nav className="primary-nav" aria-label="Primary navigation">
          {headerNavigation.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
              aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-sign-in" href="#contact">
          <span>Get in touch</span>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" />
          </svg>
        </a>
      </div>
    </header>
  )
}
