const Notification = ({ message, setMessage, type }) => {
  if (message === null) {
    return null
  }

  const handleMessageChange = () => {
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  let messageType
  (type === 'success') ? messageType = 'success' : messageType = 'error'

  return (
    <div className={messageType} onChange={handleMessageChange()}>
      {message}
    </div>
  )
}

export default Notification