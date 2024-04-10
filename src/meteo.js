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

      const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciutat}&lang=ko `;
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
          weatherDescription: currentData.condition.text,
        },

        forecast: {
          ciutat: forecastData.location.name,
          pais: forecastData.location.country,
          regio: forecastData.location.region,
          weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
          temperatura: `${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`,
          weatherDescription: forecastData.forecast.forecastday[1].day.text,
        },
      };


      //Es una bona pràctica separar ara la lògica per modificar html
      displayWeatherResults(weatherData);
    } catch (error) {
        console.error("Error en la petició a l'api", error);
    }
  });

  function displayWeatherResults(weatherData) {
    
  }
