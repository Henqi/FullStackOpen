import contactService from './../services/contacts'

const ContactData = ({ filterName, persons, setPersons, setSuccessMessage }) => {
  return (
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
                .map(person => <PersonRow personData={person} 
                                          persons={persons} 
                                          setPersons={setPersons} 
                                          key={person.name}
                                          setSuccessMessage={setSuccessMessage} /> 
                    )
        }
    </div>
  )
}

const PersonRow = ({ personData, persons, setPersons, setSuccessMessage }) => {
  return (
    <li>
      {personData.name} {personData.number} <DeleteButton personData={personData} 
                                                          persons={persons} 
                                                          setPersons={setPersons}
                                                          setSuccessMessage={setSuccessMessage} />
    </li>
  )
}

const DeleteButton = ({ personData, persons, setPersons, setSuccessMessage }) => {
  return (
    <button onClick={() => {handleDelete(personData, persons, setPersons, setSuccessMessage)}}>
      Delete
    </button>
  )
}

const handleDelete = (personData, persons, setPersons, setSuccessMessage) => {
  if (window.confirm(`Delete contact information of ${personData.name}?`)) {
    contactService.deleteContact(personData.id)
                  .then(() => (setPersons(persons.filter(person => person.id !== personData.id)))
                  )
    setSuccessMessage(`${personData.name} deleted from phonebook contacts`)
  } 
}

export default ContactData