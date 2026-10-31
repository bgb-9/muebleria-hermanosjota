import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`

function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="logo" to="/" onClick={closeMenu}>
          <img src="/img/logo.svg" alt="Logotipo de Mueblería Hermanos Jota" />
        </Link>
        <button type="button" className="nav-toggle" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}>
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Navegación principal">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>Inicio</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/productos" className={navLinkClass} onClick={closeMenu}>Productos</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/contacto" className={navLinkClass} onClick={closeMenu}>Contacto</NavLink>
            </li>
          </ul>
        </nav>
        <button type="button" className="cart" onClick={onCartClick} aria-label="Ver carrito">
          <svg className="cart__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h11M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="cart__count">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar