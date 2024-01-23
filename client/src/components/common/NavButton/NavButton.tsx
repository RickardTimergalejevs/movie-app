import { Link } from 'react-router-dom'
import './NavButton.scss'

type Props = {
  color?: 'light' | 'green'
  children?: string
  link?: string
  onClick?: () => void
}

const NavButton = ({ color, children, link, onClick }: Props) => {
  const hasColor = color ? `nav-btn--${color}` : ''
  return (
    <Link to={link || '/'}>
      <button onClick={onClick} className={`nav-btn ${hasColor}`}>
        {children}
      </button>
    </Link>
  )
}

export default NavButton
