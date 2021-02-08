import React from 'react'

const Course = ({course})=>{
    return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </div>
  )}
  
  const Header = (props) =>{
    console.log(props)
    return(
      <h1>{props.course}</h1>
    )
  }
  
  const Part = ({part})=>{
    console.log(part)
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts})=>{
    const hours = (parts.map(part=>part.exercises))
    const reducer = (accumulator, currentValue) => accumulator+currentValue
    const total=hours.reduce(reducer)
  
    console.log(total)
    return(
      <div>
        <p><b>Total of {total} exercises</b></p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>  
        {parts.map(part=>
          <Part key={part.name} part={part}/>
        )}
      </div>
  
    )
  }

  export default Course