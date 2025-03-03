import { useContext } from "react";
import { TbWindmillFilled } from "react-icons/tb";
import WeatherContext from "../../context/WeatherContext";

const AirQuality = ({airQuality, airQualityData}) =>{
    const {aqiLevels, airPollutants} = useContext(WeatherContext);
    return(
  <div className='air-quality-container'>
    <h3>Today's Air Quality</h3>
    <p>Air condition: <span>{aqiLevels[airQuality]}</span> </p>
    <div className='air-quality-bar'>
      <TbWindmillFilled style={{left:`${airQuality}0%`}} className='wind-icon' />
    </div>
    <ul className='air-pollutants-container'>
        {Object.entries(airQualityData.list[0].components).map(([pollutant,value]) => (
          <li key={pollutant} className='pollutants'>
            <svg height={100} width={100} viewBox='0 0 100px 100px'>
              <circle cx={50} cy={50} r={20} fill='none' strokeWidth={5} stroke='white' />
              <circle
                cx={50}
                cy={50}
                r={20}
                fill="none"
                strokeWidth={5}
                stroke="rgb(4, 203, 84)"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={(2 * Math.PI * 20) - ((value / airPollutants[pollutant].highRange) * (2 * Math.PI * 20))}
                transform="rotate(90 50 50)"  
                strokeLinecap="round"
              />
              <text x={50} y={50} textAnchor='middle' dy={5} fontSize={12} fill='white'>{`${((value / airPollutants[pollutant].highRange) * 100).toFixed()}%`}</text>
            </svg>
            <div>
              <p id='pollutants-para'>{(pollutant).toUpperCase()} ({airPollutants[pollutant]?.observation})</p>
              <p id='pollutants-para'>{airPollutants[pollutant]?.levels?.find(level => parseFloat(level.range) > value)?.value || 'unknown'}, 
              <b className='pollutants-count'>{value}</b> {airPollutants[pollutant]?.unit}</p>
            </div>
          </li>
        ))}
    </ul>
  </div>
)}

export default AirQuality