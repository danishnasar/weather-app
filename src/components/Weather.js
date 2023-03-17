import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sunny from "./icons/sunny.svg";
import Night from "./icons/night.svg";
import Day from "./icons/day.svg";
import CloudyNight from "./icons/cloudy-night.svg";
import Cloudy from "./icons/cloudy.svg";
import PerfectDay from"./icons/perfect-day.svg";
import Rain from "./icons/rain.svg";
import RainNight from "./icons/rain-night.svg";
import Storm from "./icons/storm.svg";

const WeatherIcons = {
    "01d": Sunny,
    "01n": Night,
    "02d": Day,
    "02n": CloudyNight,
    "03d": Cloudy,
    "03n": Cloudy,
    "04d": PerfectDay,
    "04n": CloudyNight,
    "09d": Rain,
    "09n": RainNight,
    "10d": Rain,
    "10n": RainNight,
    "11d": Storm,
    "11n": Storm
  };

export default function Weather({errorData, cityData, searchScreen}) {
    const isDay = cityData.weather? cityData.weather[0].icon.includes('d') : false;
    const getTime = (timeStamp, sunTime) => {
        const hour = new Date(timeStamp * 1000).getHours() > 12 ? new Date(timeStamp * 1000).getHours() - 12 : new Date(timeStamp * 1000).getHours();
        const timeLine = sunTime === "Sunset" ? 'PM' : "AM";
        const minute = new Date(timeStamp * 1000).getMinutes().toString().length === 1 ? '0' + new Date(timeStamp * 1000).getMinutes() : new Date(timeStamp * 1000).getMinutes();
        return `${hour} : ${minute} ${timeLine}`
    }

  return (
        <div className='weatherBox'>
            {errorData ? 
            <h4 className='errorText'>{errorData}</h4>
            :
            <div>
            <span className='temperature'>{`${Math.floor(cityData.main ? cityData.main.temp - 273 : 0)}°C`}</span>
            <span> | {cityData.weather? 
            cityData.weather[0].description.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()): ''}
            </span>
            <img className='weatherLogo' src={WeatherIcons[cityData.weather[0].icon]}/>
            <h4 className= {cityData.name.length > 9 ? 'countrynext' : 'country'}>{cityData.name}, {cityData.sys?.country}</h4>
            <h6 className='weatherHeading'>Weather Info</h6>
            <div className='weatherTiles'>
            <div>
            { cityData.weather ?
            <p className='boldClass'>{`${getTime(cityData.sys[isDay ? "sunset" : "sunrise"], isDay ? "sunset" : "sunrise")}`}</p>
            :
            ''
            }
            <p>{isDay ? "Sunset" : "Sunrise"}</p>
            </div>
            <div>
            <p className='boldClass'>{cityData.main?.humidity}</p>
            <p>Humidity</p>
            </div>
            <div>
            <p className='boldClass'>{cityData.wind?.speed}</p>
            <p>Speed</p>
            </div>
            <div>
            <p className='boldClass'>{cityData.main?.pressure}</p>
            <p>Pressure</p>
            </div>
            </div>
            </div>
        }
            <button className='btn btn-dark backButton' onClick={() => searchScreen()}>Back</button>
        </div>
  )
}