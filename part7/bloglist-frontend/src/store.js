import { configureStore } from '@reduxjs/toolkit'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import successNotificationReducer from './reducers/successNotificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    errorNotification: errorNotificationReducer,
    successNotification: successNotificationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})

export default store
