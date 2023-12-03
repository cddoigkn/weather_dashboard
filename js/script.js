var city=""
var newAddress2=""

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
  .then( function (newAddress) {
     fetch(newAddress)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
        $(weather).append(row);
      })
    console.log(weather)
     lat = weather.coord.lat,    
     lon = weather.coord.lon
    newAddress2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e36257c77a0eba05856df765d7326b9e&units=imperial`
    console.log(newAddress2)
    return newAddress2
  })
}
    setTimeout(function(){

    
    fetch(newAddress2)
      .then(function (response) {
        return response.json();
        })
      .then(function (forecast) {
      console.log(forecast)
    })
}, 1000)

$("#searchButton").on( "click", function(e) {
  e.preventDefault()
  city=$("#search-input")[0].value
  findCity(city)
});