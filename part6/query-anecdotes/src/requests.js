import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const createAnecdote = anecdote => {
  return axios
    .post(baseUrl, anecdote)
    .then(res => res.data)
    // .catch(axiosErrorObj => {
    //   throw new Error(axiosErrorObj.response.data.error)
    // })
}

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const vote = (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return axios
    .put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    .then(res => res.data)
}
