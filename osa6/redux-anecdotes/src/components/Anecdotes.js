import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
        {anecdotes
        .sort((a, b) => {
          if(a.votes === b.votes) {
            return 0
          } else {
            return a.votes > b.votes ? -1 : 1
          }
        })
        .map(anecdote =>
          <div style={{padding: 5}} key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes {' '}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </>
  )

}

export default Anecdotes