import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Flag from 'react-world-flags'
import { FaSearch } from 'react-icons/fa';
import data from '../datas/citylist.json'

const SearchContainer = () => {
    const navigate = useNavigate();
    const [searchCity, setSearchCity] = useState('');

    const getCountryName = (countryCode) => countryList().getLabel(countryCode);

    const handleSelectCity = (city) => () => {
        navigate(`/weather/${city.name}/${city.country}`);
        setSearchCity('');
    }
    
    return(
        <div className='search-bg-container' >
            <div className='search-container'>
                <input 
                type='text' 
                placeholder='Search for your city' 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className='search-input'
                />
                <button className='search-button'>
                <FaSearch />
                </button>
            </div>
            {searchCity !== '' && 
                <div className='searched-cities'
        onBlur={()=>setSearchCity('')}>
                    {data.filter((city) => city.name.toLowerCase().includes(searchCity.toLowerCase())).splice(0,10).map((city) => (
                        <div key={city.id} className='city-card' onClick={handleSelectCity(city)} >
                            <span className='city-name'>{city.name}</span>,
                            <p>{getCountryName(city.country)}</p>
                            <Flag code={city.country} height='15' />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SearchContainer;