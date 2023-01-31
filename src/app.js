function displayDate(display) {
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

function displayWeatherCondition(response) {
  console.log(response);
}

function searchLocation(position) {
  let apiKey = `980ta46f70b3b386c063344ca8aof7b9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon={response.data}&lat={lat}&key={key}&apiKey=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
