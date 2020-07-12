import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country';


function App() {
  const [ countries, setCountires ] = useState('')
//  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      //  console.log('promise fulfilled')
        setCountires(response.data)
      })
  }, [])

  const handleSearch = (event) => {
  //  console.log(event.target.value)
  setSearchResult(event.target.value)
  }


  return (
    <div>
      <div>
        <Filter searchResult = {searchResult}
              handleSearch = {handleSearch}/>
      </div>
        < Country countries = {countries}
          searchResult = {searchResult}
        />
      <div>
          
      </div>      
    </div>
  );
}

export default App;

