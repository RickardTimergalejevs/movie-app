import './Button.scss'

type Props = {
  color?: 'light' | 'dark' | 'dark-extra-light'
  size?: 'small' | 'medium' | 'large'
  border?: 'rounded'
  selected?: boolean
  onClick?: () => void
  children?: string | number
}

const Button = ({
  color,
  selected,
  onClick,
  children,
  size,
  border,
}: Props) => {
  const isSelected = selected ? 'btn--selected' : ''

  return (
    <button
      className={`btn btn--${color} btn--${size} btn--${border} ${isSelected}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
