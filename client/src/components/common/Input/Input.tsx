import './Input.scss'
import { FieldProps } from 'formik'

const Input: React.FC<FieldProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const error = errors[field.name] as string | undefined

  return (
    <div>
      <input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <p className="error-message">{error}</p>
      )}
    </div>
  )
}

export default Input
