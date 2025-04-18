const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const description = document.querySelector(".description");

const APIUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "2a14c2bafe9661ae22167a8340d3fe33";

async function getWeather(city) {
  try {
    const response = await fetch(`${APIUrl + city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);

    cityName.innerHTML = data.name || "N/A";
    temp.innerHTML = data.main ? `${Math.round(data.main.temp)}°C` : "N/A";
    humidity.innerHTML = data.main ? `${data.main.humidity}%` : "N/A";
    wind.innerHTML = data.wind ? `${data.wind.speed}km/h` : "N/A";
    description.innerHTML = data.weather ? data.weather[0].description : "N/A";

    if (data.weather[0].main === "Rain") {
      weatherIcon.src = "./image/rain.png";
    } else if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "./image/cloudy.png";
    } else if (data.weather[0].main === "Clear" || "Sunny" || "Sun") {
      weatherIcon.src = "./image/sun.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "./image/snow.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "./image/drizzle.png";
    } else if (data.weather[0].main === "Mist" || "Mist") {
      weatherIcon.src = "./image/mist.png";
    } else if (data.weather[0].main === "Storm") {
      weatherIcon.src = "./image/storm.png";
    } else if (data.weather[0].main === "Smoke") {
      weatherIcon.src = "./image/smoke.png";
    }

    weather.style.display = "block";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    cityName.innerHTML = "Error";
    temp.innerHTML = "N/A";
    humidity.innerHTML = "N/A";
    wind.innerHTML = "N/A";
  }
}

searchBtn.addEventListener("click", function () {
  const city = searchCity.value.trim();
  if (city) {
    getWeather(city);
  }
});

searchCity.addEventListener("keydown", function (e) {
  console.log(e.key);
  const city = searchCity.value.trim();  
  if (e.key === "Enter" && city) {
    getWeather(city);
  }
});
