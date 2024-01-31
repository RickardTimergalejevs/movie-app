import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="footer__logo">
        <p className="footer__text">Cinema</p>
      </div>
      <hr />
      <div className="footer__payment">
        <img src="/stripe.png" alt="stripe" />
      </div>
    </footer>
  )
}

export default Footer
