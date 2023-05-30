import { useQuery } from 'react-query'
import { getAnecdotes } from '../requests'

const AnecdoteList = () => {

  const result = useQuery('anecdotes', getAnecdotes, {
    retry:1
  })
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Anecdote service not available due to a server problem :(</div>
  }

  const anecdotes = result.data
  
  const handleVote = (anecdote) => {
    console.log('vote')
  }

    return (
      <div>
          {anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
              </div>
          )}
      </div>
    )
  }
  
  export default AnecdoteList
  