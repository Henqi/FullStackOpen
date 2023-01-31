import { useState, useEffect } from 'react'

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

const StatisticLine = ({text, interactions}) => {
  return(
    <tr>
      <td> 
        {text} 
      </td>
      <td>
        {interactions}
      </td>
    </tr>
  )
}
  
const Statistics = ({texts, values}) => {
  const valueSum = values.bad+values.neutral+values.good

  if (valueSum === 0) {
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
        <table>
          <tbody>
            <StatisticLine text={texts.badText} interactions={values.bad}/>
            <StatisticLine text={texts.neutralText} interactions={values.neutral}/>  
            <StatisticLine text={texts.goodText} interactions={values.good}/>
            <StatisticLine text={texts.allText} interactions={valueSum}/>
            <StatisticLine text={texts.averageText} interactions={values.average}/>
            <StatisticLine text={texts.positiveText} interactions={values.positive+"%"}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = (props) => {
  const [badValue, setBadValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [goodValue, setGoodValue] = useState(0)
  const [averageValue, setAverageValue] = useState(0)
  const [positiveValue, setPositiveValue] = useState(0)
  const allValues = {"bad":badValue, "neutral":neutralValue, "good":goodValue, "average":averageValue, "positive":positiveValue}

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
  }
  
  const neutralIncrease = () => {
    console.log("increasing neutral value by 1")
    setNeutralValue(neutralValue+1)
  }
  
  const goodIncrease = () => {
    console.log("increasing good value by 1")
    setGoodValue(goodValue+1)
  }

  const averageCalc = () => {
    console.log("calculating average review value")
    setAverageValue([badValue*-1, neutralValue*0, goodValue*1].reduce((average, current) => average += current)/(badValue+neutralValue+goodValue))
  }

  const positivePercentCalc = () => {
    console.log("calculating positive review percentage")
    setPositiveValue(goodValue/(badValue+neutralValue+goodValue)*100)
  }

  useEffect(averageCalc)
  useEffect(positivePercentCalc) 

  return (
    <div>
      <Header text={textData.header1}/>
      <Button text={textData.badText} handleClick={badIncrease}/>
      <Button text={textData.neutralText} handleClick={neutralIncrease} />
      <Button text={textData.goodText} handleClick={goodIncrease} />
      <Statistics texts={textData} values={allValues}/>
    </div>
  )
}

export default App