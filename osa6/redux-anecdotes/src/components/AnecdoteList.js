import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNewNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if (state.filter.trim() === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => {
        return anecdote.content.includes(state.filter)
      })
    }
  })
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNewNotification(`You voted for: "${anecdote.content}"`, notification.timeoutId))
  }

  return (
    <>
      {anecdotes.slice()
        .sort((a, b) => {
          if(a.votes === b.votes) {
            return 0
          } else {
            return a.votes > b.votes ? -1 : 1
          }
        })
        .map(anecdote =>
          <div style={{ padding: 5 }} key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes {' '}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>
  )

}

export default AnecdoteList