import axios from "axios";

const baseUrl = 'http://localhost:3000/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const update = (id, newNumber) => {
    const request = axios.patch(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const removeAll = () => {
    const request = axios.delete(baseUrl)
    return request.then(response => response.data)
}

export default {getAll, create, update, remove, removeAll}