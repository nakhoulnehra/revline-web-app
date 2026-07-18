import { Link, Navigate } from 'react-router-dom'
import logo from '@/assets/images/revline-logo-transparent.png'
import { useAuth } from '@/features/auth'
import '@/components/brand/Brand.css'
import './ThankYouPage.css'

export function ThankYouPage() {
  const { user, isLoading } = useAuth()

  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="thank-you-page">
      <header className="thank-you-page__header">
        <Link className="brand" to="/" aria-label="Revline home">
          <span className="brand__mark">
            <img src={logo} alt="" />
          </span>
          <span className="brand__name">Revline</span>
        </Link>
      </header>

      <main className="thank-you" aria-label="Registration confirmation">
        {isLoading ? (
          <p className="thank-you__loading">Loading your account…</p>
        ) : (
          <>
            <h1 className="thank-you__message">
              Thank you for registering{user ? `, ${user.name}` : ''}.
              <br />
              The portal is under construction and will be available soon.
            </h1>
            <Link className="thank-you__cta" to="/">
              <span>Back to landing page</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h11M11 6l4 4-4 4" />
              </svg>
            </Link>
          </>
        )}
      </main>
    </div>
  )
}
