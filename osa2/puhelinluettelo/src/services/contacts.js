import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('getAll() failed!')
                })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('create() failed')
                })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
                .catch(error => {
                  console.log('update() failed')
                })
}

export default { getAll, create, update }