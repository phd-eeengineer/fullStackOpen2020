import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MaxVotedAnectode = (props) =>{
  const list = props.inputList

  let max = list[0]
  let maxValuedIndex = 0

  for (let i = 1; i < list.length; i++) {
    if(list[i]>max){
      max = list[i]
      maxValuedIndex = i
    }    
  }
  return (
    <div>
      <div>{anecdotes[maxValuedIndex]}</div>
      <div>has {max} votes</div> 
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteList, setVoteList] = useState(Array(anecdotes.length).fill(0)) //
//  console.log("voteList: ", voteList)

  const anecdoteButtonHandler = ()=>{
    const anecdoteNumber = anecdotes.length // returns list length
    const newNumber = Math.floor(anecdoteNumber*Math.random())
    setSelected(newNumber)
    console.log("selected value: ", newNumber)
   }

  const voteButtonHandler = ()=>{
    const voteListCopy = [...voteList]
    voteListCopy[selected] += 1
    setVoteList(voteListCopy)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {voteList[selected]} votes
      </div>
      <div>
        <button onClick = {voteButtonHandler}>vote</button>
        <button onClick = {anecdoteButtonHandler}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
          <MaxVotedAnectode inputList = {voteList}/>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)