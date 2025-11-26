const cityInput = document.querySelector('.city-input')
const serachBin = document.querySelector('.search-Bts')

// button Input
const apiKey = `b798443e64fd39c27922e707bbd15e0e`
// Api key
const nameCity = document.getElementById("city");
const temp = document.getElementById("temp");
const wind = document.getElementById("Wind");
const humidity = document.getElementById("Humidity");
const timeSunrise = document.getElementById("time-Sunrise");
const timeSunset = document.getElementById("time-sunset");
// var DOM

serachBin.addEventListener("click", function() {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
    }
})

cityInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && cityInput.value != ""){
        cityInput.value = ''
    }

})
// function serach + button
async function getFetchData(endpoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const resp = await fetch(apiUrl);
    return resp.json();
}
// Function try api

async function updateWeatherInfo(city){
    try {
        const weatherData = await getFetchData('weather', city);
        if (!weatherData || weatherData.cod !== 200) {
            alert(`City not found: ${city}`);
            return;
        }

        nameCity.textContent = weatherData.name + ', ' + weatherData.sys.country;
        temp.textContent = Math.round(weatherData.main.temp) + '°';
        wind.textContent = weatherData.wind.speed + ' m/s';
        humidity.textContent = weatherData.main.humidity + '%';
        timeSunrise.textContent = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        timeSunset.textContent = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    } catch (err) {
        console.error('Error fetching weather data:', err);
        alert('Error fetching weather data.');
    }
}

// Print Api in DOM




function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday : "short",
        day : "2-digit",
        month : "short"
    }

    return currentDate.toLocaleDateString("en-GB", options)
}
getCurrentDate()