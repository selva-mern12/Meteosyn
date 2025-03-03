import { useState, useEffect } from "react";
import { TbWind } from "react-icons/tb";
import { BsSunriseFill, BsSunsetFill  } from "react-icons/bs";
import { FaCompass, FaSun  } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { WiStrongWind, WiThermometer, WiBarometer, WiHumidity, WiFlood, WiDayFog } from "react-icons/wi";
import { GiMountainRoad } from "react-icons/gi";

const WeatherDetails = ({weatherData}) => {
    const [leftValue, setLeftValue] = useState(0);
    const [showTime, setShowTime] = useState({visible:false, time: '', x: 0, y: 0})

    const now = new Date();
    const sunset = new Date((weatherData?.sys?.sunset + weatherData?.timezone) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: false });
    const sunrise = new Date((weatherData?.sys?.sunrise + weatherData?.timezone) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: "2-digit", minute: "2-digit",hour12: false});
    const nowTime = new Date().toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit",hour12: false});

    let sunsetNum = Number(sunset.replace(':',''))
    let sunriseNum = Number(sunrise.replace(':',''))
    let nowTimeNum = Number(nowTime.replace(':',''))

    useEffect(() => {
      const getTimes = () => {
        let totalTime = (2400 - sunsetNum) + (sunriseNum)
        let value = 0
        if (nowTimeNum >= sunsetNum || nowTimeNum <= sunriseNum){
          if (nowTimeNum >= sunsetNum){
            value = Number((((nowTimeNum - sunsetNum) / totalTime) * 100).toFixed())
          }
          else {
            value = Number(((((2400 - sunsetNum) + nowTimeNum) / totalTime) * 100).toFixed())
          }
        }
        else{
          value = Number((((nowTimeNum - sunriseNum) / totalTime)* 100).toFixed())
        }
        setLeftValue(value)
      }
      getTimes()
    },[now])

    const getWindDirection = (deg) => {
      const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      return directions[Math.round(deg / 45) % 8]; 
    };

    return(
        <div className='weather-details'>
            <div className='sun-moving-container'>
                <div className='sun-container'>
                    {nowTimeNum > sunriseNum && nowTimeNum < sunsetNum ? 
                    <p className='sunriseset'><BsSunriseFill size={30}/><span>Sunrise</span></p> : 
                    <p className='sunriseset'><BsSunsetFill size={30}/><span>Sunset</span></p>}
                    {nowTimeNum > sunriseNum && nowTimeNum < sunsetNum ? 
                    <p className='sunriseset'><BsSunsetFill size={30}/><span>Sunset</span></p> : 
                    <p className='sunriseset'><BsSunriseFill size={30}/><span>Sunrise</span></p>}
                </div>
                <div className='sunrise-set-bar'>
                    {
                        showTime.visible && <p
                            style={{
                                position: 'absolute',
                                left: showTime.x- 60 ,
                                top: showTime.y - 210,
                                background: '#00000050',
                                color: '#fff',
                                padding: '5px 8px',
                                borderRadius: '4px',
                                pointerEvents: 'none',
                                fontSize: '10px',
                        }}>{showTime.time}</p>
                    }
                    {nowTimeNum > sunriseNum && nowTimeNum < sunsetNum ? 
                        <FaSun className='sun-icon' style={{left: `${leftValue}%`}} 
                        onMouseEnter={event => {
                            const rect = event.target.getBoundingClientRect();
                            setShowTime({
                                visible: true,
                                time: nowTime,
                                x: rect.left + window.scrollX + rect.width / 2, // Center horizontally
                                y: rect.top + window.scrollY - 10, // Slightly above the moon icon
                            });
                            }}                        
                          onMouseLeave={() => setShowTime({visible:false, time: '', x: 0, y: 0})} />
                            :
                        <IoMoon className='sun-icon' style={{left: `${leftValue}%`}}
                        onMouseEnter={event => {
                            const rect = event.target.getBoundingClientRect();
                            setShowTime({
                                visible: true,
                                time: nowTime,
                                x: rect.left + window.scrollX + rect.width / 2, // Center horizontally
                                y: rect.top + window.scrollY - 10, // Slightly above the moon icon
                            });
                            }}                        
                          onMouseLeave={() => setShowTime({visible:false, time: '', x: 0, y: 0})} />
                    }
                </div>
                <div className='time-container'>
                    {nowTimeNum > sunriseNum && nowTimeNum < sunsetNum ?
                    <p>{sunrise}</p>:
                    <p>{sunset}</p>}
                    {nowTimeNum > sunriseNum && nowTimeNum < sunsetNum ?
                    <p>{sunset}</p>:
                    <p>{sunrise}</p>}
                </div>
            </div>
            <div className="wind-info">
                <div className='wind-container'>
                    <WiThermometer  className='weather-icon' />
                    <p className='wind-para'>Feels like</p>
                    <p className='wind-value'>{weatherData?.main?.feels_like} °C</p>
                </div>
                <div className='wind-container'>
                    <WiBarometer  className='weather-icon' />
                    <p className='wind-para'>Pressure</p>
                    <p className='wind-value'>{weatherData?.main?.pressure} hpa</p>
                </div>
                <div className='wind-container'>
                    <WiHumidity  className='weather-icon' />
                    <p className='wind-para'>Humidity</p>
                    <p className='wind-value'>{weatherData?.main?.humidity} %</p>
                </div>
                <div className='wind-container'>
                    <WiFlood  className='weather-icon' />
                    <p className='wind-para'>Sea level</p>
                    <p className='wind-value'>{weatherData?.main?.sea_level} hpa</p>
                </div>
                <div className='wind-container'>
                    <GiMountainRoad  className='weather-icon' />
                    <p className='wind-para'>Ground level</p>
                    <p className='wind-value'>{weatherData?.main?.grnd_level} hpa</p>
                </div>
                <div className='wind-container'>
                    <WiDayFog  className='weather-icon' />
                    <p className='wind-para'>Visibility</p>
                    <p className='wind-value'>{(weatherData?.visibility) / 1000} km</p>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',width: '100%', alignItems: 'center'}}>
            <h3 className='weather-head'>Wind Info</h3>
            <div className="wind-info">
                <div className='wind-container'>
                    <TbWind className='weather-icon' />
                    <p className='wind-para'>Wind Speed</p>
                    <p className='wind-value'>{weatherData?.wind?.speed} kmps</p>
                </div>
                <div className='wind-container'>
                    < WiStrongWind className='weather-icon'/>
                    <p className='wind-para'>Gust Speed</p>
                    <p className='wind-value'>{weatherData?.wind?.gust ? `${weatherData.wind.gust} kmps` : "No gusts"}</p>
                </div>
                <div className='wind-container'>
                    <FaCompass className='weather-icon' />
                    <p className='wind-para'>Direction</p>
                    <p className='wind-value'>{getWindDirection(weatherData?.wind?.deg)}</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default WeatherDetails