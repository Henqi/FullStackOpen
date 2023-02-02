import { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import AddContact from './components/AddContact'
import ContactData from './components/ContactData'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
    
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, []
  )
  

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