varnewslist = [];

// get the Current Weather for User location
function getCurrentWeatherData(position) {
	// Build the OpenAPI URL for current Weather
	var newsURL = "http://www.mosaiquefm.net/smart/newscast.xml?Cat=2";
	// OpenWeather API call for Current Weather
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

}