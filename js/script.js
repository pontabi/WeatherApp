("use strict");
import { API_KEY } from "./config.js";

// open-weather-map api key
const apiKey = API_KEY;

// GET DOM ELEMENTS
const iconImg = document.querySelector("#weather-icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

window.addEventListener("load", () => {
  // get user location info
  let lat;
  let lon;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      // http request
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // get values from api
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;
          const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // rendering
          iconImg.src = iconURL;
          loc.textContent = place;
          tempC.textContent = `${temp} °C`;
          tempF.textContent = `${fahrenheit} °F`;
          desc.textContent = description;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});

// iconImg
// loc
// tempC
// tempF
// desc
// sunriseDOM
// sunsetDOM
