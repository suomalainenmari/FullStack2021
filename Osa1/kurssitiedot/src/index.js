import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const course = {
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

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />

    </div>
  )
}

const Header = (props) =>{
  console.log(props)
  return(
    <h1>{props.course}</h1>
  )
}

const Part1 = (props) => {
  console.log(props)
  return(
    <p>
    {props.part1} {props.exercises1}
  </p>
  )
}

const Part2 = (props) =>{
  return(
    <p>
    {props.part2} {props.exercises2}
  </p>
  )
}

const Part3 = (props)=>{
  return(
    <p>
    {props.part3} {props.exercises3}
  </p>
  )
}
const Content = (props) => {
  return(
    <div>
      <Part1 part1={props.parts[0].name} exercises1={props.parts[0].exercises}/>
      <Part2 part2={props.parts[1].name} exercises2={props.parts[1].exercises}/>
      <Part3 part3={props.parts[2].name} exercises3={props.parts[2].exercises}/>
    </div>

  )
}

const Total = (props)=>{
  return(
    <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))