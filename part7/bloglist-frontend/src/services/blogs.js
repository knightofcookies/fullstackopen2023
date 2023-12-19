import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (exception) {
    if(exception.response) {
      console.error(exception.response.data)
    } else {
      console.error(exception)
    }
      return null
  }
}

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(baseUrl, blogObject, config)
    return response.data
  } catch (exception) {
    console.error(exception.response.data)
    return null
  }
}

const updateBlog = async (blog) => {
  const id = blog.id
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blog, config)
    return response.data
  } catch (exception) {
    console.error(exception.response.data)
    return null
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (exception) {
    console.error(exception.response.data)
    throw new Error(exception.response.data)
  }
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }
