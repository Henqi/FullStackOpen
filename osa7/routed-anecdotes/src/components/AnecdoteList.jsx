import { Link } from 'react-router-dom';

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => {
          return (
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default AnecdoteList;
