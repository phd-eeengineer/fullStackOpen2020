import React from 'react'

const Persons = (props) => {

    const personsToShow = (props.searchResult === '')
        ? props.persons
        : props.persons.filter(person => person.name
                .toLowerCase().includes(props.searchResult.toLowerCase()))
        
    return (
        <div>
            {personsToShow.map(person => 
                <div key = {person.id}> 
                    {person.name} {person.number} 
                    <button key = {person.id} onClick = {() => props.deletePerson(person.id)}>
                        delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default Persons