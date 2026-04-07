import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const isPersonDuplicate = persons.some(person => person.name === newName && person.number === newNumber)
    const isPersonUpdate = persons.some(person => person.name === newName && person.number != newNumber)
    
    if (isPersonDuplicate) {
      alert(`${newName} is already added to phonebook`)
    }else if (isPersonUpdate) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
      personService.update(persons.find(person => person.name === newName).id, { name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
        })
    }else{
      personService.create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (name, id) => {
    window.confirm(`Delete ${name} ?`) &&
    personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App