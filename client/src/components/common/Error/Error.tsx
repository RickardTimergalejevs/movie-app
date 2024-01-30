type Props = {
  children: string | undefined
}

const Error = ({ children }: Props) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  )
}

export default Error
