import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {WeatherLoader, WeatherFailure} from '../WeatherLoader';
import WeatherDetails from '../weatherDetails';
import countryList from 'react-select-country-list';
import WeatherContext from '../../context/WeatherContext';
import AirQuality from '../AirQuality'
import './index.css';
import WeatherMain from '../WeatherMain';
import SearchContainer from '../SearchContainer';

const WeatherPage = () => { 
  const apikey = process.env.REACT_APP_METEO_SYN_WEATHER_APP
  const {cityName,countryName} = useParams();
  const { pageStatus, weatherTypes } = useContext(WeatherContext);
    const [weatherData, setWeatherData] = useState(null);
    const [cityLocation, setCityLocation] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [weatherPageStatus, setWeatherPageStatus] = useState(pageStatus.loading);

    useEffect(() => {
        setWeatherPageStatus(pageStatus.loading);
        const getWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`);
                const data = await response.json();
                setWeatherData(data);
                setCityLocation({lat: data.coord.lat, lon: data.coord.lon});
            } catch (error) {
              setWeatherPageStatus(pageStatus.failure)
                console.log(error);
            }
        }

        getWeatherData();
    }, [cityName, apikey, pageStatus]);

    useEffect(() => {
      const getAirQualityData = async () => {
        if (!cityLocation || !cityLocation.lat || !cityLocation.lon) return; 
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${apikey}`);
          const data = await response.json();
          setAirQualityData(data);
          setWeatherPageStatus(pageStatus.success);
        } catch (error) {
          console.log(error);
          setWeatherPageStatus(pageStatus.failure);
        }
      }
      getAirQualityData();
    }, [cityLocation,apikey,pageStatus]);

    const getCountryName = (countryCode) => countryList().getLabel(countryCode);

    const now = new Date()
    const weatherbg = now.getHours() > 6 && now.getHours() < 18 ? '#7a7af570' : '#00000070';
    const airQuality = airQualityData?.list[0]?.main?.aqi;

    const renderWeatherPage = () => {
        switch (weatherPageStatus){
            case pageStatus.loading:
              return <div className='loader-container'>
                <WeatherLoader /></div>;
            case pageStatus.success:
              return (
                <div style={{backgroundImage: `url(${weatherTypes[weatherData?.weather[0].main].background})`}} className='weather-bg'>
                  <div className='weather-page-main-container' style={{backgroundColor: weatherbg}}>
                    <div className='header'>
                       <h1 className='weather-city-name'>{weatherData?.name},&nbsp;<span className='weather-country'>{getCountryName(countryName)}</span></h1>
                       <SearchContainer />
                    </div>
                    <div className='weather-container'>
                      <WeatherDetails weatherData={weatherData} />
                      <WeatherMain weatherData={weatherData} />
                      <AirQuality airQuality={airQuality} airQualityData={airQualityData} />
                    </div>
                  </div>
                </div>
              );
            case pageStatus.failure:
              return <WeatherFailure />
            default:
              return null;  
        }
    }
    
    return(
        <div>{renderWeatherPage()}</div>
    )


}

export default WeatherPage;