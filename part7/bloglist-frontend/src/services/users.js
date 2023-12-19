import axios from 'axios'
const baseUrl = '/api/users'

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
    if (exception.response) {
      console.error(exception.response.data)
    } else {
      console.error(exception)
    }
    return null
  }
}

const createUser = async (userObject) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(baseUrl, userObject, config)
    return response.data
  } catch (exception) {
    console.error(exception.response.data)
    return null
  }
}

const updateUser = async (user) => {
  const id = user.id
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, user, config)
    return response.data
  } catch (exception) {
    console.error(exception.response.data)
    return null
  }
}

const deleteUser = async (id) => {
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

export default { getAll, setToken, createUser, updateUser, deleteUser }
