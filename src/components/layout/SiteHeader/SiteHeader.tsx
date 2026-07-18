import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '@/components/brand/Brand.tsx'
import { headerNavigation } from '@/config/site-navigation.ts'
import { useAuth } from '@/features/auth'
import './SiteHeader.css'

type SiteHeaderProps = {
  activeSection: string
}

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  const { user, isLoading, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

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

        {user ? (
          <div className="header-account">
            <span className="header-account__name" title={user.email}>
              {user.name}
            </span>
            <button
              type="button"
              className="header-account__logout"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out…' : 'Log out'}
            </button>
          </div>
        ) : (
          <Link
            className="header-sign-in"
            to="/auth"
            style={isLoading ? { visibility: 'hidden' } : undefined}
          >
            <span>Register</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  )
}
