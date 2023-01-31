import { useState } from 'react'



const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 0,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14555,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name}/>
      <Content content={props.course.parts}/>
    </div>
  )
}

const Header = ({ name }) => {
  return(
  <div>
    <h1>{name}</h1>
  </div>
  )
}

const Content = ({ content }) => {
  return(
      <div>
        {content.map(currentPart => <Part part={currentPart} key={currentPart.id}/>)}
      </div>
  )
}

const Part = ({ part }) => {
  return(
    <div>
      <li>
        {part.name+ ' ' +part.exercises}
      </li>
    </div>
  )
}

export default App
