import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('getAll() failed!')
                })
}

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('create() failed')
                })
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('deleteContact() failed!')
                })
}

const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('update() failed')
                })
}

export default {  getAll, 
                  createContact, 
                  updateContact, 
                  deleteContact }