import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchResult, setSearchResult ] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }      
      setPersons(persons.concat(personObject))  
    } 
    setNewName('')
    setNewNumber('')    
  }

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
  //  console.log(event.target.value)
    setSearchResult(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchResult = {searchResult}
              handleSearch = {handleSearch}/>

      <div>
        <h2>Add a new</h2>
      </div>

      <PersonForm 
          addPerson = {addPerson} 
          newName = {newName}
          handleName = {handleName}
          newNumber={newNumber}
          handleNumber = {handleNumber}/>

      <h2>Numbers</h2>

      <Persons persons = {persons}
          searchResult = {searchResult}/>

    </div>
  )
}

export default App