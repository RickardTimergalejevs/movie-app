import './Login.scss'
import Modal from '../../components/common/Modal/Modal'
import Input from '../../components/common/Input/Input'
import { useState } from 'react'

const Login = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)

  const handleChangeForm = () => {
    setIsRegisterForm(!isRegisterForm)
  }

  return (
    <div className="login__page">
      <Modal>
        <div className="login-wrapper">
          <h1 className="login-title">
            {!isRegisterForm ? 'Login' : 'Register'}
          </h1>
          {!isRegisterForm ? (
            <form className="login-form" action="">
              <Input placeholder="E-mail" type="e-mail" />
              <Input placeholder="Password" type="password" />
              <button className="login-form__btn">Login</button>
            </form>
          ) : (
            <form className="login-form" action="">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="E-mail" />
              <Input placeholder="Password" />
              <Input placeholder="City" />
              <button className="login-form__btn">Register</button>
            </form>
          )}
          <div className="login-footer">
            <p className="login-footer__title">Or</p>
            <p className="login-footer__type" onClick={handleChangeForm}>
              {!isRegisterForm ? 'Register' : 'Login'}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login
