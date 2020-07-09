import React, { useState } from 'react'

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

  const personsToShow = (searchResult === '')
  ? persons
  : persons.filter(person => person.name
        .toLowerCase().includes(searchResult.toLowerCase()))

  // console.log("searched: ", searchResult)
  // console.log("liste: ", personsToShow)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with 
        <input 
          value={searchResult}
          onChange = {handleSearch}/>
          <div>debug: {searchResult}</div>
      </div>
      <div>
        <h2>Add a new</h2>
      </div>
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
        {personsToShow.map( person => 
          <div key={person.name}> {person.name} {person.number} </div>
        )}
      </div>
    </div>
  )
}

export default App