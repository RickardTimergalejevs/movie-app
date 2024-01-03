import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="header__logo">
        <p className="header__text">
          <Link to="/">Cineplex</Link>
        </p>
      </div>
      <nav className="header__nav">
        <p className="header__nav-item">
          <Link to="/movies">Movies</Link>
        </p>
        <hr />
        <p className="header__nav-item">
          <Link to="/upcoming">Upcoming</Link>
        </p>
      </nav>
      <div className="header__login">
        <p className="header__text">Login</p>
      </div>
    </header>
  )
}

export default Header
