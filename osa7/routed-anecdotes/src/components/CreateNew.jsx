import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNew({ anecdotes, setAnecdotes, setNotification }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const navigate = useNavigate()
  const addNew = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      id: Math.round(Math.random() * 10000),
    }
    setAnecdotes(anecdotes.concat(newAnecdote));
    setNotification(`Created new anecdote: ${newAnecdote.content}`)
    setTimeout(() => setNotification(''), 5000)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default CreateNew;
