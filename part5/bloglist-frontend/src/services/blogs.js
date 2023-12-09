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
    console.error(exception)
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
    console.error(exception)
    return null
  }
}

export default { getAll, setToken, createBlog }
