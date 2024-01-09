import './Login.scss'
import Modal from '../../components/common/Modal/Modal'
import Input from '../../components/common/Input/Input'

const Login = () => {
  return (
    <div className="login__page">
      <Modal>
        <h1>Login</h1>
        <Input placeholder="E-mail" />
        <Input placeholder="Password" />
      </Modal>
    </div>
  )
}

export default Login
