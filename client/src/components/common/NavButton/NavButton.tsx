import { Link } from 'react-router-dom'
import './NavButton.scss'

type Props = {
  color?: 'light' | 'green'
  children?: string
  link?: string
}

const NavButton = ({ color, children, link }: Props) => {
  const hasColor = color ? `nav-btn--${color}` : ''
  return (
    <Link to={link || '/'}>
      <button className={`nav-btn ${hasColor}`}>{children}</button>
    </Link>
  )
}

export default NavButton
