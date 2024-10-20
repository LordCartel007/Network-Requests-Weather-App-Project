const fetchButton = document.querySelector(".fetch-btn");

const apiKey = "4a86b0af8150d7ccbeb2045c7e4e911f";
// function that is going to be called when the button is clicked
const fetchWeatherHandler = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  //   Use navigator.geolocation.getCurrentPosition() to get the current location of the user.
  navigator.geolocation.getCurrentPosition(async (position) => {
    // DESTRUCTURING THE LAT AND LON FROM COORDS FROM POSITION
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

    // awaiting the  api keys
    // we added the back tick to to use the dollar $ sign to join the latitude and longitude
    // using template literals, we also could have use plus sign to join the string together
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    // use the json method to convert the response to json
    const weatherData = await response.json();
    console.log(weatherData);

    // using dom to select were the data will be displayed
    document.querySelector(".temp-span").textContent = weatherData.name;

    document.querySelector(".GeolocationLatitude").textContent =
      weatherData.coord.lat;

    document.querySelector(".GeolocationLongitude").textContent =
      weatherData.coord.lon;

    document.querySelector(
      ".feels_like"
    ).textContent = `${weatherData.main.feels_like} °C`;

    document.querySelector(
      ".grnd_level"
    ).textContent = `${weatherData.main.grnd_level} hPa`;

    document.querySelector(
      ".humidity"
    ).textContent = `${weatherData.main.humidity} %`;

    document.querySelector(
      ".Temperature"
    ).textContent = `${weatherData.main.temp} °C`;

    document.querySelector(".Country").textContent = weatherData.sys.country;

    document.querySelector(".Time_Zone").textContent = weatherData.timezone;

    document.querySelector(
      ".Wind_Degree"
    ).textContent = `${weatherData.wind.deg} °`;

    document.querySelector(
      ".Wind_Speed"
    ).textContent = `${weatherData.wind.speed} m/s`;
  });
};

// adding an event listener to the button
fetchButton.addEventListener("click", fetchWeatherHandler);
