let key_openWeather = "aede21af5d096a90f0481b87f06dba0b";

const forcast = async ({ lat, lon, location }, callback) => {
  try {
    const weather_resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key_openWeather}&units=metric`
    );

    const weather_data = await weather_resp.json();

    callback(undefined, {
      Temparture: weather_data.main.temp + "°C",
      Location: location,
      weather: weather_data.weather,
    });
  } catch (err) {
    callback("unable to find location ", undefined);
  }
};
module.exports = forcast;
