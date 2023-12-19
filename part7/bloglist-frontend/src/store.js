import { configureStore } from '@reduxjs/toolkit'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import successNotificationReducer from './reducers/successNotificationReducer'

const store = configureStore({
  reducer: {
    errorNotification: errorNotificationReducer,
    successNotification: successNotificationReducer
  }
})

export default store
