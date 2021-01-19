$(document).ready(function () {
var domain = "https://api.openweathermap.org/data/2.5/"
var endpoint = "weather"
var educationalKey = "4561dbb858c01c0096262a7277c1ba4a"
var citySearch = "london"
var url = `${domain+endpoint}?q=${citySearch}&appid=${educationalKey}`


  $.ajax({
      method: "GET",
      url: url
    })
    .done(function (response) {
      var data = response;
      var lat = data.coord.lat;
      var long = data.coord.lon;
      var icon = data.weather[0].icon;
      $("#result").html("Lat: " + lat + " Long: " + long)
      $("#result").append("</br>OpenWeather Data: " + JSON.stringify(response));
      $("#result").append(`</br> <img src=\"http://openweathermap.org/img/wn/${icon}@2x.png\">`)
    });
});