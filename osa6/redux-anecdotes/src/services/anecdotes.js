import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

export default {
  getAll,
  createNew
}