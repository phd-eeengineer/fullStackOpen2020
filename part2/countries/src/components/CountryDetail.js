import React from 'react'

const CountryDetail = ({country}) => {
    return (
        <div>
          <h2> {country.name}</h2>
          <div>Capital City: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h4>Languages</h4>
          <div>
            <ul>
              {country.languages
                .map((language, i) => 
              <li key = {i}> {language.name} </li>)}
            </ul>
          </div>
          <img src ={country.flag} 
            alt = ""
            height="100"
            width="130"  />          
        </div>        
    ) 
}

export default CountryDetail