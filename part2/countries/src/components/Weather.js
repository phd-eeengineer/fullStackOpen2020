//import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capital)
    .then(response => {setWeather(response.data)})
  }, [capital])

  if(weather.current === undefined){
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><strong>Weather data can not be fetched yet</strong></p>
      </div>
    )
  } else {
    
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><strong>temperature: </strong>{weather.current.temperature}</p>
        {weather.current.weather_icons
          .map(icon => <img src = {icon} key = {icon} alt = ""
            height="50"  width="50"  />)}            
        <p><strong>wind: </strong>{weather.current.wind_speed} direction {weather.current.wind_dir}</p>
      </div>
    )
  }

  
}

export default Weather;

