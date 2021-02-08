import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id:1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id:1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id:2
        },
        {
          name: 'State of a component',
          exercises: 10,
          id:3
        },
        {
          name: 'Redux',
          exercises: 11,
          id:4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]   
    },
    {
      name:'Web palvelinohjelmointi Java',
      id:3,
      parts: [
        {
          name: 'Thymeleaf',
          exercises: 4,
          id:1
        },
        {
          name:'Bootstrap',
          exercises:1,
          id:2
        },
        {
          name: 'jQuery',
          exercises:5,
          id:3
        }
      ]
    }  
]

  return(
    <div>
      {courses.map(course=>
        <Course key={course.id} course={course}/>
        )}
    </div>
  )
}
  



ReactDOM.render(<App />, document.getElementById('root'))

