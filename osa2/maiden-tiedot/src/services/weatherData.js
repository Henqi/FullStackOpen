import axios from 'axios'

const baseUrl = 'https://api.weatherapi.com/v1/current.json?'
const APIkey = process.env.REACT_APP_API_KEY

const getWeather = (city) => {
  const request = axios.get(`${baseUrl}key=${APIkey}&q=${city}`)
  return request.then(response => response.data)
}

export default {  getWeather }