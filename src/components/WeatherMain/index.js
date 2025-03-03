import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import WeatherContext from "../../context/WeatherContext";
import {WeatherLoader} from '../WeatherLoader'

const WeatherMain = ({weatherData}) => {
    const {pageStatus} = useContext(WeatherContext)
    const {cityName} = useParams()
    const [weatherOtherDays,setWeatherOtherDays] = useState({})
    const [forecastStatus, setForecastStatus] = useState(pageStatus.initial)

    useEffect(() =>{
        const getData = async () =>{
            setForecastStatus(pageStatus.loading)
            try {
                const response =await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=57df5d19f9c7e637892e1e554ce0e70f&units=metric`);
                const data = await response.json()
                setWeatherOtherDays(data)
                setForecastStatus(pageStatus.success)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    },[])

    const getDateTimeFormat = (date) => {
        const formattedDate = moment(date).format("MMM DD, HH:mm");
        return formattedDate
    }
    const getDayFormat = (date) => {
        const formattedDate = moment(date).format("dddd");
        return formattedDate
    }

    return (
        <div className='weather-main'>
            <p className='weather-temp'>{`${(weatherData?.main?.temp).toFixed()}°C`}</p>
            <p className="weather-type">
                <img className="weather-img" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt='weather-img' />
                {`${weatherData?.weather[0].description} - 
                ${(weatherData.main.temp_min).toFixed()}°C / ${(weatherData.main.temp_max).toFixed()}°C`}</p>
            {forecastStatus === pageStatus.loading ? 
            <WeatherLoader /> :
            <ul className="forecast-days-container">
                {
                    weatherOtherDays?.list?.map(weather => 
                        <li key={weather?.dt} className="forecast-days">
                            <p className="forecast-date">{getDateTimeFormat(weather.dt_txt)}</p>
                            <p className="forecast-dayname">{getDayFormat(weather.dt_txt)}</p>
                            <p className='forecast-temp'>{`${(weather?.main?.temp).toFixed()}°C`}</p>
                            <p className="forecast-type">
                                <img className="weather-img" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt='weather-img' />
                                {`${weather?.weather[0].description}`}</p>
                        </li>
                    )
                }
            </ul>}
        </div>
    )
}

export default WeatherMain