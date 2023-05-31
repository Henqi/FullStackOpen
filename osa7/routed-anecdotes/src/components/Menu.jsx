import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import AnecdoteList from './AnecdoteList';
import CreateNew from './CreateNew';
import About from './About';

function Menu() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="create" element={<CreateNew />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default Menu;
