import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, user) => {
  const token = user.token
  const response = await axios.post(baseUrl, blog, { 
    headers: {
      'Authorization': `Bearer ${token}`
    } 
  })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog }