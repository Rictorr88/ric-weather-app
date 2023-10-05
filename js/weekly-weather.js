import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from "./geolocation.js"
import { formatWeekList } from './utils/format-data.js'
import { createDom } from './utils/dom.js'

function tabPanelTemplate(id) {
    return `
        <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
          <div class="dayWeather" id="dayWeather-${id}">
            <ul style="color:white" class="dayWeather-list" id="dayWeather-list-${id}">
                Tab Panel ${id}
            </ul>
          </div>
        </div>
    `
}

function createTabPanel(id) {
    const $panel = createDom(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden =true
    }
    return $panel 
}


function configWeeklyWeather(weeklist) {
    const $container = document.querySelector('.weeklyWeather')
    weeklist.forEach((day, index) => {
        const $panel = createTabPanel(index)
        $container.append($panel)
    })
}

export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log("Ah ocurrido un error ubicandote")
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError)
      return console.log("Oh! a ocurrido un error trayendo el pronostico del clima")
    const weeklist = formatWeekList(weather.list)
    configWeeklyWeather(weeklist)
} 