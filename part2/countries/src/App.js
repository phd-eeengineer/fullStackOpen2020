import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country';
import CountryDetail from './components/CountryDetail';


function App() {
  const [ countries, setCountires ] = useState('')
  const [ search, setSearch ] = useState('')
  

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
  setSearch(event.target.value)
  }

  let countriesToShow = ''

  if(countries.length > 0) {
    countriesToShow = countries
      .filter(country => country.name
      .toLowerCase()
      .includes(search.toLowerCase()))
  }

  return (
    <div>
      < Filter search = {search}
               handleSearch = {handleSearch} />

      {
        countriesToShow.length < 10 && countriesToShow.length > 1 
        ? countriesToShow.map((country, i) => 
                < Country country = {country} key = {i} setSearch = {setSearch}/>)
        : ''
      }

      {
        countriesToShow.length === 1 
        ? < CountryDetail country = {countriesToShow[0]}/>
        : ''
      }

           
    </div>
  );
}

export default App;

