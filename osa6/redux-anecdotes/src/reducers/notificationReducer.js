import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  timeoutId: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.text = action.payload
    },
    clearNotification(state) {
      state.text = ''
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload
    },
    clearTimeoutId(state) {
      state.timeoutId = 0
    }
  }
})

export const {
  setNotification,
  clearNotification,
  setTimeoutId,
  clearTimeoutId } = notificationSlice.actions

export const setNewNotification = (content, id) => {
  return dispatch => {
    clearTimeout(id)
    dispatch(clearTimeoutId())
    dispatch(setNotification(content))
    dispatch(setNotificationTimeout())
  }
}

const setNotificationTimeout = () => {
  return dispatch => {
    const id = setTimeout(() => dispatch(clearNotification()), 5000)
    dispatch(setTimeoutId(id))
  }
}

export default notificationSlice.reducer