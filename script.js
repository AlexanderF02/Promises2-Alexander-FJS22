function getWeatherData(latitude, longitude) {
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${59.334591}&lon=${18.063240}&units=metric&appid=ff18d6ae770e436e2baf9e5c88204a84`;

  axios.get(WEATHER_URL)
    .then(response => {
      const data = response.data;
      const temperature = data.main.temp.toFixed(1);
      const weatherDescription = data.weather[0].description;
      const weatherString = `${temperature}°C, ${weatherDescription}`;

      document.querySelector('.weather').textContent = weatherString;
    })
    .catch(error => {
      console.log(error);
    });
}

// Get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeatherData(latitude, longitude);
  }, error => {
    console.log(error);
  });
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const date = now.toLocaleDateString();
  const dateString = `${date} ${hours}:${minutes}:${seconds}`;
  document.querySelector('.clock').textContent = dateString;
}

setInterval(updateClock, 1000); // update every second

// Get background image credit
axios.get('https://api.unsplash.com/photos/random/?orientation=landscape&query=nature&client_id=T2h31niZhJkBL8ZLiiYTGhBN6UtNIxhGc4FFwiuaxgA')
  .then(response => {
    const data = response.data;
    const author = data.user.name;
    const authorUrl = data.user.links.html;
    const imageUrl = data.urls.regular;

    const creditString = `Photo by <a href="${authorUrl}">${author}</a> on <a href="${imageUrl}">Unsplash</a>`;
    document.querySelector('.credit-container .credit').innerHTML = creditString;

    document.body.style.backgroundImage = `url(${imageUrl})`;
  })
  .catch(error => {
    console.log(error);
  });



  