import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationText = useNotificationValue()

  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

export default Notification
