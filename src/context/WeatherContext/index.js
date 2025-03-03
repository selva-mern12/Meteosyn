import React from "react";
const WeatherContext = React.createContext({
    pageStatus : {
        loading: 'LOADING',
        success: 'SUCCESS',
        failure: 'FAILURE'
    },
    aqiLevels : {
        1:  "Air is clean and safe.",
        2:  "Acceptable air quality.",
        3:  "Sensitive groups may be affected.",
        4: "Unhealthy air for everyone.",
        5: "Hazardous air, avoid outdoor activities."
    },
    weatherTypes : {
        "Clear": { emoji: "☀️", background: "https://i.postimg.cc/jjSNJDvN/sky-is-blue-with-beautiful-clouds-154780-683.avif" },
        "Clouds": { emoji: "☁️", background: "https://i.postimg.cc/BvWktfL4/ba259a60-e787-4c5d-bc02-ed5d2bec9097.jpg" },
        "Rain": { emoji: "🌧️", background: "https://i.postimg.cc/D0ps6nZ0/istockphoto-1257951463-612x612.jpg" },
        "Drizzle": { emoji: "🌦️", background: "https://i.postimg.cc/T1kdWPP7/fall-leaves-illustration-rainy-forest-landscape-with-trees-leaves-warm-sunlight-1014870-63634.jpg" },
        "Thunderstorm": { emoji: "⛈️", background: "https://i.postimg.cc/GmpCyr0V/dark-sky-storm-cloud-1-894279-2.jpg" },
        "Snow": { emoji: "❄️", background: "https://i.postimg.cc/bJ4xQqFT/scenic-view-snow-covered-mountains-against-blue-sky-1048944-22004048.jpg" },
        "Mist": { emoji: "🌫️", background: "https://i.postimg.cc/jdxHP3MB/panoramic-view-city-against-sky-sunset-1048944-11240045.jpg" },
        "Smoke": { emoji: "💨", background: "https://i.postimg.cc/s21dxRQm/fog-mist-haze-mistiness-haziness-nature-mountain-forest-trees-cloudy-foggy-misty-winter-day-948269-4.jpg" },
        "Haze": { emoji: "🌁", background: "https://i.postimg.cc/c6q4MLYd/close-up-water-with-orange-blue-colors-605423-167475.jpg" },
        "Dust": { emoji: "🌪️", background: "https://i.postimg.cc/ncL60JTJ/brown-smoke-background-with-abstract-patterns-1158260-60183.jpg" },
        "Fog": { emoji: "🌫️", background: "https://i.postimg.cc/zvYT38BR/panoramic-shot-trees-against-sky-1048944-14710506.jpg" },
        "Sand": { emoji: "🏜️", background: "https://i.postimg.cc/dVnMB0cw/scenic-view-desert-against-clear-sky-1048944-8931175.jpg" },
        "Ash": { emoji: "🌋", background: "https://i.postimg.cc/tJ7dL2YB/background-with-water-drops-bubbles-1259630-3367.jpg" },
        "Squall": { emoji: "🌬️", background: "https://i.postimg.cc/pV4x3rSZ/surviving-ferocious-sandstorm-challenging-desert-environment-concept-desert-survival-sandstorm-prepa.jpg" },
        "Tornado": { emoji: "🌪️", background: "https://i.postimg.cc/gJvR1jyB/tornado-forming-open-field-violent-weather-sw-irling-wind-dust-1311198-6248.jpg" }
      },
      airPollutants: {
        "co": {
          "unit": "µg/m³",
          "observation": "Carbon Monoxide",
          "levels": [
            { "range": "500", "value": "Good" },
            { "range": "1000", "value": "Moderate" },
            { "range": "2000", "value": "Unhealthy for Sensitive Groups" },
            { "range": "10000", "value": "Unhealthy" },
            { "range": "20000", "value": "Very Unhealthy" },
            { "range": "20000+", "value": "Hazardous" }
          ],
          highRange: 20000
        },
        "no": {
          "unit": "µg/m³",
          "observation": "Nitrogen Oxide",
          "levels": [
            { "range": "50", "value": "Good" },
            { "range": "100", "value": "Moderate" },
            { "range": "200", "value": "Unhealthy for Sensitive Groups" },
            { "range": "500", "value": "Unhealthy" },
            { "range": "1000", "value": "Very Unhealthy" },
            { "range": "1000+", "value": "Hazardous" }
          ],
          highRange: 1000
        },
        "no2": {
          "unit": "µg/m³",
          "observation": "Nitrogen Dioxide",
          "levels": [
            { "range": "50", "value": "Good" },
            { "range": "100", "value": "Moderate" },
            { "range": "200", "value": "Unhealthy for Sensitive Groups" },
            { "range": "400", "value": "Unhealthy" },
            { "range": "600", "value": "Very Unhealthy" },
            { "range": "600+", "value": "Hazardous" }
          ],
            highRange: 600
        },
        "o3": {
          "unit": "µg/m³",
          "observation": "Ozone",
          "levels": [
            { "range": "50", "value": "Good" },
            { "range": "100", "value": "Moderate" },
            { "range": "150", "value": "Unhealthy for Sensitive Groups" },
            { "range": "200", "value": "Unhealthy" },
            { "range": "300", "value": "Very Unhealthy" },
            { "range": "300+", "value": "Hazardous" }
          ],
          highRange: 300
        },
        "so2": {
          "unit": "µg/m³",
          "observation": "Sulfur Dioxide",
          "levels": [
            { "range": "20", "value": "Good" },
            { "range": "80", "value": "Moderate" },
            { "range": "250", "value": "Unhealthy for Sensitive Groups" },
            { "range": "350", "value": "Unhealthy" },
            { "range": "500", "value": "Very Unhealthy" },
            { "range": "500+", "value": "Hazardous" }
          ],highRange: 500
        },
        "pm2_5": {
          "unit": "µg/m³",
          "observation": "Particulate Matter less than 2.5 microns",
          "levels": [
            { "range": "12", "value": "Good" },
            { "range": "35", "value": "Moderate" },
            { "range": "55", "value": "Unhealthy for Sensitive Groups" },
            { "range": "150", "value": "Unhealthy" },
            { "range": "250", "value": "Very Unhealthy" },
            { "range": "250+", "value": "Hazardous" }
          ],highRange: 250
        },
        "pm10": {
          "unit": "µg/m³",
          "observation": "Particulate Matter less than 10 microns",
          "levels": [
            { "range": "50", "value": "Good" },
            { "range": "100", "value": "Moderate" },
            { "range": "150", "value": "Unhealthy for Sensitive Groups" },
            { "range": "300", "value": "Unhealthy" },
            { "range": "500", "value": "Very Unhealthy" },
            { "range": "500+", "value": "Hazardous" }
          ],highRange: 500
        },
        "nh3": {
          "unit": "µg/m³",
          "observation": "Ammonia",
          "levels": [
            { "range": "10", "value": "Good" },
            { "range": "25", "value": "Moderate" },
            { "range": "50", "value": "Unhealthy for Sensitive Groups" },
            { "range": "100", "value": "Unhealthy" },
            { "range": "200", "value": "Very Unhealthy" },
            { "range": "200+", "value": "Hazardous" }
          ],highRange: 200
        }
      }
      
});

export default WeatherContext;