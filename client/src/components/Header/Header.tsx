import { useSelector } from 'react-redux'
import './Header.scss'
import { Link } from 'react-router-dom'
import { selectIsAuthenticated } from '../../redux/features/auth/authSlice'

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

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
        {isAuthenticated ? (
          <p className="header__text">
            <Link to="/profile">Profile</Link>
          </p>
        ) : (
          <p className="header__text">
            <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </header>
  )
}

export default Header
