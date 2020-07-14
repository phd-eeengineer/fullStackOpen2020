//import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState('')

  

  useEffect(() => {
    let counter = 0

    while(counter<1 && weather.current === undefined){
      counter +=1
      console.log(counter)

      const api_key = process.env.REACT_APP_API_KEY
      axios
      .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capital)
      .then(response => {

      setWeather(response.data)
      })
    }    

      console.log("inWeather-axios-weather", weather)
  }, [capital])

  console.log("weather: ",weather)

  if(weather.current === undefined){
    return (
      <div>
        <h3>Weather in {capital}</h3>
    <p><strong>Weather can not be fetched</strong></p>
      </div>
    )
  } else {
    
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><strong>temperature: </strong>{weather.current.temperature}</p>
        {weather.current.weather_icons
          .map(icon => <img src = {icon} key = {icon} alt = ""
            height="50"
            width="50"  />)} 
            
        <p><strong>wind: </strong>{weather.current.wind_speed} direction {weather.current.wind_dir}</p>
      </div>
    )
  }

  
}

export default Weather;

