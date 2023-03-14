import PropTypes from 'prop-types'

const Notification = ({ message, setMessage, type }) => {
  if (message === null) {
    return null
  }

  const handleMessageChange = () => {
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  let messageType
  (type === 'success') ? messageType = 'success' : messageType = 'error'

  return (
    <div className={messageType} onChange={handleMessageChange()}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  setMessage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification