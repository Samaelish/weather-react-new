import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useState, useEffect } from 'react'

const Weather = () => {
  const [inputValue, setInputValue] = useState('')
  const [weatherData, setWeatherData] = useState(false)
  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  }

  const search = async city => {
    if (city === '') {
      alert('Введите название города')
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${
        import.meta.env.VITE_APP_ID
      }`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon
      setWeatherData({
        icon,
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
      })
    } catch (error) {
      setWeatherData(false)
      console.error('Error in fetching data', error)
    }
  }

  useEffect(() => {
    search('Moscow')
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          type='text'
          placeholder='Поиск'
          onKeyDown={e => (e.key === 'Enter' ? search(inputValue) : '')}
        />
        <img src={search_icon} alt='search icon' onClick={() => search(inputValue)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt='weather' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='humidity icon' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Влажность</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='wind icon' />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Скорость ветра</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Weather
