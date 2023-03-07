import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')    
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    }, [])

    const handleLogOut = () => {
      window.localStorage.clear()    
      setUser(null)
    }

  if (user === null) {
    return (
    <>
    <h2> Log in to blog app:</h2>
      <LoginForm 
        username={username} 
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        />
    </>
    )
  }
  else {
    return (
    <>
      <div>
        User logged in: {user.username}
        <div>
          <button onClick={handleLogOut}>
            logout
          </button>
        </div>
      </div>
      <BlogList 
        blogs={blogs}
        setBlogs={setBlogs} 
        />
    </>      
    )
  }
    
}

export default App