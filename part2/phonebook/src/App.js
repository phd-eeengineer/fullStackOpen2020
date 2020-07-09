import React, { useState } from 'react'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "040-1234567"}
  ]) 
  

  const addPerson = (event) => {
    event.preventDefault()

    // let isFound = 0
    // persons.forEach((person) => person.name === newName ? isFound++ : isFound)
    // console.log("Console 1:", isFound)

    
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange = {handleName}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange = {handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map( person => 
          <div key={person.name}> {person.name} {person.number} </div>
        )}
      </div>
    </div>
  )
}

export default App