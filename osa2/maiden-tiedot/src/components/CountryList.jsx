import CountryScreen from "./CountryScreen"
import WeatherScreen from "./WeatherScreen"

const CountryList = ({  countryData,
                        countryFilter,
                        setCountryFilter,
                        weather,
                        setWeather }) => {

    const filterLimit = 10
    const displayedCountries = countryData.filter(country => country.name.official.toLowerCase().includes(countryFilter.toLowerCase()))

    const handleShowCountry = (country) => {
        setCountryFilter(country.name.official)
    }

    if (displayedCountries.length === 0) {
        return (
            <div>
                No countries match the search criteria :(
            </div>
        )
    }

    if (displayedCountries.length === 1) {
        const selected = displayedCountries[Object.keys(displayedCountries)]
        return ( 
            <div>
                <CountryScreen country={selected} />
                <WeatherScreen selectedCountry={selected} weather={weather} setWeather={setWeather} />
            </div>
        )
    }
        
    if (displayedCountries.length > filterLimit) {
        return (
            <div>
                Too many countries! Try narrowing down the search parameters
            </div>
        )
    }

    else {
        return (
            <>
                {displayedCountries.map(country => 
                                        <div key={country.cca3} >
                                            <li key={country.name.official}>
                                                {country.name.official}
                                                <button onClick={() => handleShowCountry(country)}>
                                                    show
                                                </button>
                                            </li>
                                        </div>
                                    )
                }
          </>
        )
    }
}

export default CountryList