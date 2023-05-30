import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, setNotification] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default notificationReducer