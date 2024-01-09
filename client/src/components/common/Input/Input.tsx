import './Input.scss'
import { FieldProps } from 'formik'

const Input: React.FC<FieldProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const error = errors[field.name] as string | undefined

  return (
    <>
      <input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{error}</div>
      )}
    </>
  )
}

export default Input
