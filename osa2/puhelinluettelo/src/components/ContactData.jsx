import contactService from './../services/contacts'

const ContactData = ({ filterName, persons, setPersons, setSuccessMessage, setErrorMessage }) => {
  return (
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
                .map(person => <PersonRow personData={person} 
                                          persons={persons} 
                                          setPersons={setPersons} 
                                          key={person.name}
                                          setSuccessMessage={setSuccessMessage}
                                          setErrorMessage={setErrorMessage} /> 
                    )
        }
    </div>
  )
}

const PersonRow = ({ personData, persons, setPersons, setSuccessMessage, setErrorMessage }) => {
  return (
    <li key={personData.id}>
      {personData.name} {personData.number} <DeleteButton personData={personData} 
                                                          persons={persons} 
                                                          setPersons={setPersons}
                                                          setSuccessMessage={setSuccessMessage}
                                                          setErrorMessage={setErrorMessage} />
    </li>
  )
}

const DeleteButton = ({ personData, persons, setPersons, setSuccessMessage, setErrorMessage }) => {
  return (
    <button onClick={() => {handleDelete(personData, persons, setPersons, setSuccessMessage, setErrorMessage)}}>
      Delete
    </button>
  )
}

const handleDelete = (personData, persons, setPersons, setSuccessMessage, setErrorMessage) => {
if (window.confirm(`Delete contact information of ${personData.name}?`)) {
  contactService.deleteContact(personData.id)
                  .then(response => setSuccessMessage(`${personData.name} deleted from phonebook contacts`))
                  .catch(response => setErrorMessage(`Contact information of ${personData.name} has already been removed from the server`))
                  .finally(() => (setPersons(persons.filter(person => person.id !== personData.id))))
  } 
}

export default ContactData