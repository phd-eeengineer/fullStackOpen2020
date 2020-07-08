import React, { useState } from 'react'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  

  const addPerson = (event) => {
    event.preventDefault()
    let isFound = 0

    persons.forEach((person) => person.name === newName ? isFound++ : isFound)
    console.log("Console 1:", isFound)
    
    if( isFound > 0 ) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }      
      setPersons(persons.concat(personObject))   
      
    } 
    setNewName('')      
  }

  const handleAddButton = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange = {handleAddButton}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map( person => 
          <div key={person.name}> {person.name} </div>
        )}
      </div>
        <div> debug: {}</div>
    </div>
  )
}

export default App