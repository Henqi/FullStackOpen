import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

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
        User logged in: {username}
      </div>
      <BlogList blogs={blogs}/>
    </>      
    )
  }
    
}

export default App