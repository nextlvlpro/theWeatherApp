
let apikey = "0d8a777cf8329412bced06c01fd8aadc";
let city = document.querySelector(".searchinput").value;

function introEnd() {
    document.querySelector(".introIcon").classList.add("introIconAniMation");
    document.querySelector(".intro").classList.add("introAnimation");
    document.querySelector("header").classList.add("headerAnimation");
    setTimeout(() => {
        document.querySelector(".MainWeatherContainer").style.display = "flex"; 
    }, 1000);
    
}

document.onkeyup = function (e){
    if (e.key == "Enter") { 
    introEnd()
    callWeather()
    }
}
function callWeather() {
    city = document.querySelector(".searchinput").value;
    if (city != "") {
        document.querySelector(".weatherData").style.display ="none";
        document.querySelector(".MainWeatherContainer").style.opacity = "1";
        document.querySelector(".MainWeatherContainer").classList.remove("MainWeatherContainerAnimation")
        document.querySelector(".warning").style.display ="none";
        document.querySelector(".loading").style.display ="flex";
        getWeather();
    }
    else {
        document.querySelector(".MainWeatherContainer").classList.remove("MainWeatherContainerAnimation")
        document.querySelector(".weatherData").style.display ="none";
        document.querySelector(".warning").style.display ="flex";
        document.querySelector(".warning").innerHTML = "Enter The City Name First"
    }
}

function getWeather() {
    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + "0d8a777cf8329412bced06c01fd8aadc")
    .then((response) => {
        if (response.ok) {
            document.querySelector(".loading").style.display ="none";
            setTimeout(() => {
                document.querySelector(".weatherData").style.display ="flex";
            }, 500);
            
            document.querySelector(".weatherData").classList.add("weatherDataAnimation");
            document.querySelector(".MainWeatherContainer").classList.add("MainWeatherContainerAnimation")
        }
        else
        {
            document.querySelector(".loading").style.display ="none";
            document.querySelector(".warning").style.display ="flex";
            document.querySelector(".warning").innerHTML = "Enter city Name Correctly or Check Your Connecton"
        }
        return response.json()
    })
    .then((weatherData) => {786.
        var description = weatherData.weather[0].description;
        let icon = weatherData.weather[0].icon;

        let temp = weatherData.main.temp;
        let feelsLike = weatherData.main.feels_like;
        let minTemp = weatherData.main.temp_min;
        let maxTemp = weatherData.main.temp_max;

        let windSpeed = weatherData.wind.speed
       

        // Dom manuplation
        document.querySelector(".weatherIcon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".desp").innerText = description
        document.querySelector(".temp").innerText = "Temprature  " + temp + "°C"
        document.querySelector(".feelsLike").innerText = "Feels Like  " + feelsLike + "°C"
        document.querySelector(".minTemp").innerText = "Min Temprature  " + minTemp + "°C"
        document.querySelector(".maxTemp").innerText = "Max Temprature  " + maxTemp + "°C"
        document.querySelector(".windSpeed").innerText = "Wind Speed  " + windSpeed + "Km/h"
    })
}
document.addEventListener("click", function (){introEnd()})