import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
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
    setTimeout(resetNotification, 5000)
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