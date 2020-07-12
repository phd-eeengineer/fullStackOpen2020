import React from 'react'
//import CountryDetail from './CountryDetail'

const Country = (props) => {

  const clickHandler = () => {
    props.setSearch(props.country.name)
  }

  return (
    <div>
      {props.country.name}
      <button onClick = {clickHandler} > show </button>
    </div>
  )
}

export default Country;