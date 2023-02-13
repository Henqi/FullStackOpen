const CountryDisplay = ({ countryData, countryFilter }) => {
    
    const displayedCountries = countryData.filter(country => country.name.official.toLowerCase().includes(countryFilter.toLowerCase()))

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
            <>
                <div>
                    <h1> {displayedCountries.map(country => country.name.official)} </h1>
                </div>
                <div>
                    <p> <b> Capital: </b> {displayedCountries.map(country => country.capital)}</p>
                    <p> <b> Area: </b> {displayedCountries.map(country => country.area)} km²</p>
                </div>
                <div>
                    <h2> Languages: </h2>
                    {Object.keys(selectedCountry.languages).map(key => selectedCountry.languages[key])
                        .map(language => 
                            <ul>
                                <li key={language}>
                                    {language}
                                </li>
                            </ul>
                        )
                    }
                </div>
                <div>
                    <img className='flag' src={selectedCountry.flags.png} alt='flag could not be displayed'/>  
                </div>
            </>
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
                                        <li key={country.name.official}>
                                            {country.name.official}
                                        </li>
                                 )
                }
          </>
        )
    }
}

export default CountryDisplay