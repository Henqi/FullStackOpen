import axios from 'axios'

const AddContact = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, handleNameChange, handleNumberChange }) => {
    
    const addNewPerson = (event) => {
        event.preventDefault()
        const personName = event.target[0].value.trim()
        const personNumber = event.target[1].value.trim()
        
        if (persons.map(person => person.name).includes(personName)) {
          showErrorMessage(personName)
        }
        else {
          const newPerson = {'name':personName, 'number':personNumber} 
          const newPersons = [...persons].concat(newPerson)
          setPersons(newPersons)
          addToDB(newPerson)
          setNewName('')
          setNewNumber('')
        } 
    }

    const addToDB = (person) => {
      axios.post('http://localhost:3001/persons', person)
    }

    const showErrorMessage = (personName) => {
        return (
            alert(`${personName} is already added to phonebook!`)
        )
    }
    
    return (
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
    )
}        
        
export default AddContact