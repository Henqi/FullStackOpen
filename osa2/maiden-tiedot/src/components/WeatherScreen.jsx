import { useEffect } from "react"
import weatherData from "../services/weatherData"


const WeatherScreen = ({ selectedCountry, weather, setWeather }) => {
    
    useEffect(() => {
        console.log('weather in useEffect()', weather)
        
        weatherData.getWeather(selectedCountry.capital)
                    .then(response => {
                        setWeather(response)
                    })
    }, [selectedCountry])
    
    console.log('weather outside useEffect()', weather)

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

export default WeatherScreen