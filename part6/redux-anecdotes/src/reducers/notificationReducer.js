import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    resetNotification() {
      return ""
    }
  }
})

export const { changeNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, time) => {
  return dispatch => {
      const timeInMilliseconds = time * 1000
      dispatch(changeNotification(content))
      setTimeout(() => {
          dispatch(resetNotification())
      }, timeInMilliseconds)
  }
}