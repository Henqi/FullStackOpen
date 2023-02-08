import contactService from './../services/contacts'

const AddContact = ({ newName, 
                      setNewName, 
                      newNumber, 
                      setNewNumber, 
                      persons, 
                      setPersons, 
                      handleNameChange, 
                      handleNumberChange,
                      setSuccessMessage }) => {

  const addNewPerson = (event) => {
      event.preventDefault()
      const personName = event.target[0].value.trim()
      const personNumber = event.target[1].value.trim()
      
      if (persons.map(person => person.name.toLowerCase()).includes(personName.toLowerCase())) {
        if (confirmReplace(personName)) {
          const selectedPerson = persons.filter(person => person.name.toLowerCase() === personName.toLowerCase())[0]
          const updatedPerson = {...selectedPerson, 'number':personNumber}
          const updatedPersons = persons.map(person => (
            person.name.toLowerCase() === personName.toLowerCase() ? updatedPerson : person)
          ) 
          contactService.updateContact(selectedPerson.id, updatedPerson)
                        .then(setPersons(updatedPersons))
          setSuccessMessage(`Number of ${personName} was updated to ${personNumber}`)
        }
      }

      else {
        console.log('setSuccessMessage else:', setSuccessMessage)
        const newPerson = {'name':personName, 'number':personNumber} 
        const newPersons = [...persons].concat(newPerson)
        contactService.createContact(newPerson)
        setPersons(newPersons)
        setSuccessMessage(`${personName} was added to the phonebook`)
      } 

      setNewName('')
      setNewNumber('')
  }

  const confirmReplace = (personName) => {
      return (
          window.confirm(`${personName} is already added to phonebook! Replace the number with a new one?`)
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