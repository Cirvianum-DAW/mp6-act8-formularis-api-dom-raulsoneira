document
  .getElementById('meteo')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const ciutat = document.querySelector('#ciutat').value;
    const pais = document.querySelector('#pais').value;

    // validar que tots els camps estiguin omplerts

    if (!ciutat) {
      alert('Cal omplir tots els camps!!!');
      return;
    }

    try {
      const apiKey = '3bd1ae79e6a04d44873144237241004';

      const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciutat}&lang=ko`;
      const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciutat}&lang=ko&days=2`;

      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastWeatherUrl),
      ]);

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
      ]);

      console.log(currentData);
      console.log(forecastData);

      const weatherData = {
        current: {
          ciutat: currentData.location.name,
          pais: currentData.location.country,
          regio: currentData.location.region,
          weatherIcon: currentData.current.condition.icon,
          temperatura: `${currentData.current.temp_c}°C`,
          weatherDescription: currentData.current.condition.text,
        },

        forecast: {
          ciutat: forecastData.location.name,
          pais: forecastData.location.country,
          regio: forecastData.location.region,
          weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
          temperatura: `${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`,
          weatherDescription: forecastData.forecast.forecastday[1].day.condition.text,
        },
      };


      //Es una bona pràctica separar ara la lògica per modificar html
      displayWeatherResults(weatherData);
    } catch (error) {
        console.error("Error en la petició a l'api", error);
        alert("Hi ha hagut un error en la petició a l'API. Si us plau, intenta-ho de nou més tard.");

    }
  });

  function displayWeatherResults(weatherData) {
      // Mostrar la información actual
      document.getElementById('location-text').textContent = `${weatherData.current.ciutat}, ${weatherData.current.pais}, ${weatherData.current.regio}`;
      document.getElementById('temperature').textContent = `Temperatura actual: ${weatherData.current.temperatura}`;
      document.getElementById('weather-description').textContent = `Descripció del temps actual: ${weatherData.current.weatherDescription}`;
      document.getElementById('weather-icon').src = weatherData.current.weatherIcon;
  
      // Mostrar la información de la previsión para el día siguiente
      document.getElementById('tomorrow-temperature').textContent = `Temperatura prevista per al dia següent: ${weatherData.forecast.temperatura}`;
      document.getElementById('tomorrow-weather-description').textContent = `Descripció del temps previst per al dia següent: ${weatherData.forecast.weatherDescription}`;
      document.getElementById('tomorrow-weather-icon').src = weatherData.forecast.weatherIcon;
  
      // Mostrar los resultados
      document.getElementById('results').classList.remove('hidden');
}
  
