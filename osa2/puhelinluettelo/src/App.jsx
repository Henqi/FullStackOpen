import { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import AddContact from './components/AddContact'
import ContactData from './components/ContactData'
import contactService from './services/contacts'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  useEffect(() => {
    contactService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

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
                    handleNameChange={handleNameChange} 
                    handleNumberChange={handleNumberChange} 
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                    />
      </div>
      <div>
      {(successMessage) 
        ? <Notification message={successMessage} setMessage={setSuccessMessage} type={'success'}/> 
        : <Notification message={errorMessage} setMessage={setErrorMessage} type={'error'}/>}
      </div>
      <h2>Numbers</h2>
      <div>
      <ContactData  filterName={filterName} 
                    persons={persons} 
                    setPersons={setPersons} 
                    setSuccessMessage={setSuccessMessage} 
                    setErrorMessage={setErrorMessage} />
      </div>
    </>
  )
}

export default App