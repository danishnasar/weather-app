import React, { useState, useEffect } from 'react';
import '../App.css';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";
import Image from "./icons/Logo.png";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search() {
  const [searchData, setSearchData] = useState('');
  const [errorText, setErrorText] = useState('');
  const [cityDetails, setCityDetails] = useState({});
  const [weatherScreen, setWeatherScreen] = useState(false);
  const [wholeData, setWholeData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const imgUrl = Image;

  useEffect(() => {
    getCountries()
  }, []);

  async function getCountries () {
    try {
      const countryData = await Axios.get(`https://countriesnow.space/api/v0.1/countries`);
      const dataItems = countryData.data.data;
      if ( dataItems.length > 0) {
        setWholeData(dataItems);
        const allCountries = dataItems.map((item) => item.country);
        setCountries(allCountries);
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleInputChange(event, value) {
    const selectedItem = wholeData.filter((element) => element.country === value);
    const cities = selectedItem[0].cities;
    setCities(cities);
  }

  function handleInputChangeCity (event, value) {
    setSearchData(value);
  }

  async function openWeather () {
    if (searchData === "") {
      toast.error("Please select a city", {
        position: toast.POSITION.TOP_CENTER
    });
    } else {
      try {
        const response = await Axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchData.trim()}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
          );
          setCityDetails(response.data);
          setErrorText('');
          setWeatherScreen(true);
          setSearchData('');
    } catch (error) {
        if (error.response.data.message === 'city not found') {
            let errorMsg = 'Please enter a valid city name';
            setErrorText(errorMsg);
            setCityDetails({});
            setWeatherScreen(true);
            setSearchData('');
        }
     }
    }
  }

  return (
    <div className='searchScreen'>
      <ToastContainer />
        <h3 className='headingClass'>Weather Application</h3>
        {!weatherScreen ? 
        <div className='cardBox'>
            <img src={imgUrl} className='weatherImage'/>
            <h3 className='headingBox'>Find the Weather of your city</h3>
            <div className='inputClass'>
            <h6 className='header'>Country</h6>
            <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField {...params}
                variant="outlined"
                label="Please select the country..."
                className='searchBox'
              />
              )}
            />
            <br />
            <h6 className='header'>City</h6>
            <Autocomplete
            id="city-select-demo"
            sx={{ width: 300 }}
            options={cities}
            autoHighlight
            getOptionLabel={(option) => option}
            onInputChange={handleInputChangeCity}
            renderInput={(params) => (
              <TextField {...params}
                variant="outlined"
                label="Please select the city..."
                className='searchBox'
              />
              )}
            />
            </div>
            <button className='btn btn-dark searchButton' onClick={() => openWeather()}>Search</button>
        </div>
        :
        <Weather 
         errorData={errorText}
         cityData={cityDetails}
         searchScreen={() => setWeatherScreen(false)} />
    }
    </div>
  )
}
