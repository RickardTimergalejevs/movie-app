import './Login.scss'
import Modal from '../../components/common/Modal/Modal'
import Input from '../../components/common/Input/Input'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

interface ILoginValues {
  email: string
  password: string
}

interface IRegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
  city: string
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
  city: Yup.string().required('City is required'),
})

const Login = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)

  const handleChangeForm = () => {
    setIsRegisterForm(!isRegisterForm)
  }

  const initialValuesLogin: ILoginValues = { email: '', password: '' }
  const initialValuesRegister: IRegisterValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
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
                  id="city"
                  name="city"
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
