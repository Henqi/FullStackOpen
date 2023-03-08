import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username:username, password:password })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }