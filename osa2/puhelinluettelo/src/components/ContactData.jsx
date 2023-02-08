import contactService from './../services/contacts'

const ContactData = ({ filterName, persons, setPersons }) => {
  return (
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
                .map(person => <PersonRow personData={person} persons={persons} setPersons={setPersons} key={person.name} /> )}
    </div>
  )
}

const PersonRow = ({ personData, persons, setPersons }) => {
  return (
    <li>
      {personData.name} {personData.number} <DeleteButton personData={personData} persons={persons} setPersons={setPersons} />
    </li>
  )
}

const DeleteButton = ({ personData, persons, setPersons }) => {
  
  const handleDelete = (personData, persons, setPersons) => {
    if (window.confirm(`Delete contact information of ${personData.name}?`)) {
      contactService.deleteContact(personData.id)
                    .then(() => (setPersons(persons.filter(person => person.id !== personData.id)))
                    )
    } 
  }
  
  return (
    <button onClick={() => {handleDelete(personData, persons, setPersons)}}>
      Delete
    </button>
  )
}


export default ContactData