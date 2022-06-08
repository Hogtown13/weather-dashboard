const cityEl = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');
const tempEL = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');
const uvEl = document.getElementById('uv');
const forecastEl = document.getElementById('forecast-container')
//const uvColor = document.getElementsByClassName('uv-color')

const key = '73353a06047094d8ea003b9b34501086';


function getCoordinates() {
    console.log(cityEl.value)
    var cityName = cityEl.value.trim()
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=${key}`)
    .then(response => response.json())
    .then(data => { 
        let lat = data[0].lat
        let lon = data[0].lon
        getForecast(lat,lon)
    })
};

function getForecast(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        displayCurrent(data.current)
        displayDaily(data.daily)
    })
};

function displayCurrent(current){
    let temp = current.temp
    let wind = current.wind_speed
    let humidity = current.humidity
    let uvi = current.uvi 
    
    //console.log(`CurrentTemp: ${temp}`)
    tempEL.textContent = temp
    windEl.textContent = wind
    humidityEl.textContent = humidity
    uvEl.textContent = uvi
   
    
};


function displayDaily(daily){
    forecastEl.innerHTML = ''
 for (let index = 0; index < 5; index++) {
    const forecast = daily[index];
    let temp = forecast.temp.day 
    let wind = forecast.wind_speed
    let humidity = forecast.humidity
    let uvi = forecast.uvi 
    console.log(temp)
    let dailyDiv = document.createElement('div')
    let dailyTemp = document.createElement('p')
    let dailyWind = document.createElement('p')
    let dailyHumidity = document.createElement('p')
    let dailyUVI = document.createElement('p')
    dailyTemp.textContent = `Temperature: ${temp} °F `
    dailyWind.textContent = `Wind Speed: ${wind} MPH`
    dailyHumidity.textContent = `Humidity: ${humidity}%`
    dailyUVI.textContent = `U.V. Index: `

    forecastEl.appendChild(dailyDiv)
    dailyDiv.append(dailyTemp)
    dailyDiv.append(dailyWind)
    dailyDiv.append(dailyHumidity)
    

 }
}

searchBtn.addEventListener('click', getCoordinates);

