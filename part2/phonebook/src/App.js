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
    
    if(persons.some(person => person.name === newName.trim())) {
      if(window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)){
        const foundPerson = persons.find(p => p.name === newName.trim())
        const changedPerson = { ...foundPerson, number: newNumber }

        personService
          .update(foundPerson.id, changedPerson)
          .then(response => {        
            setPersons(persons.map(p => 
              p.name !== changedPerson.name ? p : response))
            setNewName('')
            setNewNumber('')    
          })
          .catch(error => {
            if (error.response) {
              console.log("Add Person: ", error.response.data)
            } 
         }) 
      }
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
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchResult(event.target.value)
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personService
        .deleteObject(personToDelete.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          console.log("2 - ",response)
        })
        .catch(error => {
           if (error.response) {
             console.log("3 - ",error.response.data)
           } 
        }) 
    }
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
          searchResult = {searchResult}
          deletePerson = {deletePerson}/>
    </div>
  )
}

export default App