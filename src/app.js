function displayDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  //let currentDay = now.getDay();
  let date = now.getDate();

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  //let year = now.getFullYear();

  //let seconds = now.getSeconds();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date} ${month} ${hours}:${minutes}`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  // remove the active class to the celsius link when F is clicked and add it to C.
  convertCelsius.classList.remove("celsius");
  convertFahrenheit.classList.add("celsius");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  console.log(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  // remove the active class to the fahrenheit link when C is clicked and add it to F.
  convertCelsius.classList.add("celsius");
  convertFahrenheit.classList.remove("celsius");
  temperature.innerHTML = Math.round(celsiusTemperature);
  console.log(celsiusTemperature);
}

function form(event) {
  event.preventDefault();
  let test = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  console.log(
    "function form is running currently input is " +
      test.value +
      ", before is " +
      city.innerHTML
  );
  city.innerHTML = test.value;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "980ta46f70b3b386c063344ca8aof7b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  let mainTempIcon = document.querySelector("#main-temp-icon");
  /* mainTempIcon.setAttribute =
    ("src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  console.log(mainTempIcon);
  console.log(response.data.condition.icon);*/
  mainTempIcon.src = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
  //console.log(mainTempIcon);

  celsiusTemperature = response.data.temperature.current;

  //console.log(response.data);
  //console.log(response.data.coordinates);
  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "980ta46f70b3b386c063344ca8aof7b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "980ta46f70b3b386c063344ca8aof7b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formateDate(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">     
            <div class="date-forecast">${formateDate(forecastDay.time)}</div>
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt=""
              width="40"
            />
            <div class="temp-forecasts">
              <span class="temp-max-forecast">${Math.round(
                forecastDay.temperature.maximum
              )}??</span>
              <span class="temp-min-forecast">${Math.round(
                forecastDay.temperature.minimum
              )}??</span>
            </div>
          </div> 
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

let currentDate = document.querySelector("#date");
console.log(document.querySelector("#date"));
let now = new Date();
date.innerHTML = displayDate(now);

let cityForm = document.querySelector("#search-input");
cityForm.addEventListener("submit", form);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//let celsiusTemperature = null;

let convertFahrenheit = document.querySelector("#convert-fahrenheit");
convertFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let convertCelsius = document.querySelector("#convert-celcius");
convertCelsius.addEventListener("click", displayCelsiusTemperature);

searchCity("Stockholm");
