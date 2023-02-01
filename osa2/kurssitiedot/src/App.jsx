import Course from "./components/Course"

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
          exercises: -17,
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

export default App