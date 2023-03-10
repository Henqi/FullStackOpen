import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>    
      {text}  
    </button>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const nextButton = 'Next anecdote!'
  const voteButton = 'Vote for this!'
  const headerText1 = 'Anecdote of the day:'
  const headerText2 = 'Anecdote with most votes:'

  const [selected, setSelected] = useState(0) 
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0)) 

  const selectRandom = () => {
    const randomSeed = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomSeed)
    console.log('Random seed is: ', selected)
  }

  const voteAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const selectTopAnecdote = () => {
    const maxVotesIndex = points.indexOf(Math.max(...points))
    const topAnecdote = anecdotes[maxVotesIndex] 
    return topAnecdote
  }

  return (
    <>
      <div>
        <h1>
          {headerText1}
        </h1>
        <p>
          {anecdotes[selected]}
        </p>
      </div>
      <p>
        Anecdote has {points[selected]} votes!
      </p>
      <div>
        <Button text={voteButton} handleClick={voteAnecdote}/>
        <Button text={nextButton} handleClick={selectRandom}/>
      </div>
      <div>
        <h1>
          {headerText2}
        </h1>
        <p>
          {selectTopAnecdote()}
        </p>
        <p>
          Anecdote has {Math.max(...points)} votes!
        </p>
      </div>
    </>
  )
}

export default App