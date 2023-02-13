const CountryScreen = ({ country }) => {
    return (
        <>
            <div>
                <h1> {country.name.official} </h1>
            </div>
            <div>
                <p> <b> Capital: </b> {country.capital}</p>
                <p> <b> Area: </b> {country.area} km²</p>
            </div>
            <div>
                <h2> Languages: </h2>
                {Object.keys(country.languages).map(key => country.languages[key])
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
                <img className='flag' src={country.flags.png} alt='flag could not be displayed :('/>  
            </div>
        </>
    )
}

export default CountryScreen