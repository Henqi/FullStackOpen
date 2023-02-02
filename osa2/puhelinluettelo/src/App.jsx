import { useState } from 'react'
import NameFilter from './components/NameFilter'
import AddContact from './components/AddContact'
import ContactData from './components/ContactData'

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
        <NameFilter filterName={filterName}
                    setFilter={setFilter}  
                    handleFilterChange={handleFilterChange}/>
      <div>
      <h2>Add new contact</h2>
        <AddContact newName={newName} 
                    setNewName={setNewName} 
                    newNumber={newNumber} 
                    setNewNumber={setNewNumber} 
                    persons={persons} 
                    setPersons={setPersons}
                    handleNameChange= {handleNameChange}
                    handleNumberChange={handleNumberChange}/>
      </div>
      <h2>Numbers</h2>
      <div>
        <ContactData filterName={filterName} persons={persons}/>
      </div>
    </>
  )
}

export default App