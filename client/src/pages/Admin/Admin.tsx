import { Field, FieldProps, Form, Formik } from 'formik'
import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'
import * as Yup from 'yup'

import { useGetPlayingMoviesQuery } from '../../redux/services/movies'

const Admin = () => {
  const { data: movie, isLoading, isError } = useGetPlayingMoviesQuery(1)
  console.log(movie)

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

  console.log(initialValuesSession)

  const loginSchema = Yup.object().shape({
    movieId: Yup.number().required('Movie is required'),
    city: Yup.string().required('City is required'),
    showDate: Yup.string().required('Show date is required'),
    showTime: Yup.string().required('Show time is required'),
    displayType: Yup.string().required('Display type is required'),
  })

  const handleSubmit = (values: ISessionValues, { setValues }) => {
    const movieIdAsNumber = parseInt(values.movieId, 10)
    setValues((prevValues) => ({ ...prevValues, movieId: movieIdAsNumber }))
    console.log('Formatted Date:', values)
  }

  return (
    <div>
      <h1>Admin</h1>
      <h1>Create new session</h1>
      <Formik
        key="session"
        initialValues={initialValuesSession}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Select movie</label>
          <Field as="select" name="movieId" id="movieId">
            <option value="">Select a movie</option>
            {movie?.results?.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </Field>
          <Field as="select" name="city" id="city">
            <option value="">Select a city</option>
            <option value="Stockholm">Stockholm</option>
          </Field>
          <label>Select date</label>
          <Field type="date" name="showDate" id="showDate" />
          <label>Select time</label>
          <Field type="time" name="showTime" id="showTime" />
          <Field as="select" name="displayType">
            <option value="">Select a display type</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Admin
