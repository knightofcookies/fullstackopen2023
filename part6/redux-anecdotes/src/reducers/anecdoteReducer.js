import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    replaceAnecdote(state, action) {
      const anecdoteToReplace = action.payload
      return state.map(anecdote => anecdote.id === anecdoteToReplace.id ? anecdoteToReplace : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.replace(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}
