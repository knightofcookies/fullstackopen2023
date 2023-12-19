import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const errorNotificationSlice = createSlice({
  name: 'errorNotification',
  initialState,
  reducers: {
    changeErrorNotification (state, action) {
      return action.payload
    },
    resetErrorNotification (state, action) {
      return ''
    }
  }
})

export const { changeErrorNotification, resetErrorNotification } = errorNotificationSlice.actions
export default errorNotificationSlice.reducer

export const setErrorNotification = (content, time) => {
  return dispatch => {
    const timeInMilliseconds = time * 1000
    dispatch(changeErrorNotification(content))
    setTimeout(() => {
      dispatch(resetErrorNotification())
    }, timeInMilliseconds)
  }
}
