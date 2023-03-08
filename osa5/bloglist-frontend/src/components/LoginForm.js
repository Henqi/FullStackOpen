import loginService from '../services/login'

const loginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  setErrorMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userLogin)
      )
      setUser(userLogin)
      setUsername('')
      setPassword('')
    }
    catch{
      setErrorMessage('wrong username or password')
    }

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