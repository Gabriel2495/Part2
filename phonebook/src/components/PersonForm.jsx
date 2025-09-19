import React from 'react';

const PersonForm = ({handleSubmit, handleNumberChange, handleNameChange, newNumber, newName}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>name : <input value={newName} onChange={handleNameChange}/></div>
                <div>number : <input value={newNumber} onChange={handleNumberChange}/></div>
                <button type="submit">add</button>
            </form>
        </>
    );
};

export default PersonForm;