import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const AnecdoteList = () => {
  const [timeoutId, setTimeoutId] = useState()

  const anecdotes = useSelector(state => {
    if (state.filter.trim() === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => {
        return anecdote.content.includes(state.filter)
      })
    }
  })

  const dispatch = useDispatch()

  const resetNotification = () => {
    dispatch(clearNotification())
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted for: "${anecdote.content}"`))
    clearTimeout(timeoutId)
    const toId = setTimeout(resetNotification, 5000)
    setTimeoutId(toId)
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