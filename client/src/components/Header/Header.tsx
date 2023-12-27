import './Header.scss'

const Header = () => {
  return (
    <header>
      <div className="header__logo">
        <p className="header__text">Cinemax</p>
      </div>
      <nav className="header__nav">
        <p className="header__nav-item">Movies</p>
        <hr />
        <p className="header__nav-item">Upcoming</p>
      </nav>
      <div className="header__login">
        <p className="header__text">Login</p>
      </div>
    </header>
  )
}

export default Header
