const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
// console.log(__dirname,__filename);

console.log(path.join(__dirname, "../public/html"));

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewDirPath = path.join(__dirname, "../templates/views");
const partialDirPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewDirPath);
hbs.registerPartials(partialDirPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

//root path means jema app.js che te => webserverJs/src/app.js

console.log(__dirname);
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    greet: "user",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});

app.get("/weather", (req, res) => {
  try {
    const geocode = require("../utils1/geocode1");
    const forecast = require("../utils1/forcast1");

    const address = req.query.address;

    if (!address) {
      res.status(401).json({ error: "Please enter your address" });
    } else {
      geocode(address, (error, location) => {
        if (error) {
          return res.status(400).json({ error });
        }
        forecast(({ lat, lon, location } = location), (error, result) => {
          if (error) {
            return res.status(400).json({ error });
          }

          return res.status(200).json({ message: result });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/dynamicWeather", (req, res) => {
 let str = req.query.latlang
  console.log("In dynamic");
  console.log(str);
  const forecast = require("../utils1/forcast1");
  console.log("dynamicWeather");
  console.log(str.split(","),"spitValue");

  let arr = str.split(",")
  let lat = arr[0]
  let lon = arr[1]
  console.log(lat,lon,"latlon");

 console.log(lat,lon);
  forecast({ lat, lon}, (error, result) => {
    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: result });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "Help article not Found" });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404" });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
