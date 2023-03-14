import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm