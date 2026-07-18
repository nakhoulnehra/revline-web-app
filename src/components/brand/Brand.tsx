import logo from '@/assets/images/revline-logo-transparent.png'
import './Brand.css'

type BrandProps = {
  appearance?: 'default' | 'light'
}

export function Brand({ appearance = 'default' }: BrandProps) {
  return (
    <a className={`brand brand--${appearance}`} href="#revline" aria-label="Revline home">
      <span className="brand__mark">
        <img src={logo} alt="" />
      </span>
      <span className="brand__name">Revline</span>
    </a>
  )
}
