import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNewNotification } from '../reducers/notificationReducer'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if(anecdoteContent.trim() === '') {
      return
    }
    event.target.anecdote.value = ''

    dispatch(createNewAnecdote(anecdoteContent))
    dispatch(setNewNotification(`You added a new anecdote: "${anecdoteContent}"`, notification.timeoutId))
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