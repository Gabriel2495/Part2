import {useEffect, useState} from 'react'
import axios from "axios";

const Search = ({search, handleChange}) => {
    return (<>
        find countries <input value={search} onChange={handleChange}/>
    </>)
}

const Result = ({filteredCountries, onShow}) => {
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital : {country.capital}</p>
                <p>population : {country.population}</p>
                <h2>Languages</h2>
                {Object.values(country.languages || {}).map((lang, i) => (
                    <li key={i}>{lang}</li>
                ))}
                <img alt={`Drapeau de ${country.name.common}`} src={country.flag}/>
            </div>)
    }

    return (<ul>
        {filteredCountries.map(c => (
            <li key={c.name.common}>
                {c.name.common}
                <button onClick={() => onShow(c)}>Afficher</button>
            </li>))}
    </ul>)
}

function App() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,capital,population,flag,languages')
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        const filtereCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        setFilteredCountries(filtereCountries)
    }, [search, countries]);

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    const onShow = (country) => {
        setSearch(country.name.common)
    }

    return (<>
        <Search search={search} handleChange={handleChange}/>
        <Result filteredCountries={filteredCountries} onShow={onShow}/>
    </>)
}

export default App
