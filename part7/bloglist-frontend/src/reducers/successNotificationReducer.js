import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const successNotificationSlice = createSlice({
  name: 'successNotification',
  initialState,
  reducers: {
    changeSuccessNotification (state, action) {
      return action.payload
    },
    resetSuccessNotification (state, action) {
      return ''
    }
  }
})

export const { changeSuccessNotification, resetSuccessNotification } = successNotificationSlice.actions
export default successNotificationSlice.reducer

export const setSuccessNotification = (content, time) => {
  return dispatch => {
    const timeInMilliseconds = time * 1000
    dispatch(changeSuccessNotification(content))
    setTimeout(() => {
      dispatch(resetSuccessNotification())
    }, timeInMilliseconds)
  }
}
