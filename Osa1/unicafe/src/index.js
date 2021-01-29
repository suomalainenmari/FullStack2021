import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =({onClick,text})=> (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine =(props)=>{
  if (props.text==="positive"){
    return(
      <tr>
    <td>{props.text} </td>
    <td> {props.value} %</td>
    </tr>
    )
  }
  return(
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics=(props)=>{
  if (props.allClicks.length===0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return (

    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.good+props.neutral+props.bad}/>
        <StatisticLine text="average" value={(props.good+(props.neutral*0)+(props.bad*-1))/(props.good+props.neutral+props.bad)}/>
        <StatisticLine text="positive" value={(props.good/(props.good+props.neutral+props.bad))*100}/>
      </tbody>
      </table>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks,setAll]=useState([])

  const handleGoodClick=()=>{
    setAll(allClicks.concat('G'))
    setGood(good+1)
  }


  const handleNeutralClick=()=>{
    setAll(allClicks.concat('N'))
    setNeutral(neutral+1)
  }

  const handeBadClick=()=>{
    setAll(allClicks.concat('B'))
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handeBadClick} text='bad'/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)