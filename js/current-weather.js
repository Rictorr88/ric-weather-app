import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionCodes } from './constants.js'
import { getCurrentPosition } from './geolocation.js'
// weather.name

function setCurrentCity($el, city) {
    $el.textContent = city
}


function setCurrentDate($el) {
    const date = new Date ()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }
    return 'morning'
}


function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg` 
}


function configCurrentWeather(weather) {

// loader    
//date
const $currentWeatherDate = document.querySelector('#current-weather-date')
setCurrentDate($currentWeatherDate)
//city    
const $currentWeatherCity = document.querySelector('#current-weather-city')
const city = weather.name
setCurrentCity($currentWeatherCity, city)
// temp  
const $currentWeatherTemp = document.querySelector('#current-weather-temp')
const temp = weather.main.temp
setCurrentTemp($currentWeatherTemp, temp)


//background    
const sunriseTime = new Date(weather.sys.sunrise * 1000)
const sunsetTime = new Date(weather.sys.sunset * 1000)
const $app = document.querySelector('#app')
const conditionCode = String(weather.weather[0].id).charAt(0)
setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))

}

export default function currentWeather() {
    //GEO // API // -weather // config
    console.log('esto pasa ANTES de getCurrenPosition')
    const latlon = getCurrentPosition()
    console.log("esto pasa DESPUES de getCurrenPosition")
    configCurrentWeather(weather)
    console.log(weather)
} 

