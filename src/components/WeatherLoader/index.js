import { FaSun, FaCloudRain, FaSnowflake, FaBolt, FaCloud, FaCloudShowersHeavy,FaRedo, FaCompass } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './index.css';
export const WeatherLoader = () => (
    <div className='loader-icon-container'>
        <FaCloudRain className='loader-icons' />
        <FaSnowflake className='loader-icons' />
        <FaSun className='loader-icons' />
        <FaBolt className='loader-icons' />
        <FaCloud className='loader-icons' />
        <FaCloudShowersHeavy className='loader-icons' />
    </div>
)

export const WeatherFailure = () => {
    const navigate = useNavigate()
    return (
    <div className="weather-failure-container">
        <div className="cloud">
        <FaCloudRain className="cloud-icon" />
        <FaCompass className="compass-icon" />
        </div>
        <h2 className="error-title">Oops! The forecast got lost in the storm.</h2>
        <p className="error-message">
        The weather data is taking a detour. Try again in a few seconds!
        </p>
        <button className="retry-btn" onClick={() => navigate('/')}  >
        <FaRedo className="retry-icon" /> Retry
        </button>
    </div>
    );
};

