import { Brand } from '@/components/brand/Brand.tsx'
import { footerNavigation } from '@/config/site-navigation.ts'
import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-intro">
          <Brand appearance="light" />
          <p>Clear diagnostics. Dependable service.<br />Every mile, accounted for.</p>
        </div>

        <div className="footer-links">
          <p className="footer-heading">Explore</p>
          <nav aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <a href={item.href} key={item.label}>{item.label}</a>
            ))}
          </nav>
        </div>

        <div className="footer-contact">
          <p className="footer-heading">Contact</p>
          <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=nehranakhoul%40gmail.com" target="_blank" rel="noreferrer">nehranakhoul@gmail.com</a>
          <p>Professional automotive<br />software and services.</p>
        </div>

        <a className="back-to-top" href="#revline" aria-label="Back to top">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 15V4M6 8l4-4 4 4" />
          </svg>
        </a>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Revline. All rights reserved.</p>
        <div>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
        <p>Built for the road ahead.</p>
      </div>
    </footer>
  )
}
