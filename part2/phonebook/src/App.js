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
  const [ message, setMessage ] = useState(null)

  

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

        // Revising the record
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
            setMessage({
              text: `Information of ${changedPerson.name} has already been removed from the server`,
              type: "error"
            })
            setTimeout(() => {setMessage(null)}, 5000)
         }) 
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      // Creating new record
      personService
        .create(personObject)    
        .then(responseData => { 
          setPersons(persons.concat(responseData))
          setMessage({
            text: `Added ${newName}`,
            type: "success"
          })
          setTimeout(() => {setMessage(null)}, 3000)
          setNewName('')
          setNewNumber('')
          console.log(responseData)
        })
        .catch(error => {
          if (error.response) {
            console.log("Add Person: ", error.response.data)
          } 
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

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className= {message.type} >
        {message.text}
      </div>
    )  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>

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