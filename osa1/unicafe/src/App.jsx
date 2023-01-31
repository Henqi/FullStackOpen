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
  
const Statistics = ({texts, values}) => {
  if (values.bad+values.neutral+values.good === 0) {
    return(
      <div>
        <Header text={texts.header2} />
        <p> No feedback given... </p>
      </div>
    )
  }
  else {
    return(
      <div>
        <Header text={texts.header2} />
        <StatRow text={texts.badText} interactions={values.bad}/>
        <StatRow text={texts.neutralText} interactions={values.neutral}/>
        <StatRow text={texts.goodText} interactions={values.good}/>
        <StatRow text={texts.allText} interactions={values.bad+values.neutral+values.good}/>
        <StatRow text={texts.averageText} interactions={values.average}/>
      </div>
    )
  }
  
}


const App = (props) => {
  const [badValue, setBadValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [goodValue, setGoodValue] = useState(0)
  const [averageValue, setAverageValue] = useState(0)
  const allValues = {"bad":badValue, "neutral":neutralValue, "good":goodValue, "average":averageValue}

  const textData = {
  "header1":"Give Feedback!",
  "badText":"Bad",
  "neutralText":"Neutral",
  "goodText" :"Good! :)",
  "header2":"Statistics",
  "averageText":"Average of reviews",
  "allText":"All",
  "positiveText":"Positive"
  }

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
    <div>
      <Header text={textData.header1}/>
      <Button text={textData.badText} handleClick={badIncrease} />
      <Button text={textData.neutralText} handleClick={neutralIncrease} />
      <Button text={textData.goodText} handleClick={goodIncrease} />
      <Statistics texts={textData} values={allValues}/>
    </div>
  )
}

export default App