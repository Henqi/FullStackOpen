import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const [timeoutId, setTimeoutId] = useState()

  const dispatch = useDispatch()

  const resetNotification = () => {
    dispatch(clearNotification())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if(anecdoteContent.trim() === '') {
      return
    }
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You added a new anecdote: "${newAnecdote.content}"`))
    clearTimeout(timeoutId)
    const toId = setTimeout(resetNotification, 5000)
    setTimeoutId(toId)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm