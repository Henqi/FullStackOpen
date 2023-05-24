import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  createAnecdote,
  voteAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer