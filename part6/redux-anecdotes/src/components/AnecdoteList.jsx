import { useSelector, useDispatch } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()

  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  anecdotes.sort(sortByVotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes <button onClick={() => dispatch(voteById(anecdote.id))}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
