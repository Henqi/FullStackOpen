const App = () => {

  const mainHeader = 'Web Development Curriculum'
  const courses = [
    {
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
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
        {
          name: 'Redux2',
          exercises: -7,
          id: 5
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: -99,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: -1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: -2
        }
      ]
    },
    {
      name: 'Boaty McBoatface',
      id: 1337,
      parts: [
        {
          name: 'Boat steering',
          exercises: 3,
          id: -10
        },
        {
          name: 'Beer drinking',
          exercises: 72,
          id: -20
        }
      ]
    }
  ]


  return (
    <>
      <div>
        <h1>
          {mainHeader}
        </h1>
      </div>
      <div>
        {courses.map(courseData => <Course course={courseData} key={courseData.id} />)}
      </div>
    </>
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
    <h2>{name}</h2>
  </div>
  )
}

const Content = ({ content }) => {
  const exerciseTotal = content.map(part => part.exercises).reduce((sum, currentExercises) => sum += currentExercises)
  return(
      <div>
        <div>
          {content.map(currentPart => <Part part={currentPart} key={currentPart.id}/>)}
        </div>
        <div>
          <b>
            Total of {exerciseTotal} exercises
          </b>
        </div>
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