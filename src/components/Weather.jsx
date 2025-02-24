import React, { useEffect , useRef , useState } from 'react'

import './Weather.css'
import search_icon from "../assets/search.jpg"
import clear_icon from "../assets/clear.jpg"
import clearnight_icon from "../assets/clearnight.jpg"
import cloud_icon from "../assets/cloud.jpg"
import thunderstormnight_icon from "../assets/thunderstormnight.png"
import thunderstorm_icon from "../assets/thunderstorm.png"
import drizzle_icon from "../assets/drizzle.jpg"
import rain_icon from "../assets/rain.jpg"
import snow_icon from "../assets/snow.jpg"
import snowynight_icon from "../assets/snowynight.png"
import wind_icon from "../assets/wind.jpg"
import pcn_icon from "../assets/pcn.jpg"
import bc_icon from "../assets/bc.jpg"
import humidity_icon from "../assets/humidity.jpg"

const Weather = () => {
  const inputRef=useRef()
  const [weatherData, setWeatherData] = useState(false);
  
  const allIcons={
    "01d":clear_icon,
    "01n": clearnight_icon,
    "02d": cloud_icon,
    "02n": pcn_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": bc_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstormnight_icon,
    "13d": snow_icon,
    "13n": snowynight_icon,
  }

  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
   try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

     
     const response = await fetch(url);
     const data = await response.json();
     if(!response.ok){
      alert(data.message);
      return;
     }
     console.log(data);
     const icon = allIcons[data.weather[0].icon] || clear_icon;
     setWeatherData({
      humidity:data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon : icon
     })
   }catch(error){
     setWeatherData(false);
     console.error("Error in fetching weather data");
   }
  }

  useEffect(()=>{
   search("Punjab");
  },[])



  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder="Search"/>
          <img src={search_icon} alt="SEARCH" onClick={()=>search(inputRef.current.value)}/>
          </div>
          {weatherData?<>
            <img src={weatherData.icon}   className="weather-icon"/>
            <p>THIS PROJECT WAS DONE BY MANOJ.V</p>
          <p className='temperature'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt=""/>
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
          </>:<></>}
          

      </div>

  )
}

export default Weather