$(document).ready(function () {
var domain = "https://api.openweathermap.org/data/2.5/"
var endpoint = "weather"
//This is just a test key, if you steal it you're mean
var educationalKey = "4561dbb858c01c0096262a7277c1ba4a"
var citySearch = "london"
//Example, build url with template literals
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
var url = `${domain+endpoint}?q=${citySearch}&appid=${educationalKey}`


let successFunc = (response) => {
  var data = response;
  var lat = data.coord.lat;
  var long = data.coord.lon;
  var icon = data.weather[0].icon;
  $("#result").html("Lat: " + lat + " Long: " + long)
  $("#result").append("</br>OpenWeather Data: " + JSON.stringify(response));
  $("#result").append(`</br> <img src=\"http://openweathermap.org/img/wn/${icon}@2x.png\">`)
}

//https://api.jquery.com/jquery.ajax/
/*   $.get({
    url: url,
    data: {
      q: citySearch,
      appid: educationalKey
    },
    success: successFunc,
  }) */


fetch(url)
  .then(response => response.json())  // convert to json
  .then(json => successFunc(json))    //print data to console
  .catch(err => console.log('Request Failed', err)); // Catch errors


});