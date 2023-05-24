import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content: content,
        id: getId(),
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const selectedAnecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...selectedAnecdote,
        votes: selectedAnecdote.votes+1
      }
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  createAnecdote,
  voteAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer