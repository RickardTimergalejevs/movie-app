import React from 'react'
import './Modal.scss'

type Props = {
  children: JSX.Element
}

const Modal = ({ children }: Props) => {
  return <div className="modal">{children}</div>
}

export default Modal
