import {
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom';
import { useState } from 'react';
import AnecdoteList from './AnecdoteList';
import Anecdote from './Anecdote';
import CreateNew from './CreateNew';
import About from './About';

function Menu() {
  const padding = {
    paddingRight: 5,
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null

  return (
    <>
      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">CreateNew</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} notification={notification} setNotification={setNotification} />}
        />
        <Route
          path="create"
          element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification} />}
        />
        <Route
          path="about"
          element={<About />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
    </>
  );
}

export default Menu;
