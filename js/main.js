var BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
var UrlParams = "&appid=58858ca5e7596d7affb365733faaa48b&units=metric&type=accurate&mode=json";
// forecast URL
var Forecast_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?";
var ForeCast_Params = "&appid=58858ca5e7596d7affb365733faaa48b&cnt=5&units=metric&type=accurate&mode=json";
// Image base URL
var IMG_URL = "http://openweathermap.org/img/w/";

var newslist = [];
/******************/
var language = window.navigator.language;
if (language.length > 2) {
    language = language.split('-');
    language = language[0];
}

if (language === "en") {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
} else if (language === "fr") {
    var weekday = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var month = ["Janvie", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

} else {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}

    currentTime = new Date();
    currentHours = currentTime.getHours();
    currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    mnth = currentTime.getMonth();
    dat = currentTime.getDate();
    day = currentTime.getDay();
    oday = (dat < 10 ? "0" : "") + dat;
    year = currentTime.getFullYear();

//    if (!twentyfour) {
//        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
//        currentHours = (currentHours === 0) ? 12 : currentHours;
//    }

//    document.getElementById('date').innerHTML = oday + " " + month[mnth] + " " + year;
//    document.getElementById('month').innerHTML = month[mnth];
//    document.getElementById('date').innerHTML = oday;
//    document.getElementById('day').innerHTML = weekday[day];
//    document.getElementById('year').innerHTML = year;


/***********/
/* Initial function call to determine the user location using GeoLocation API */
function getLocation() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		navigator.geolocation.getCurrentPosition(getCurrentWeatherData,
				displayError, {
					enableHighAccuracy : true,
					timeout : timeoutVal,
					maximumAge : 0
				});
	} else {
		alert("Geolocation is not supported by this browser");
	}
}
// get the Current Weather for User location
function getCurrentWeatherData(position) {
	// Build the OpenAPI URL for current Weather
	var WeatherNowAPIurl = BASE_URL + "lat=" + position.coords.latitude
			+ "&lon=" + position.coords.longitude + UrlParams;
	var WeatherForecast_url = Forecast_URL + "lat=" + position.coords.latitude
			+ "&lon=" + position.coords.longitude + ForeCast_Params;
    
    // Build the news URL for category region
	var newsURL = "http://www.mosaiquefm.net/smart/newscast.xml?Cat=2";
    
	// OpenWeather API call for Current Weather
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var JSONobj = JSON.parse(xmlhttp.responseText);
			Parse(JSONobj);
		}
	}
	xmlhttp.open("GET", WeatherNowAPIurl, true);
	xmlhttp.send();

	// OpenWeather API call for Forecast Weather
	var xmlhr = new XMLHttpRequest();
	xmlhr.onreadystatechange = function() {
		if (xmlhr.readyState == 4 && xmlhr.status == 200) {
			var JSobj = JSON.parse(xmlhr.responseText);
			Forecast(JSobj);
		}
	}
	xmlhr.open("GET", WeatherForecast_url, true);
	xmlhr.send();

	setTimeout(function(){
        var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//			var JSONobj = JSON.parse(xmlhttp.responseText);
            var JSONobj = xmlToJSON.parseString(xmlhttp.responseText);
			console.log(xmlToJSON.parseString(xmlhttp.responseText));
            console.log("---------------");
            console.log(JSONobj[0]);
//            console.log(JSON.parse(JSONobj));
		  }
        }
        xmlhttp.open("GET", newsURL, true);
        xmlhttp.send();
    }, 3000);
	// mosaique news call for getting xml data and parse it to json object
	


}
// Error Handler
function displayError(error) {
	var errors = {
		1 : 'Permission denied',
		2 : 'Position unavailable',
		3 : 'Request timeout'
	};
	alert("Error: " + errors[error.code]);
}
// display the current weather and location

function Parse(obj) {
	// current Location
    document.getElementById("weathercard").innerHTML = "<div class='weather-icon"+ obj.weather[0].icon+"'></div>"
        +"<h1>"+obj.main.temp+"º</h1><p id='location'>"+obj.name+"</p>";
 
    document.getElementById('date').innerHTML = oday + " " + month[mnth] + " " + year;
    
    
    if(day + 1 > 7){
        var dayres = day + 1 - 7;
        document.getElementById('day1').innerHTML = weekday[dayres];
    }
    if(day + 2 > 7){
        var dayres = day + 2 - 7;
        document.getElementById('day2').innerHTML = weekday[dayres];
    }
    if(day + 3 > 7){
        var dayres = day + 3 - 7;
        document.getElementById('day3').innerHTML = weekday[dayres];
    }
    if(day + 4 > 7){
        var dayres = day + 4 - 7;
        document.getElementById('day4').innerHTML = weekday[dayres];
    }
    if(day + 5 > 7){
        var dayres = day + 5 - 7;
        document.getElementById('day5').innerHTML = weekday[dayres];
    }
//    if(day + 6 > 7){
//        var dayres = day + 6 - 7;
//        document.getElementById('day6').innerHTML = weekday[dayres];
//    }
}


// display forecasts for next 5 Days
function Forecast(obj) {
	document.getElementById("day1div").innerHTML = "<img src='" + IMG_URL
			+ obj.list[0].weather[0].icon + ".png'> " + "<br>"
			+ obj.list[0].temp.min + " C<br>"
			+ obj.list[0].temp.max + " C<br>" +
			+ obj.list[0].weather[0].description ;

	document.getElementById("day2div").innerHTML = "<img src='" + IMG_URL
			+ obj.list[1].weather[0].icon + ".png'> " + "<br>"
			+ obj.list[1].temp.min + " C<br>"
			+ obj.list[1].temp.max + " C<br>" +
			+ obj.list[1].weather[0].description ;
	document.getElementById("day3div").innerHTML = "<img src='" + IMG_URL
			+ obj.list[2].weather[0].icon + ".png'> " + "<br>"
			+ obj.list[2].temp.min + " C<br>"
			+ obj.list[2].temp.max + " C<br>"
			+ obj.list[2].weather[0].description ;
	document.getElementById("day4div").innerHTML = "<img src='" + IMG_URL
			+ obj.list[3].weather[0].icon + ".png'> " + "<br>"
			+ obj.list[3].temp.min + " C<br>"
			+ obj.list[3].temp.max + " C<br>" +
			+ obj.list[3].weather[0].description ;
	document.getElementById("day5div").innerHTML = "<img src='" + IMG_URL
			+ obj.list[4].weather[0].icon + ".png'> " + "<br>"
			+ obj.list[4].temp.min + " C<br>"
			+ obj.list[4].temp.max + " C<br>" +
			+ obj.list[4].weather[0].description ;
    console.log(obj.list);
}







