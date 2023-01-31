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

  let year = now.getFullYear();

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

let currentDate = document.querySelector("#date");
console.log(document.querySelector("#date"));
let now = new Date();
date.innerHTML = displayDate(now);

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

  let mainTempIcon = document.querySelector("#main-temp-icon");
  mainTempIcon.setAttribute =
    ("src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon_url}.png`);
  console.log(mainTempIcon);
}

/*function setAttribute() {
  let icon = "response.data.condition.icon";
  icon = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  mainTempIcon.addEventListener("submit", displayWeatherCondition);
  console.log(setAttribute);
}*/

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
  let apiKey = "5980ta46f70b3b386c063344ca8aof7b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coordinates.latitude}&lat=${position.coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#search-input");
cityForm.addEventListener("submit", form);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Stockholm");
