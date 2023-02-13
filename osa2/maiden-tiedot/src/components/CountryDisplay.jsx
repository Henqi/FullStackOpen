import CountryScreen from "../components/CountryScreen"

const CountryDisplay = ({ countryData, countryFilter, setCountryFilter }) => {
    
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
        const selectedCountry = displayedCountries[Object.keys(displayedCountries)] 
        return (
            <CountryScreen country={selectedCountry} />
        )
      }

      if (displayedCountries.length > 10) {
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
                                        <>
                                            <li key={country.name.official}>
                                                {country.name.official}
                                                <button onClick={() => handleShowCountry(country)}>
                                                    show
                                                </button>
                                            </li>
                                        </>
                                    )
                }
          </>
        )
    }
}

export default CountryDisplay