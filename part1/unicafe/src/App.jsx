import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'all'} value={all}/>
        <StatisticLine text={'average'} value={average}/>
        <StatisticLine text={'positive'} value={positive + '%'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  const handleSetGood = () => {
    setGood(good + 1);
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleSetBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      {/* exercise 1.6*/}
      <h1>give feedback</h1> 
      <Button handleClick={handleSetGood} text={'good'}/>
      <Button handleClick={handleSetNeutral} text={'neutral'}/>
      <Button handleClick={handleSetBad} text={'bad'}/>
      <h1>statistics</h1>
      {
        all
        ?
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

export default App