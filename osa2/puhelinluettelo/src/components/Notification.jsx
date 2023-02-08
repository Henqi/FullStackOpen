const Notification = ({ message, setSuccessMessage }) => {
    if (message === null) {
      return null
    }
  
    const handleMessageChange = () => {
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }

    return (
      <div className="success" onChange={handleMessageChange()}>
        {message} 
      </div>
    )
  }

export default Notification