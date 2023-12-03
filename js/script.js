var city = ""
var newAddress2 = ""
var currentWeather = $("#currentWeather")
var lookingForward = $("#lookingForward")
var time = dayjs()

function findCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e36257c77a0eba05856df765d7326b9e`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const lat = data.coord.lat
      const lon = data.coord.lon
      const newAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e36257c77a0eba05856df765d7326b9e&units=imperial`
      return newAddress
    })
    .then(function (newAddress) {
      fetch(newAddress)
        .then(function (response) {
          return response.json();
        })
        .then(function (weather) {
          console.log(weather)
          currentWeather.empty()
          $(currentWeather).append(`
      <h2>${time.format("dddd, MMM Do")}</h2>
      <img class="icon" src= https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png></img>
      <p>temp: ${weather.main.temp}°F</p>
      <p>humidity: ${weather.main.humidity}%</p>
      <p>wind speed: ${weather.wind.speed}mph</p>
      `)
          lat = weather.coord.lat,
            lon = weather.coord.lon
          newAddress2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e36257c77a0eba05856df765d7326b9e&units=imperial`
          console.log(newAddress2)
          fiveDayForecast(newAddress2)
        })

    })
}
function fiveDayForecast(newAddress2) {
  fetch(newAddress2)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecast) {
      console.log(forecast)
      lookingForward.empty()
      for (i = 5, j=1; i < 40; i += 8, j++) {
        $(lookingForward).append(`
        <div class="weatherCard col-md-2 flex-column align-left bg-light mt-3 ml-1.5 ">
      <h2>${time.add(j,"day").format("dddd, MMM Do")}</h2>
      <img class="icon" src= https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png></img>
      <p>temp: ${forecast.list[i].main.temp}°F</p>
      <p>humidity: ${forecast.list[i].main.humidity}%</p>
      <p>wind speed: ${forecast.list[i].wind.speed}mph</p>
      </div>
      `)
      }
    })

}
// setTimeout(function () {


//   fetch(newAddress2)
//     .then(function (response) {
//       return response.json();
//       })
//     .then(function (forecast) {
//     console.log(forecast)
//   })
// }, 1000)

$("#searchButton").on("click", function (e) {
  e.preventDefault()
  city = $("#search-input")[0].value
  findCity(city)
});