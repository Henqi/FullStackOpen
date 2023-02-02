const ContactData = ({ filterName, persons }) => {

    const PersonRow = ({ personData }) => {
        return (
          <li>
            {personData.name} {personData.number}
          </li>
        )
    }
    
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
                    .map(person => <PersonRow personData={person} key={person.name}/>)}
        </div>
    )
}

export default ContactData