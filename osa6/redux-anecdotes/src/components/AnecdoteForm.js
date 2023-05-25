import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

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

    dispatch(createNewAnecdote(anecdoteContent))
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