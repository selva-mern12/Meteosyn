import SearchContainer from '../SearchContainer'

import './index.css';

const Home = () => {

  return (
    <div className='home-container'>
        <h1 className='entrance-qoute'>"Let the rain wash away your worries, and the sunshine light your path." 🌦️</h1>
        <SearchContainer />
        <div className='weather-icons-container'>
            <img src='https://i.postimg.cc/GmRm6G5b/476a6da98bb049ba84a53fdf7d62d1c6.png' alt='rain' className='weather-icons' loading='lazy' />
            <img src='https://i.postimg.cc/YCLzycZ5/2cfe623a36de46f49685deaf2ed11026.png' alt='snow' className='weather-icons' loading='lazy'  />
            <img src='https://i.postimg.cc/ZqMBk0Nj/c8649a7a43f141b5a91e103f4145c821.png' alt='sun' className='weather-icons' loading='lazy' />
            <img src='https://i.postimg.cc/gkyb15hT/a8102dfc-25aa-474c-a781-d4c758f4b751.png' alt='thunder' className='weather-icons' loading='lazy' />
        </div>
    </div>
  );
}   

export default Home;