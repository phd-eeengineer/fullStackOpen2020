import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Content = (props) => {
  const courses = props.course

  return (
    <div>
      <Part part = {courses.parts[0].name} exerciseCount = {courses.parts[0].exercises}/>
      <Part part = {courses.parts[1].name} exerciseCount = {courses.parts[1].exercises}/>
      <Part part = {courses.parts[2].name} exerciseCount = {courses.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exerciseCount}
      </p>
    </div>
  )  
}

const Total = (props) => {
  const courses = props.course
  return (
    <div>
      <p>
        Number of exercises {courses.parts[0].exercises + courses.parts[1].exercises + courses.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const myCourse = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header title = {myCourse.name}/>
      <Content course={myCourse} />
      <Total course={myCourse} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

/*
      

const Content = (props) => {

  return (
    <div>
      <Part part = {props.name1} exerciseCount = {props.count1}/>
      <Part part = {props.name2} exerciseCount = {props.count2}/>
      <Part part = {props.name3} exerciseCount = {props.count3}/>
    </div>
  )
}

const App = () => {
const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title = {course}/>
      <Content 
        name1 = {course.parts[0].name}  count1 = {course.parts[0].exercises} 
        name2 = {course.parts[1].name}  count2 = {course.parts[1].exercises} 
        name3 = {course.parts[2].name}  count3 = {course.parts[2].exercises}/> 
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
*/