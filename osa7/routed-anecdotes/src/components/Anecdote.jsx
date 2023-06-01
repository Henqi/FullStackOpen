import { useParams } from 'react-router-dom';

function Anecdote({ anecdote }) {
  const padding = {
    padding: 2,
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div style={padding}>
        Author:
        {' '}
        {anecdote.author}
      </div>
      <div style={padding}>
        Has
        {' '}
        {anecdote.votes}
        {' '}
        votes
      </div>
      <div style={padding}>
        For more info see:
        {' '}
        {anecdote.info}
      </div>
    </div>
  );
}

export default Anecdote;
