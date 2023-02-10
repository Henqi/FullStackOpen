import { useState, useEffect } from 'react'
import countryDataService from './services/countryData'
import CountryDisplay from './components/CountryDisplay'

function App() {

  const [countryData, setCountryData] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const filterLimit = 10

  useEffect(() => {
    countryDataService.getAll()
               .then(response => {
                setCountryData(response)
               })
  }, [])

  const handleChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <>
      <div>
        Find countries: <input value={countryFilter} onChange={handleChange} />
      </div>
      <div>
          {(countryData.filter(country => country.name.official.toLowerCase().includes(countryFilter.toLowerCase())).length > filterLimit) 
                            ? 'Too many countries! Try narrowing down the search parameters' 
                            : '' 
          }
      </div>
      <div>
        <CountryDisplay countryData={countryData} countryFilter={countryFilter} /> 
      </div>
    </> 
  )
}

export default App;