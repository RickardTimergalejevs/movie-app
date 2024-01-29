import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import Input from '../../components/common/Input/Input'
import * as Yup from 'yup'
import './Admin.scss'

import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import { useCreateSessionMutation } from '../../redux/services/sessions'

const Admin = () => {
  const { data: movie, isLoading, isError } = useGetPlayingMoviesQuery(1)
  const [createSession, { isSuccess }] = useCreateSessionMutation()

  interface ISessionValues {
    movieId: number
    city: string
    showDate: string
    showTime: string
    displayType: string
  }

  const initialValuesSession: ISessionValues = {
    movieId: 0,
    city: '',
    showDate: '',
    showTime: '',
    displayType: '',
  }

  const loginSchema = Yup.object().shape({
    movieId: Yup.number().required('Movie is required'),
    city: Yup.string().required('City is required'),
    showDate: Yup.string().required('Show date is required'),
    showTime: Yup.string().required('Show time is required'),
    displayType: Yup.string().required('Display type is required'),
  })

  const handleSubmit = async (
    values: ISessionValues,
    { resetForm }: FormikHelpers<ISessionValues>,
  ) => {
    await createSession(values)
    resetForm()
  }

  return (
    <div className="admin__page">
      <div className="admin-nav">
        <hr />
        <h1 className="admin-nav__title">Admin</h1>
      </div>
      <div className="admin-wrapper">
        <h1>Create new session</h1>
        <Formik
          key="session"
          initialValues={initialValuesSession}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="session-form">
            <label>Select movie</label>
            <Field as="select" name="movieId" id="movieId">
              <option value="">---</option>
              {movie?.results?.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="movieId"
              component="div"
              className="error-message"
            />
            <label>Select city</label>
            <Field as="select" name="city" id="city">
              <option value="">---</option>
              <option value="Stockholm">Stockholm</option>
            </Field>
            <ErrorMessage
              name="city"
              component="div"
              className="error-message"
            />
            <label>Select date</label>
            <Field
              type="date"
              name="showDate"
              id="showDate"
              component={Input}
            />
            <label>Select time</label>
            <Field
              type="time"
              name="showTime"
              id="showTime"
              component={Input}
            />
            <label>Select display type</label>
            <Field as="select" name="displayType">
              <option value="">---</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </Field>
            <ErrorMessage
              name="displayType"
              component="div"
              className="error-message"
            />
            <button className="session-form__btn" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
        {isSuccess && <div>Session created!</div>}
      </div>
    </div>
  )
}

export default Admin
