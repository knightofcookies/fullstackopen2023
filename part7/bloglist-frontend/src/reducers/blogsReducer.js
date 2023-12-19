import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      return state.concat(action.payload)
    },
    replaceBlog (state, action) {
      const blogToReplace = action.payload
      return state.map(blog => (blog.id === blogToReplace.id ? blogToReplace : blog))
    },
    deleteBlog (state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export default blogsSlice.reducer
export const { setBlogs, appendBlog, replaceBlog, deleteBlog } = blogsSlice.actions
