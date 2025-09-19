import React, {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";
import personsService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

function App() {
    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, []);

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    const personsToShow = search === '' ? persons : filteredPersons

    const handleSearch = (event) => {
        e.preventDefault()
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const present = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (present) {
            if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(present.id, {number: newNumber})
                    .then(value => {
                        setPersons(persons.map(person => person.id === value.id ? value : person))
                        setMessage({
                                content: `Updated ${value.name}'s number to ${value.number}`, type: 'success'
                            }
                        )
                        setTimeout(() => setMessage(null), 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log(error)
                        setMessage({
                            content: `Information of ${present.name} has already been removed from server`,
                            type: 'error'
                        })
                        setPersons(persons.filter(person => person.id !== present.id))
                    })
                return
            }
            return
        }
        const newPerson = {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString()
        }
        personsService.create(newPerson)
            .then(value => {
                setPersons([...persons, value])
                setMessage({
                        content: `Added ${value.name}`, type: 'success'
                    }
                )
                setTimeout(() => setMessage(null), 5000)
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDeletePerson = (id) => {
        console.log(id)
        confirm(`Delete ${persons.find(person => person.id === id).name} ?`) &&
        personsService.remove(id)
            .then(value => {
                setPersons(persons.filter(p => p.id !== value.id))
                setMessage({
                        content: `Information of ${value.name} has already been removed from server`, type: 'error'
                    }
                )
                setTimeout(() => setMessage(null), 5000)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <Notification message={message}/>
            <h1>Phonebook</h1>
            <Search search={search} handleSearch={handleSearch}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                        handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
            <h2>Numbers</h2>
            <PersonList handleDeletePerson={handleDeletePerson} personsToShow={personsToShow}/>
        </div>
    )
}

export default App
