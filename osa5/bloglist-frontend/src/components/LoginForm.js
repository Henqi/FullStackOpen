import loginService from '../services/login'

const loginForm = ({ username, setUsername, password, setPassword, setUser }) => {
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)  
    const userLogin = await loginService.login(username, password)
    setUser(userLogin) 
  }

  return (  
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
}

export default loginForm