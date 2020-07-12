import React from 'react'

const Country = (props) => {
  console.log("searchResult: ",props.searchResult)
  if (props.searchResult === '') {
    
    return (
      <div>
        Write something to filter the countries
      </div>
    )
  } else {
      const countriesToShow = props.countries.filter(country => country.name
              .toLowerCase().includes(props.searchResult.toLowerCase()))
      
      if(countriesToShow.length>10){
        return (
          <div>
            Write something to filter the countries
          </div>
        )
      } else if (countriesToShow.length>1){
        return (
          countriesToShow.map( (country, i) => 
          <div key = {i}> {country.name}</div>)
        )        
      } else if (countriesToShow.length === 1){
        const countryToShow = countriesToShow[0]
        console.log("detail: ",countryToShow)
        return (
          <div>
            <h2> {countryToShow.name}</h2>
            <div>Capital City: {countryToShow.capital}</div>
            <div>Population: {countryToShow.population}</div>
            <h4>Languages</h4>
            <div>
              <ul>
                {countryToShow.languages
                  .map((language, i) => 
                <li key = {i}> {language.name} </li>)}
              </ul>
            </div>
            <img src ={countryToShow.flag} 
              alt = ""
              height="100"
              width="130"  />
            
          </div>
          
        ) 
      } else {
        return (
          <div>
            Any results found
          </div>
        )
      }
  }





  // return (
  //     <div>
  //         {personsToShow.map( person => 
  //             <div key={person.name}> {person.name} {person.number} </div>
  //         )}
  //     </div>
  // )
}

export default Country;