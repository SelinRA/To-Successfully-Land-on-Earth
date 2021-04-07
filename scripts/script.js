/*-----API 1: Sanity Regulator (kattenfoto api)-----*/ 
/*-----Ik heb deze API gekozen omdat het me deed denken aan het thema van mijn challenge 1
Al heeft het niet veel met landen te maken, helpen de kattenfoto's wel je geest-----*/

function cat_get(url, callback) { // maken van een functie voor de foto
    var xmlhttp = new XMLHttpRequest(); // request naar de bron
    xmlhttp.onreadystatechange = function() { // contoleert request
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        var data = JSON.parse(xmlhttp.responseText);

        callback(data);
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    }
  
  cat_get('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg', function(data) { //voor de API Key zodat ie weet welke api hij moet pakken
    var html = '<img src="' + data[0]["url"] + '">'; // foto laden
    document.getElementById("api1").innerHTML = html; // verteld waar hij hem moet inladen in de webpagina
  });

  function gettingJSON(){
    document.write("jquery loaded");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=ee6596241130f193adf1ba90e625cc10",function(json){
        document.write(JSON.stringify(json));
    });
}

/*-----API 2: Forecast Landingspot (OpenWeatherMap)-----*/ 

function getAPIdata() {
  var city = "Den Haag"; //plek van de geplannde landing
  var request = 'https://api.openweathermap.org/data/2.5/weather?appid=891bd216d18a2affffd17bffbc009bd3&q=' + city;

  fetch(request)

  .then(function(response) {
      return response.json();
  })

  .then(function(response) {
      console.log(response);
      var theWeather = document.getElementById('api2'); // vertellen waar hij straks heen moet in de structuur
      var degC = Math.floor(response.main.temp - 273,15); // omrekenen naar celsius
      var theForecast = response.weather[0].description; // De korte beschrijving van het weer
      var theHumidity = response.main.humidity; // Luchtvochtigheid
      var thePressure = response.main.pressure; // Luchtdruk
        theWeather.innerHTML = 'Forecast:' + ' ' + theForecast + '<br>' + 'Temperature:' + ' ' + degC + '&#176;C' + '<br>' + 'Humidity:' + ' ' + theHumidity + '%' + '<br>' + 'Pressure:' + ' ' + thePressure + ' ' + 'hPa';
  });
}
getAPIdata(); //uitvoering

/*-----API 3: Surface of Former Home (MapBox)-----*/ 

mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhcmtseWJhc2lsIiwiYSI6ImNrbjZpeXJzYTA2cGMydnA0OXF1eG1kd2EifQ.VHNV7K44z-b87zEOUN0nuA';
var map = new mapboxgl.Map({
container: 'api3', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [4.3196501, 52.0855084], // starting position [lng, lat]
zoom: 0 // starting zoom
});