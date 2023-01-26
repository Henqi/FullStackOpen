import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return(
  <button onClick={handleClick}>    
    {text}  
  </button>
  )
}

const Header = ({ text }) => {
  return(
  <h1>    
    {text}  
  </h1>
  )
}

const StatRow = ({text, interactions}) => {
  return(
    <div>
      {text} {interactions}
    </div>
  )
}
  
const App = (props) => {
  const [badValue, setBadValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [goodValue, setGoodValue] = useState(0)

  const header1 = "Give Feedback!"
  const header2 = "Statistics"
  const badText = "Bad"
  const neutralText = "Neutral"
  const goodText = "Good! :)"

  const badIncrease = () => {
    console.log("increasing bad value by 1")
    setBadValue(badValue+1)
  }
  
  const neutralIncrease = () => {
    console.log("increasing neutral value by 1")
    setNeutralValue(neutralValue+1)
  }
  
  const goodIncrease = () => {
    console.log("increasing good value by 1")
    setGoodValue(goodValue+1)
  }

  return (
    <>
      <Header text={header1}/>
      <Button text={badText} handleClick={badIncrease} />
      <Button text={neutralText} handleClick={neutralIncrease} />
      <Button text={goodText} handleClick={goodIncrease} />
      <Header text={header2} />
      <StatRow text={badText} interactions={badValue}/>
      <StatRow text={neutralText} interactions={neutralValue}/>
      <StatRow text={goodText} interactions={goodValue}/>
    </>
  )
}

export default App