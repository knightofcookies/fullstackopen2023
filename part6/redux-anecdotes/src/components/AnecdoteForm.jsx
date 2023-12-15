import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`created new anecdote : ${content}`, 5))
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="content" />
        <button>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
