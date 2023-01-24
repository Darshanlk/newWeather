console.log("main.js");

const getWeather = async (location) => {
  const res_data = await fetch(
    `http://localhost:5000/weather?address=${location}`
  );
  const data = await res_data.json();
  return data;
};
let result = document.querySelector("h3");
let search = document.querySelector("input");
let weatherform = document.querySelector("form");
weatherform.addEventListener("submit", async (e) => {
  e.preventDefault();

  let res = await getWeather(search.value);

  result.innerText = `Temprature: ${res.message.Temparture} Location: ${res.message.Location}`;
});
var map = L.map("map").setView([40.7128, 74.0060], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var popup = L.popup();


function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map ")
    .openOn(map);
  latlng = e.latlng;
  console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
  dynamicWeather(e.latlng.lat,e.latlng.lng)
}

map.on("click", onMapClick);
const dynamicWeather = async (lat, lon) => {
let str = `${lat},${lon}`
  const res_Data = await fetch(
    `http://localhost:5000/dynamicWeather?latlang=${str}`
  );
  const res = await res_Data.json();
  result.innerText =  `Temprature: ${res.message.Temparture}`;
};
