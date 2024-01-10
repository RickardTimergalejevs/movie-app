import './Login.scss'
import Modal from '../../components/common/Modal/Modal'
import Input from '../../components/common/Input/Input'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/services/auth'
import { useNavigate } from 'react-router-dom'

interface ILoginValues {
  email: string
  password: string
}

interface IRegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid ')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Email must be a valid ')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  location: Yup.string().required('City is required'),
})

const Login = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const navigate = useNavigate()

  const [register, { isSuccess }] = useRegisterMutation()
  const [login] = useLoginMutation()

  const handleChangeForm = () => {
    setIsRegisterForm(!isRegisterForm)
  }

  const handleRegister = async (values: IRegisterValues) => {
    try {
      const data = await register(values).unwrap()

      console.log(data)

      if (data) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (values: ILoginValues) => {
    try {
      const data = await login(values).unwrap()

      console.log(data)

      if (data) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const initialValuesLogin: ILoginValues = { email: '', password: '' }
  const initialValuesRegister: IRegisterValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
  }

  return (
    <div className="login__page">
      <Modal>
        <div className="login-wrapper">
          <h1 className="login-title">
            {!isRegisterForm ? 'Login' : 'Register'}
          </h1>
          {!isRegisterForm ? (
            <Formik
              key="login"
              initialValues={initialValuesLogin}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                handleLogin(values)
                console.log({ values, actions })
                actions.setSubmitting(false)
              }}
            >
              <Form className="login-form">
                <Field
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  component={Input}
                />
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={Input}
                />
                <button className="login-form__btn" type="submit">
                  Login
                </button>
              </Form>
            </Formik>
          ) : (
            <Formik
              key="register"
              initialValues={initialValuesRegister}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                handleRegister(values)
                console.log({ values, actions })
                actions.setSubmitting(false)
              }}
            >
              <Form className="login-form">
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  component={Input}
                />
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  component={Input}
                />
                <Field
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  component={Input}
                />
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={Input}
                />
                <Field
                  id="location"
                  name="location"
                  placeholder="City"
                  type="text"
                  component={Input}
                />
                <button className="login-form__btn" type="submit">
                  Register
                </button>
              </Form>
            </Formik>
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
