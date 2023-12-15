/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, vote } from './requests'
import { useNotificationDispatch, useNotificationValue } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      useNotificationDispatch({
        type: 'SET',
        payload: 'nope'
      })
      console.log(error.message)
      setTimeout(() => {
        useNotificationDispatch({ type: 'RESET' })
      }, 5000);
    }
  })

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      useNotificationDispatch({
        type: 'SET',
        payload: error.message
      })
      setTimeout(() => {
        useNotificationDispatch({ type: 'RESET' })
      }, 5000);
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message} </span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteMutation.mutate(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
