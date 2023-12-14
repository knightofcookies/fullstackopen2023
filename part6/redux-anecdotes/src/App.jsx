// import { useSelector, useDispatch } from 'react-redux'
// import { vote, createAnecdote } from './reducers/anecdoteReducer'

// const App = () => {
//   const anecdotes = useSelector(state => state)
//   const dispatch = useDispatch()

//   const sortByVotes = (a, b) => {
//     return b.votes - a.votes
//   }

//   anecdotes.sort(sortByVotes)

//   const addAnecdote = (event) => {
//     event.preventDefault()
//     const content = event.target.content.value
//     event.target.content.value = ''
//     dispatch(createAnecdote(content))
//   }

//   return (
//     <div>
//       <h2>Anecdotes</h2>
//       {anecdotes.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes} votes <button onClick={() => dispatch(vote(anecdote.id))}>Vote</button>
//           </div>
//         </div>
//       )}
//       <h2>Create new</h2>
//       <form onSubmit={addAnecdote}>
//         <input name="content" />
//         <button>Create</button>
//       </form>
//     </div>
//   )
// }

// export default App

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App