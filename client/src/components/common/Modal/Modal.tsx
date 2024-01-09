import React from 'react'
import './Modal.scss'

type Props = {
  children: JSX.Element[]
  onClose?: () => void
}

const Modal = ({ children, onClose }: Props) => {
  return <div className="modal">{children}</div>
}

export default Modal
