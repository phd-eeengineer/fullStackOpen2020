import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Find countries
            <input 
            value={props.searchResult}
            onChange = {props.handleSearch}/>
        </div>
    )
}

export default Filter