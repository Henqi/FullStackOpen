import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const AnecdoteForm = () => {
  const [timeoutId, setTimeoutId] = useState()

  const dispatch = useDispatch()

  const resetNotification = () => {
    dispatch(clearNotification())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if(anecdoteContent.trim() === '') {
      return
    }
    event.target.anecdote.value = ''

    dispatch(createAnecdote(anecdoteContent))
    dispatch(setNotification(`You added a new anecdote: "${anecdoteContent}"`))
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