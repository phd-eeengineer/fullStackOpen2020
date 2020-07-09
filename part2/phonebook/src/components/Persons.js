import React from 'react'

const Persons = (props) => {

    const personsToShow = (props.searchResult === '')
        ? props.persons
        : props.persons.filter(person => person.name
                .toLowerCase().includes(props.searchResult.toLowerCase()))

    return (
        <div>
            {personsToShow.map( person => 
                <div key={person.name}> {person.name} {person.number} </div>
            )}
        </div>
    )
}

export default Persons