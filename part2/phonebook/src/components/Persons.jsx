const Persons = ({ persons, filter, deletePerson }) => {  
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => 
        <div key={person.id}>
          <span>{person.name} {person.number}</span> 
          <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
        </div>)}
    </div>
  )
}

export default Persons