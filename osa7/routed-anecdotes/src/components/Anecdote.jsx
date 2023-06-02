function Anecdote({ anecdote }) {
  const padding = {
    padding: 2,
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div style={padding}>
        <strong>Author:</strong>
        {' '}
        {anecdote.author}
      </div>
      <div style={padding}>
        <strong>Votes:</strong>
        {' '}
        {anecdote.votes}
      </div>
      <div style={padding}>
        <strong>For more info see:</strong>
        {' '}
        {anecdote.info}
      </div>
    </div>
  );
}

export default Anecdote;
