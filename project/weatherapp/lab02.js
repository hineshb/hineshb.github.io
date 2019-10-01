var cityname;
var kelvin = new Array();
var hourkelvin = new Array();
var checktf=0;
function loaddefault(){
	//loadWeather('Toronto');
	//loadForcast('Toronto');
	//celsius();
	autocomplete();
	loadWeather('Toronto');
	
}

function autocomplete(){
	var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function today(){
	var month = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var today = new Date();
	var months = today.getMonth();
	var day = today.getDate();
	var year = today.getFullYear();
	document.write(month[months] + " " + day + ", " + year);
	
	//work in progress
	var hour = today.getHours();
	var minute = today.getMinutes();
	var hour2 = today.getHours();
	var minute2 = today.getMinutes();
	var ampm;
	var ampm2;
	if (minute2 < 10){
	minute2 = "0" + minute2;
	}
	if (hour2 < 12 ){
	ampm2 = "AM";
	}
	if (hour2 >= 12 ){
	ampm2 = "PM";
	}
	if (minute < 10){
	minute = "0" + minute;
	}
	if (hour == 0) {
	hour = 12;
	ampm = "AM";
	}
	if (hour < 12) {
	ampm = "AM";
	}
	if (hour > 12) {
	ampm = "PM";
	hour = hour - 12;
	}
	document.write("<br>");
	document.write(" " + hour + ":" + minute + " " + ampm + " || " + hour2 + ":" + minute2 + " " + ampm2);

	
}

function today2(){
	var month = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var today = new Date();
	var months = today.getMonth() + 1;
	var day = today.getDate();
	var year = today.getFullYear();
	document.write(month[months] + " " + day + ", " + year);
	
}
//Get next 5 days (API CHANGED 2018 2days back)
function tomorrow(){
	var month = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate());
	//Day1
	var months = tomorrow.getMonth();
	var day = tomorrow.getDate()-1;
	document.getElementById("tomorrow1").innerHTML = month[months] + " " + day;
	//Day2
	tomorrow.setDate(tomorrow.getDate());
	months = tomorrow.getMonth();
	day = tomorrow.getDate();
	document.getElementById("tomorrow2").innerHTML = month[months] + " " + day;
	//Day3
	tomorrow.setDate(tomorrow.getDate() + 1);
	months = tomorrow.getMonth();
	day = tomorrow.getDate();
	document.getElementById("tomorrow3").innerHTML = month[months] + " " + day;
	//Day4
	tomorrow.setDate(tomorrow.getDate() + 1);
	months = tomorrow.getMonth();
	day = tomorrow.getDate();
	document.getElementById("tomorrow4").innerHTML = month[months] + " " + day;
	//Day5
	tomorrow.setDate(tomorrow.getDate() + 1);
	months = tomorrow.getMonth();
	day = tomorrow.getDate();
	document.getElementById("tomorrow5").innerHTML = month[months] + " " + day;
}

function loadWeather(city){
            var site = "https://api.openweathermap.org/data/2.5/weather?q="+ city  + "&APPID=10b50ba8305895a335f5ebd33514c94a";
            var http = new XMLHttpRequest();
			
            try{
               // Opera 8.0+, Firefox, Chrome, Safari
               http = new XMLHttpRequest();
            }catch (e){
               // Internet Explorer Browsers
               try{
                  http = new ActiveXObject("Msxml2.XMLHTTP");
					
               }catch (e) {
				
                  try{
                     http = new ActiveXObject("Microsoft.XMLHTTP");
                  }catch (e){
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                  }
					
               }
            }
			
            http.onreadystatechange = function(){
			
               if (http.readyState == 4  ){
                  // Javascript function JSON.parse to parse JSON data
                  var jsonObj = JSON.parse(http.responseText);

                  // jsonObj variable now contains the data structure and can
                  // be accessed as jsonObj.name and jsonObj.country.
                  document.getElementById("Name").innerHTML = jsonObj.name;
				  document.getElementById("Country").innerHTML = jsonObj.sys.country;
                  document.getElementById("Temperature1").innerHTML = Math.round(jsonObj.main.temp - 273);
				  kelvin[0] = jsonObj.main.temp;
				  document.getElementById("Img1").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.weather[0].icon + ".png>";
				  document.getElementById("Unit").innerHTML = "C";
				  document.getElementById("Weather1").innerHTML = jsonObj.weather[0].main;
				  document.getElementById("Wind1").innerHTML = jsonObj.wind.speed;
				  document.getElementById("Humidity1").innerHTML = jsonObj.main.humidity;
               }
            }
			
            http.open("GET", site, true);
            http.send();
			loadForcast(city);
			loadForcast(city);
			
 }
 function hide(){
		document.getElementById("HourDate1").innerHTML = "";
		document.getElementById("HourTemp1").innerHTML = ""; 
		document.getElementById("HourImg1").innerHTML = "";
		document.getElementById("HourUnit1").innerHTML = "";
		document.getElementById("HourWeather1").innerHTML = "";
		document.getElementById("HourWind1").innerHTML = "";
		document.getElementById("HourHumidity1").innerHTML = ""; 
		//
		document.getElementById("HourDate2").innerHTML = "";
		document.getElementById("HourTemp2").innerHTML = ""; 
		document.getElementById("HourImg2").innerHTML = "";
		document.getElementById("HourUnit2").innerHTML = "";
		document.getElementById("HourWeather2").innerHTML = "";
		document.getElementById("HourWind2").innerHTML = "";
		document.getElementById("HourHumidity2").innerHTML = ""; 
		//
		document.getElementById("HourDate3").innerHTML = "";
		document.getElementById("HourTemp3").innerHTML = ""; 
		document.getElementById("HourImg3").innerHTML = "";
		document.getElementById("HourUnit3").innerHTML = "";
		document.getElementById("HourWeather3").innerHTML = "";
		document.getElementById("HourWind3").innerHTML = "";
		document.getElementById("HourHumidity3").innerHTML = ""; 
		//
		document.getElementById("HourDate4").innerHTML = "";
		document.getElementById("HourTemp4").innerHTML = ""; 
		document.getElementById("HourImg4").innerHTML = "";
		document.getElementById("HourUnit4").innerHTML = "";
		document.getElementById("HourWeather4").innerHTML = "";
		document.getElementById("HourWind4").innerHTML = "";
		document.getElementById("HourHumidity4").innerHTML = ""; 
		//
		document.getElementById("HourDate5").innerHTML = "";
		document.getElementById("HourTemp5").innerHTML = ""; 
		document.getElementById("HourImg5").innerHTML = "";
		document.getElementById("HourUnit5").innerHTML = "";
		document.getElementById("HourWeather5").innerHTML = "";
		document.getElementById("HourWind5").innerHTML = "";
		document.getElementById("HourHumidity5").innerHTML = ""; 
		//
		document.getElementById("HourDate6").innerHTML = "";
		document.getElementById("HourTemp6").innerHTML = ""; 
		document.getElementById("HourImg6").innerHTML = "";
		document.getElementById("HourUnit6").innerHTML = "";
		document.getElementById("HourWeather6").innerHTML = "";
		document.getElementById("HourWind6").innerHTML = "";
		document.getElementById("HourHumidity6").innerHTML = ""; 
		//
		document.getElementById("HourDate7").innerHTML = "";
		document.getElementById("HourTemp7").innerHTML = ""; 
		document.getElementById("HourImg7").innerHTML = "";
		document.getElementById("HourUnit7").innerHTML = "";
		document.getElementById("HourWeather7").innerHTML = "";
		document.getElementById("HourWind7").innerHTML = "";
		document.getElementById("HourHumidity7").innerHTML = ""; 
 }
 
 function loadHourly(){
			var city = document.getElementById("Name").innerHTML;
            var site = "https://api.openweathermap.org/data/2.5/forecast/?q="+ city  + "&APPID=10b50ba8305895a335f5ebd33514c94a";
            var http2 = new XMLHttpRequest();
			
            try{
               // Opera 8.0+, Firefox, Chrome, Safari
               http = new XMLHttpRequest();
            }catch (e){
               // Internet Explorer Browsers
               try{
                  http = new ActiveXObject("Msxml2.XMLHTTP");
					
               }catch (e) {
				
                  try{
                     http = new ActiveXObject("Microsoft.XMLHTTP");
                  }catch (e){
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                  }
					
               }
            }
			
            http.onreadystatechange = function(){
			
               if (http.readyState == 4  ){
                  // Javascript function JSON.parse to parse JSON data
                  var jsonObj = JSON.parse(http.responseText);

					// jsonObj variable now contains the data structure and can
					// be accessed as jsonObj.name and jsonObj.country.
					//Day1
					var month = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					var date = new Date((jsonObj.list[0].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					//document.write(month[months] + " " + day + " " + hours + ":" + minutes.substr(-2));
				    document.getElementById("HourDate1").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp1").innerHTML =  Math.round(jsonObj.list[0].main.temp -273) + " <sup>o</sup>";
					hourkelvin[0] = jsonObj.list[0].main.temp;
					document.getElementById("HourImg1").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[0].weather[0].icon  + ".png>";
					document.getElementById("HourUnit1").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather1").innerHTML = jsonObj.list[0].weather[0].description + "  |  ";
					document.getElementById("HourWind1").innerHTML = jsonObj.list[0].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity1").innerHTML = jsonObj.list[0].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[1].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate2").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp2").innerHTML =  Math.round(jsonObj.list[1].main.temp -273) + " <sup>o</sup>";
					hourkelvin[1] = jsonObj.list[1].main.temp;
					document.getElementById("HourImg2").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[1].weather[0].icon  + ".png>";
					document.getElementById("HourUnit2").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather2").innerHTML = jsonObj.list[1].weather[0].description + "  |  ";
					document.getElementById("HourWind2").innerHTML = jsonObj.list[1].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity2").innerHTML = jsonObj.list[1].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[2].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate3").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp3").innerHTML =  Math.round(jsonObj.list[2].main.temp -273) + " <sup>o</sup>";
					hourkelvin[2] = jsonObj.list[2].main.temp;
					document.getElementById("HourImg3").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[2].weather[0].icon  + ".png>";
					document.getElementById("HourUnit3").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather3").innerHTML = jsonObj.list[2].weather[0].description + "  |  ";
					document.getElementById("HourWind3").innerHTML = jsonObj.list[2].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity3").innerHTML = jsonObj.list[2].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[3].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate4").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp4").innerHTML =  Math.round(jsonObj.list[3].main.temp -273) + " <sup>o</sup>";
					hourkelvin[3] = jsonObj.list[3].main.temp;
					document.getElementById("HourImg4").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[3].weather[0].icon  + ".png>";
					document.getElementById("HourUnit4").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather4").innerHTML = jsonObj.list[3].weather[0].description + "  |  ";
					document.getElementById("HourWind4").innerHTML = jsonObj.list[3].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity4").innerHTML = jsonObj.list[3].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[4].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate5").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp5").innerHTML =  Math.round(jsonObj.list[4].main.temp -273) + " <sup>o</sup>";
					hourkelvin[4] = jsonObj.list[4].main.temp;
					document.getElementById("HourImg5").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[4].weather[0].icon  + ".png>";
					document.getElementById("HourUnit5").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather5").innerHTML = jsonObj.list[4].weather[0].description + "  |  ";
					document.getElementById("HourWind5").innerHTML = jsonObj.list[4].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity5").innerHTML = jsonObj.list[4].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[5].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate6").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp6").innerHTML =  Math.round(jsonObj.list[5].main.temp -273) + " <sup>o</sup>";
					hourkelvin[5] = jsonObj.list[5].main.temp;
					document.getElementById("HourImg6").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[5].weather[0].icon  + ".png>";
					document.getElementById("HourUnit6").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather6").innerHTML = jsonObj.list[5].weather[0].description + "  |  ";
					document.getElementById("HourWind6").innerHTML = jsonObj.list[5].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity6").innerHTML = jsonObj.list[5].main.humidity + "%" + "<hr>";
					//
					var date = new Date((jsonObj.list[6].dt)*1000);
					var months = date.getMonth();
					var day = date.getDate();
					var year = date.getFullYear();
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					document.getElementById("HourDate7").innerHTML = (month[months] + " " + day + " " + hours + ":" + minutes.substr(-2)) + "  |  ";
					document.getElementById("HourTemp7").innerHTML =  Math.round(jsonObj.list[6].main.temp -273) + " <sup>o</sup>";
					hourkelvin[6] = jsonObj.list[6].main.temp;
					document.getElementById("HourImg7").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[6].weather[0].icon  + ".png>";
					document.getElementById("HourUnit7").innerHTML = "C" + "  |  ";
					document.getElementById("HourWeather7").innerHTML = jsonObj.list[6].weather[0].description + "  |  ";
					document.getElementById("HourWind7").innerHTML = jsonObj.list[6].wind.speed + " m/s" + "  |  ";
					document.getElementById("HourHumidity7").innerHTML = jsonObj.list[6].main.humidity + "%" + "<hr>";
					//
					if(checktf==1){
						fahren();
					}			
               }
            }

            http.open("GET", site, true);
            http.send();
 }
 
 //http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city  + "&APPID=10b50ba8305895a335f5ebd33514c94a&cnt=5
 //Forcast
 function loadForcast(city){
           var site = "https://api.openweathermap.org/data/2.5/forecast/daily?q="+ city  + "&APPID=10b50ba8305895a335f5ebd33514c94a&cnt=5";
            var http2 = new XMLHttpRequest();
			
            try{
               // Opera 8.0+, Firefox, Chrome, Safari
               http = new XMLHttpRequest();
            }catch (e){
               // Internet Explorer Browsers
               try{
                  http = new ActiveXObject("Msxml2.XMLHTTP");
					
               }catch (e) {
				
                  try{
                     http = new ActiveXObject("Microsoft.XMLHTTP");
                  }catch (e){
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                  }
					
               }
            }
			
            http.onreadystatechange = function(){
			
               if (http.readyState == 4  ){
                  // Javascript function JSON.parse to parse JSON data
                  var jsonObj = JSON.parse(http.responseText);

                  // jsonObj variable now contains the data structure and can
                  // be accessed as jsonObj.name and jsonObj.country.
				  //Day1
                  document.getElementById("Temp2").innerHTML = Math.round(jsonObj.list[0].temp.day -273);
				  kelvin[1] = jsonObj.list[0].temp.day;
				  document.getElementById("Img2").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[0].weather[0].icon  + ".png>";
				  document.getElementById("Unit2").innerHTML = "C";
				  document.getElementById("Weather2").innerHTML = jsonObj.list[0].weather[0].main;
				  document.getElementById("Wind2").innerHTML = jsonObj.list[0].speed;
				  document.getElementById("Humidity2").innerHTML = jsonObj.list[0].humidity;
				  //Day2
                  document.getElementById("Temp3").innerHTML = Math.round(jsonObj.list[1].temp.day -273);
				  kelvin[2] = jsonObj.list[1].temp.day;
				  document.getElementById("Img3").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[1].weather[0].icon  + ".png>";
				  document.getElementById("Unit3").innerHTML = "C";
				  document.getElementById("Weather3").innerHTML = jsonObj.list[1].weather[0].main;
				  document.getElementById("Wind3").innerHTML = jsonObj.list[1].speed;
				  document.getElementById("Humidity3").innerHTML = jsonObj.list[1].humidity;
				  //Day3
                  document.getElementById("Temp4").innerHTML = Math.round(jsonObj.list[2].temp.day -273);
				  kelvin[3] = jsonObj.list[2].temp.day;
				  document.getElementById("Img4").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[2].weather[0].icon  + ".png>";
				  document.getElementById("Unit4").innerHTML = "C";
				  document.getElementById("Weather4").innerHTML = jsonObj.list[2].weather[0].main;
				  document.getElementById("Wind4").innerHTML = jsonObj.list[2].speed;
				  document.getElementById("Humidity4").innerHTML = jsonObj.list[2].humidity;
				  //Day4
                  document.getElementById("Temp5").innerHTML = Math.round(jsonObj.list[3].temp.day -273);
				  kelvin[4] = jsonObj.list[3].temp.day;
				  document.getElementById("Img5").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[3].weather[0].icon  + ".png>";
				  document.getElementById("Unit5").innerHTML = "C";
				  document.getElementById("Weather5").innerHTML = jsonObj.list[3].weather[0].main;
				  document.getElementById("Wind5").innerHTML = jsonObj.list[3].speed;
				  document.getElementById("Humidity5").innerHTML = jsonObj.list[3].humidity;
				  //Day5
                  document.getElementById("Temp6").innerHTML = Math.round(jsonObj.list[4].temp.day -273);
				  kelvin[5] = jsonObj.list[4].temp.day;
				  document.getElementById("Img6").innerHTML = "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[4].weather[0].icon  + ".png>";
				  document.getElementById("Unit6").innerHTML = "C";
				  document.getElementById("Weather6").innerHTML = jsonObj.list[4].weather[0].main;
				  document.getElementById("Wind6").innerHTML = jsonObj.list[4].speed;
				  document.getElementById("Humidity6").innerHTML = jsonObj.list[4].humidity;
               }
            }
			
            http.open("GET", site, true);
            http.send();
			//celsius();
			tomorrow();
			
 }
 
 
function cityname() {
	var x = document.forms["city"]["city"].value;
    if (x == null || x == "") {
        alert("Must enter a city!!");
        return false;
    }
	
	
    var city = document.getElementById("city");
    var text = "";
    var i;
    for (i = 0; i < city.length-1 ;i++) {
        text += city.elements[i].value;
    }
    hide();
	loadWeather(text);

}


function celsius(){
	//var cel[0] = kelvin[0] - 273;
	//var cel[1] = kelvin[1] - 273;
	//var cel[2] = kelvin[2] - 273;
	//var cel[3] = kelvin[3] - 273;
	//var cel[4] = kelvin[4] - 273;
	//var cel[5] = kelvin[5] - 273;
	checktf=0;
	document.getElementById("Unit").innerHTML = "C";
	document.getElementById("Unit2").innerHTML = "C";
	document.getElementById("Unit3").innerHTML = "C";
	document.getElementById("Unit4").innerHTML = "C";
	document.getElementById("Unit5").innerHTML = "C";
	document.getElementById("Unit6").innerHTML = "C";
	document.getElementById("Temperature1").innerHTML = Math.round(kelvin[0] - 273.15);
	document.getElementById("Temp2").innerHTML = Math.round(kelvin[1] - 273.15);
	document.getElementById("Temp3").innerHTML = Math.round(kelvin[2] - 273.15);
	document.getElementById("Temp4").innerHTML = Math.round(kelvin[3] - 273.15);
	document.getElementById("Temp5").innerHTML = Math.round(kelvin[4] - 273.15);
	document.getElementById("Temp6").innerHTML = Math.round(kelvin[5] - 273.15);
	if(document.getElementById("HourUnit1").innerHTML == ""){
		return;
	}else{
	document.getElementById("HourUnit1").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit2").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit3").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit4").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit5").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit6").innerHTML = "C" + "  |  ";
	document.getElementById("HourUnit7").innerHTML = "C" + "  |  ";
	}
	if(document.getElementById("HourTemp1").innerHTML == ""){
		return;
	}else{
	document.getElementById("HourTemp1").innerHTML =  Math.round(hourkelvin[0] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp2").innerHTML =  Math.round(hourkelvin[1] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp3").innerHTML =  Math.round(hourkelvin[2] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp4").innerHTML =  Math.round(hourkelvin[3] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp5").innerHTML =  Math.round(hourkelvin[4] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp6").innerHTML =  Math.round(hourkelvin[5] -273.15) + " <sup>o</sup>";
	document.getElementById("HourTemp7").innerHTML =  Math.round(hourkelvin[6] -273.15) + " <sup>o</sup>";
	}
}

function fahren(){
	//var far = (kelvin - 273) * 1.8 + 32 ;
	//document.getElementById("Temperature1").innerHTML = Math.round(far);
	//document.getElementById("Unit").innerHTML = 'F';
	checktf=1
	document.getElementById("Unit").innerHTML = "F";
	document.getElementById("Unit2").innerHTML = "F";
	document.getElementById("Unit3").innerHTML = "F";
	document.getElementById("Unit4").innerHTML = "F";
	document.getElementById("Unit5").innerHTML = "F";
	document.getElementById("Unit6").innerHTML = "F";
	document.getElementById("Temperature1").innerHTML = Math.round((kelvin[0] - 273.15) * 1.8 + 32);
	document.getElementById("Temp2").innerHTML = Math.round((kelvin[1] - 273.15) * 1.8 + 32);
	document.getElementById("Temp3").innerHTML = Math.round((kelvin[2] - 273.15) * 1.8 + 32);
	document.getElementById("Temp4").innerHTML = Math.round((kelvin[3] - 273.15) * 1.8 + 32);
	document.getElementById("Temp5").innerHTML = Math.round((kelvin[4] - 273.15) * 1.8 + 32);
	document.getElementById("Temp6").innerHTML = Math.round((kelvin[5] - 273.15) * 1.8 + 32);
	if(document.getElementById("HourUnit1").innerHTML == ""){
		return;
	}else{
	document.getElementById("HourUnit1").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit2").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit3").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit4").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit5").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit6").innerHTML = "F" + "  |  ";
	document.getElementById("HourUnit7").innerHTML = "F" + "  |  ";
	}
	if(document.getElementById("HourTemp1").innerHTML == ""){
		return;
	}else{
	document.getElementById("HourTemp1").innerHTML =  Math.round((hourkelvin[0] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp2").innerHTML =  Math.round((hourkelvin[1] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp3").innerHTML =  Math.round((hourkelvin[2] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp4").innerHTML =  Math.round((hourkelvin[3] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp5").innerHTML =  Math.round((hourkelvin[4] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp6").innerHTML =  Math.round((hourkelvin[5] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	document.getElementById("HourTemp7").innerHTML =  Math.round((hourkelvin[6] - 273.15) * 1.8 + 32) + " <sup>o</sup>";
	}
}