import React from 'react';

const PersonList = ({personsToShow, handleDeletePerson}) => {
    return (
        <div>
            {personsToShow.map(person => {
                return (
                    <div key={person.id}>
                        <span>{person.name} : {person.number} </span>
                        <button type="button" onClick={() => handleDeletePerson(person.id)}>delete</button>
                    </div>
                )
            })}
        </div>
    );
};

export default PersonList;