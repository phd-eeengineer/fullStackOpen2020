import React from 'react';

  const Course = ({courses}) => {  
    return (
      courses.map((course, i) => {
        return (
          <div key = {i}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )
      })
    )
  }

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

 const Content = ({ course }) => {  
    return (
      course.parts.map((part, i) => 
        <div key = {i}>
          < Part part = {part} />
        </div>
      )
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }

const Total = ({ course }) => {

  const total = course.parts
      .reduce((sum, part) => sum + part.exercises, 0)
  
  // const total = course.parts
  //     .map(part => part.exercises)
  //     .reduce((sum, exercise) => {        
  //       return sum + exercise
  // })
  
  return(
    <p><b>Total of {total} exercises</b></p>
  ) 
}

export default Course