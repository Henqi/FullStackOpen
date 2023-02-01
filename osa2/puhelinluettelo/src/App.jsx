import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personName = event.target[0].value.trim()
    
    if (persons.map(person => person.name).includes(personName)) {
      showErrorMessage(personName)
    }
    else {
      const newPersons = [...persons].concat({'name':personName})
      setPersons(newPersons)
      setNewName('')
    } 
  }

  const showErrorMessage = (personName) => {
    return(
        alert(`${personName} is already added to phonebook!`)
    )
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <PersonRow personData={person} key={person.name}/>)}
      </div>
    </>
  )
}

const PersonRow = ({ personData }) => {
  return(
    <li>
      {personData.name}
    </li>
  )
}

export default App