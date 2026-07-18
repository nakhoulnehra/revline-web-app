import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/revline-logo-transparent.png'
import { useAuth } from '@/features/auth'
import { ApiError, type ValidationErrors } from '@/lib/api-client.ts'
import '@/components/brand/Brand.css'
import './AuthPage.css'

type AuthMode = 'sign-in' | 'sign-up'

export function AuthPage() {
  const { user, isLoading, login, register } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/thank-you', { replace: true })
    }
  }, [isLoading, user, navigate])

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setFieldErrors({})
    setFormError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFieldErrors({})
    setFormError(null)
    setIsSubmitting(true)

    try {
      if (mode === 'sign-in') {
        await login({ email, password })
      } else {
        await register({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
      }
      navigate('/thank-you')
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(error.errors)
        setFormError(
          error.status === 429
            ? 'Too many attempts. Please wait a minute and try again.'
            : error.message,
        )
      } else {
        setFormError('Something went wrong. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const errorFor = (field: string) => fieldErrors[field]?.[0]

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Link className="brand" to="/" aria-label="Revline home">
          <span className="brand__mark">
            <img src={logo} alt="" />
          </span>
          <span className="brand__name">Revline</span>
        </Link>

        <Link className="auth-page__back" to="/">
          Back to landing page
        </Link>
      </header>

      <main className="auth-card" aria-label="Account access">
        <div className="auth-card__tabs" role="tablist" aria-label="Choose sign in or sign up">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'sign-in'}
            className={mode === 'sign-in' ? 'is-active' : undefined}
            onClick={() => switchMode('sign-in')}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'sign-up'}
            className={mode === 'sign-up' ? 'is-active' : undefined}
            onClick={() => switchMode('sign-up')}
          >
            Create account
          </button>
        </div>

        <h1 className="auth-card__title">
          {mode === 'sign-in' ? 'Welcome back' : 'Join Revline'}
        </h1>
        <p className="auth-card__subtitle">
          {mode === 'sign-in'
            ? 'Sign in to continue to your Revline account.'
            : 'Create your account to be first in line when the portal opens.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === 'sign-up' && (
            <label className="auth-form__field">
              <span>Full name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={255}
              />
              {errorFor('name') && <em role="alert">{errorFor('name')}</em>}
            </label>
          )}

          <label className="auth-form__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={255}
            />
            {errorFor('email') && <em role="alert">{errorFor('email')}</em>}
          </label>

          <label className="auth-form__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={mode === 'sign-up' ? 8 : undefined}
            />
            {errorFor('password') && <em role="alert">{errorFor('password')}</em>}
          </label>

          {mode === 'sign-up' && (
            <label className="auth-form__field">
              <span>Confirm password</span>
              <input
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                required
                minLength={8}
              />
            </label>
          )}

          {formError && (
            <p className="auth-form__error" role="alert">
              {formError}
            </p>
          )}

          <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Please wait…'
              : mode === 'sign-in'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </form>
      </main>
    </div>
  )
}
