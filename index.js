const express = require("express");
const app = express();
const axios = require("axios");

// set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// handle the /weather route
app.get("/weather", async (req, res) => {
    // get the city from the query parameters
    const city = req.query.city;
    const apiKey = "e684f7bcac668c548080ffaf13e3c479";

    // add the logic to fetch weather data from the api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;

    try {
        const response = await axios.get(url);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = "No weather data found for the mentioned city";
    }
    // render the index template with the weather data and error message
    res.render("index", { weather, error });
});


// start the server and listen on the port 3000 or the value of the port environment variable
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})