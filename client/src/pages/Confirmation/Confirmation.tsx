import './Confirmation.scss'

const Confirmation = () => {
  return (
    <div className="confirmation__page">
      <div className="confirmation-nav">
        <hr />
        <h1 className="confirmation-nav__title">Confirmation</h1>
      </div>
      <div className="confirmation-info">
        <h1>Thank you for your purchase!</h1>
        <p>You can view your ticket in your profile.</p>
      </div>
    </div>
  )
}

export default Confirmation
