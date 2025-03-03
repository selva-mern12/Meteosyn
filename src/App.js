import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import WeatherPage from './components/WeatherPage';
import {WeatherFailure}  from './components/WeatherLoader'

import './App.css';

const App = () =>
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/weather/:cityName/:countryName' element={<WeatherPage />} />
            <Route path='/not-found' element={<WeatherFailure />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
    </Router>

export default App;
