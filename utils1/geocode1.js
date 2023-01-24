let key_mapBox = `pk.eyJ1IjoiZGFyc2hhbi1jcmVzdCIsImEiOiJjbGQ4ZXhkOXAwbnZtM3JwYnIwNjN0eDJvIn0.6-SIWvXBgOYBqsLWyiUHqg`;
const geocode = async (address, callback) => {
  try {
    const res_map = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key_mapBox}`
    );

    const data_map = await res_map.json();

    console.log(
      // data_map.features[0].text,
      data_map.features[0].place_name
      // data_map.features[0].center
    );
    let location = data_map.features[0].place_name;
    let [lon, lat] = await data_map.features[0].center;

    callback(undefined, { lat, lon, location });
  } catch (err) {
    callback("Unable to find location", undefined);
  }
};
module.exports = geocode;
