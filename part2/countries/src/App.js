import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country';
import Weather from './components/Weather';
import CountryDetail from './components/CountryDetail';


function App() {
  const [ countries, setCountires ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ capital, setCapital] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {setCountires(response.data)})
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCapital('')
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

      { countriesToShow.length < 10 && countriesToShow.length > 1 
        ? countriesToShow.map((country, i) => 
                < Country country = {country} key = {i} setSearch = {setSearch}/>)
        : '' }

      { countriesToShow.length === 1 
        ? < CountryDetail country = {countriesToShow[0]} 
                          setCapital = {setCapital}/>
        : '' }

      { capital ==='' 
        ? ''
        : < Weather capital = {capital} /> }           
    </div>
  );
}

export default App;

