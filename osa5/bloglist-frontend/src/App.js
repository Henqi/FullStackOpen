import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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

  const createBlogRef = useRef()

  if (user === null) {
    return (
      <>
        <h2> Log in to blog app:</h2>
        <div>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <div>
          {
            (successMessage)
              ? <Notification message={successMessage} setMessage={setSuccessMessage} type={'success'}/>
              : <Notification message={errorMessage} setMessage={setErrorMessage} type={'error'}/>
          }
        </div>
      </>
    )
  }
  else {
    return (
      <>
      User logged in: {user.username}
        <button onClick={handleLogOut}>
        logout
        </button>
        <div>
          <Togglable buttonLabel='Create blog' ref={createBlogRef} >
            <CreateBlog
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
              createBlogRef={createBlogRef}
            />
          </Togglable>
        </div>
        <div>
          {
            (successMessage)
              ? <Notification message={successMessage} setMessage={setSuccessMessage} type={'success'}/>
              : <Notification message={errorMessage} setMessage={setErrorMessage} type={'error'}/>
          }
        </div>
        <div>
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </>
    )
  }

}

export default App