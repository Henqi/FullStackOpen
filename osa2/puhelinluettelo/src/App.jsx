import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personName = event.target[0].value.trim()
    const personNumber = event.target[1].value.trim()
    
    if (persons.map(person => person.name).includes(personName)) {
      showErrorMessage(personName)
    }
    else {
      const newPersons = [...persons].concat({'name':personName, 'number':personNumber})
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
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
      <div>
        Filter by name: <input value={filterName} onChange={handleFilterChange}/>
      </div>
      <div>
      <h2>Add new contact</h2>
        <form onSubmit={addNewPerson}>
          <div>
            Name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            Phone: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
                .map(person => <PersonRow personData={person} key={person.name}/>)}
      </div>
    </>
  )
}

const PersonRow = ({ personData }) => {
  return(
    <li>
      {personData.name} {personData.number}
    </li>
  )
}

export default App