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
  const [averageValue, setAverageValue] = useState(0)

  const header1 = "Give Feedback!"
  const header2 = "Statistics"
  const badText = "Bad"
  const neutralText = "Neutral"
  const goodText = "Good! :)"
  const averageText = "Average of reviews"
  const allText = "All"
  const positiveText = "Positive"

  const badIncrease = () => {
    console.log("increasing bad value by 1")
    setBadValue(badValue+1)
    averageCalc()
  }
  
  const neutralIncrease = () => {
    console.log("increasing neutral value by 1")
    setNeutralValue(neutralValue+1)
    averageCalc()
  }
  
  const goodIncrease = () => {
    console.log("increasing good value by 1")
    setGoodValue(goodValue+1)
    averageCalc()
  }

  const averageCalc = () => {
    console.log("calculating average review value")
    setAverageValue([badValue*-1, neutralValue*0, goodValue*1].reduce((average, current) => average += current)/(badValue+neutralValue+goodValue))
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
      <StatRow text={allText} interactions={badValue+neutralValue+goodValue}/>
      <StatRow text={averageText} interactions={averageValue}/>
      <StatRow text={positiveText} interactions={(goodValue/(badValue+neutralValue+goodValue)*100)+'%'}/>
    </>
  )
}

export default App