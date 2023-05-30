import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, voteAnecdote } from '../requests'

const AnecdoteList = () => {

  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

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
    voteAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      {anecdotes
        .sort((a,b) => {
          return a.votes < b.votes ? 1 : -1
        })
        .map(anecdote =>
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
