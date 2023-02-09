import { useState, useEffect } from 'react'
import countryData from './services/countryData'


function App() {

  const [country, setCountry] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])


  useEffect(() => {
    countryData.getAll()
               .then(response => {
                setDisplayCountries(response.map(country => country = country.name.official))
               })
  }, [country])


  const CountryDisplay = ({ displayCountries }) => {
    return (
      displayCountries.map(country => {
        <li>
          country
        </li>
      })
    )
  }

  const handleChange = (event) => {
    setCountry(event.target.value)
  }


  return (
    <>
      <div>
        Find countries: <input value={country} onChange={handleChange} />
      </div>
      <div>
          Too many countries! Try narrowing down the search parameters
      </div>
      <div>
        <CountryDisplay displayCountries={displayCountries}/> 
      </div>
    </> 
  )



}

export default App;
