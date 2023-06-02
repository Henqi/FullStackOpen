import { Link } from 'react-router-dom';
import Notification from './Notification';

function AnecdoteList({
  anecdotes,
  setAnecdotes,
  notification,
}) {
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Notification text={notification} />
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => {
        return (
          <ul key={anecdote.id}>
            <li>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          </ul>
        )
      })}
    </div>
  );
}

export default AnecdoteList;
