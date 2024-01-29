import './Button.scss'

type Props = {
  color?: 'light' | 'dark' | 'dark-extra-light' | 'green'
  size?: 'small' | 'medium' | 'large'
  border?: 'rounded'
  selected?: boolean
  onClick?: () => void
  children?: string | number
  disabled?: boolean
}

const Button = ({
  color,
  selected,
  onClick,
  children,
  size,
  border,
  disabled,
}: Props) => {
  const hasColor = color ? `btn--${color}` : ''
  const hasSize = size ? `btn--${size}` : ''
  const hasBorder = border ? `btn--${border}` : ''
  const isSelected = selected ? 'btn--selected' : ''

  return (
    <button
      className={`btn ${hasColor} ${hasSize} ${hasBorder} ${isSelected}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
