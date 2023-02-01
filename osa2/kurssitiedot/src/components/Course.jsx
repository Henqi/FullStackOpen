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
        <>
          <div>
            {content.map(currentPart => <Part part={currentPart} key={currentPart.id}/>)}
          </div>
          <div>
            <b>
              Total of {exerciseTotal} exercises
            </b>
          </div>
        </>
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

export default Course