import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  if(props.income.all === 0){
    return (
      <div>
        <div>
          No feedback given
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><Statistic text="good"/></td>
              <td><Statistic value ={props.income.good} /></td>   
            </tr>
            <tr>
              <td><Statistic text="neutral"/></td>
              <td><Statistic value ={props.income.neutral} /></td>
            </tr>
            <tr>
              <td><Statistic text="bad"/></td> 
              <td><Statistic value ={props.income.bad} /></td>     
            </tr>
            <tr>
              <td><Statistic text="all" /></td>
              <td><Statistic value ={props.income.all} /></td>        

            </tr>
            <tr>
              <td><Statistic text="average" /></td>    
              <td><Statistic value ={props.income.avg} /></td>      

            </tr>
            <tr>
              <td><Statistic text="positive" /></td>  
              <td><Statistic value ={props.income.ratio} /></td>
              <td>%</td>      
            </tr>
          </tbody>        
        </table>
      </div>
    ) 
  }   
}

const Statistic = (props) =>{
    return (
      <div>
          {props.text} {props.value}
      </div>
    )  
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average
  let positive

  if(total === 0){
    average = 0
    positive = 0
  } else {
    average = (good-bad)/total
    positive = (good/total)*100
  }

  let data = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: total,
    avg: average,
    ratio: positive
  }
  
  const clickHandlerGood = () => {
    setGood(good+1)
  }

  const clickHandlernNeutral = () => {
    setNeutral(neutral+1)
  }

  const clickHandlerBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={clickHandlerGood} >good</button>
      <button onClick={clickHandlernNeutral}>neutral</button>
      <button onClick={clickHandlerBad}>bad</button>
      <h1>statistics</h1>      
      <Statistics income = {data}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)