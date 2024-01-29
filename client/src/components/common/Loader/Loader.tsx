import './Loader.scss'

const Loader = () => {
  const text = 'LOADING'

  const animatedLetters = text.split('').map((letter, index) => (
    <span key={index} className="loader">
      {letter}
    </span>
  ))

  return <div className="loader-container">{animatedLetters}</div>
}

export default Loader
