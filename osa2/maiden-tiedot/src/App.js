import { useState, useEffect } from 'react'
import countryDataService from './services/countryData'
import CountryList from './components/CountryList'

function App() {

  const [countryData, setCountryData] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState([])


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
        <CountryList  countryData={countryData} 
                      countryFilter={countryFilter}
                      setCountryFilter={setCountryFilter}
                      weather={weather}
                      setWeather={setWeather}
                      /> 
      </div>
    </> 
  )
}

export default App;