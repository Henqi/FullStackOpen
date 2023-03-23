import CountryScreen from "./CountryScreen"
import WeatherScreen from "./WeatherScreen"

const CountryList = ({  
    countryData,
    countryFilter,
    setCountryFilter}) => {

    const filterLimit = 10
    const displayedCountries = countryData.filter(country => country.name.official.toLowerCase().includes(countryFilter.toLowerCase()))

    const handleShowCountry = (country) => {
        setCountryFilter(country.name.official)
    }

    if (displayedCountries.length === 0 || displayedCountries.length === countryData.length) {
        return (
            <div>
                No countries match the search criteria :(
            </div>
        )
    }

    else if (displayedCountries.length === 1) {
        const selectedCountry = displayedCountries[Object.keys(displayedCountries)]
        return ( 
            <div>
                <CountryScreen country={selectedCountry} />
                <WeatherScreen selectedCountry={selectedCountry} />
            </div>
        )
    }
        
    else if (displayedCountries.length > filterLimit) {
        return (
            <div>
                Too many countries! Try narrowing down the search parameters
            </div>
        )
    }

    else {
        return (
            <>
                {displayedCountries
                    .map(country => 
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