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
  //const [weather, setWeather] = useState('')



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
  setCapital('')
  }

  let countriesToShow = ''

  if(countries.length > 0) {
    countriesToShow = countries
      .filter(country => country.name
      .toLowerCase()
      .includes(search.toLowerCase()))
  }

  console.log("inApp-Capital:", capital)

  // const api_key = process.env.REACT_APP_API_KEY

  // useEffect(() => {
  //   let counter = 0
  //   while(weather.current === undefined && counter < 5)
  //   axios
  //     .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capital)
  //     .then(response => {

  //     setWeather(response.data)
  //     })

  //     console.log("inApp-axios-weather", weather)
  // }, [capital])

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
        ? < CountryDetail country = {countriesToShow[0]} 
                          setCapital = {setCapital}/>
        : ''
      }

      {
        capital ===''
        ? ''
        : < Weather capital = {capital} 
            />
           
      }           
    </div>
  );
}

export default App;

