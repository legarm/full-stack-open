import { useEffect, useState } from 'react';
import weatherService from '../services/weather.js';

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService.getWeather(city).then(response => {
            setWeather(response);
        })
    }, [])

    return (
      <>
      {weather 
        ?
        <>
            <h1>Weather in {city}</h1>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>Wind: {weather.wind.speed} m/s</p>
        </>
        :
        null
      }

      </>
    )
}

export default Weather;