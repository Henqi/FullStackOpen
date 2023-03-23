import loadingGif from '../images/loading.gif'
import { useEffect, useState } from 'react'
import weatherData from '../services/weatherData'

const WeatherScreen = ({ selectedCountry }) => {

    const [weather, setWeather] = useState([])
    
    const gifStyle = {
        'width': 85,
        'height': 85
    }
    useEffect(() => {
        weatherData.getWeather(selectedCountry.capital)
            .then(response => {
                setWeather(response)
            })
    }, [selectedCountry])

    if (weather.length === 0) {
        return (
            <div>
                <div>
                    <h2> Weather in {selectedCountry.capital} </h2>
                </div>
                <div>
                    Temperature: <img src={loadingGif} style={gifStyle} alt='loading' />
                </div>
                <div>
                    Wind: <img src={loadingGif} style={gifStyle} alt='loading' />
                </div>
                <div>
                    <img src={loadingGif} style={gifStyle} alt='loading' />
                </div>
            </div>
        )
    }
    else {
        return (
        <div>
            <div>
                <h2> Weather in {selectedCountry.capital} </h2>
            </div>
            <div>
                Temperature: {weather.current.temp_c} celcius
            </div>
            <div>
                Wind: {weather.current.wind_kph} km/h
            </div>
            <div>
                <img src={`https:${weather.current.condition.icon}`} alt='weather icon could not be loaded' />
                <p> {weather.current.condition.text} </p>
            </div>
        </div>
        )
    }
}

export default WeatherScreen