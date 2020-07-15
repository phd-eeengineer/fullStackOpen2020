import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchResult, setSearchResult ] = useState('')
  const [ persons, setPersons ] = useState([])
  

  useEffect(() => {
    personService
      .getAll()
      .then(initalData => {
        setPersons(initalData)
      })
  }, [])

  // console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)    
        .then(responseData => { 
          setPersons(persons.concat(responseData))
          setNewName('')
          setNewNumber('')
          console.log(responseData)
        })  
    } 
       
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