import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is a notification XDXD, BEWARE!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer