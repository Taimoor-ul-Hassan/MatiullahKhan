const weatherForm = document.querySelector(`.weatherForm`);
        const cityInput = document.querySelector(`.cityInput`);
        const card = document.querySelector(`.card`);
        const apikey = "b32bfc466a2e28fd8b3d42e575dbc963";

        weatherForm.addEventListener(`submit`, async e => {
            e.preventDefault();
            const city = cityInput.value;
            if(city){
                try{
                    const weatherData = await getWeatherData(city);
                    displayWeatherInfo(weatherData);
                }
                catch(error){
                    console.error(error);
                    displayError(error);
                }
            }
            else{
                displayError(`Please enter a city`);
            }
        })
        async function getWeatherData(city){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
            const response = await fetch(apiUrl);
           if(!response.ok){
            throw new Error(`Could not fetch weather data`);
           }
           return await response.json();
        }
        function displayWeatherInfo(data){
          const { name: city,
                 main: {temp, humidity},
                 weather: [{description, id}]} = data;

            card.textContent = ``;
            card.style.display = `flex`;

            const errorDisplay = document.createElement(`h1`);
            const tempDisplay = document.createElement(`p`);
            const humidityDisplay = document.createElement(`p`);
            const descDisplay = document.createElement(`p`);
            const weatherEmoji = document.createElement(`p`); 

            errorDisplay.classList.add(`errorDisplay`);
            tempDisplay.classList.add(`tempDisplay`);
            humidityDisplay.classList.add(`humidityDisplay`);
            descDisplay.classList.add(`descDisplay`);
            weatherEmoji.classList.add(`weatherEmoji`);

            errorDisplay.textContent = city;
            tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            descDisplay.textContent = description;
            weatherEmoji.textContent = getWeatherEmoji(id);
            
            card.appendChild(errorDisplay);
            card.appendChild(tempDisplay);
            card.appendChild(humidityDisplay);
            card.appendChild(descDisplay);
            card.appendChild(weatherEmoji);
        }
        function getWeatherEmoji(weatherId){
            switch(true){
                case(weatherId >= 200 && weatherId < 300):
                    return "⛈️";  // Thunderstorm
                case(weatherId >= 300 && weatherId < 400):
                    return "🌧️";  // Drizzle
                case(weatherId >= 500 && weatherId < 600):
                    return "🌧️";  // Rain
                case(weatherId >= 600 && weatherId < 700):
                    return "❄️";  // Snow
                case(weatherId >= 700 && weatherId < 800):
                    return "🌫️";  // Mist
                case(weatherId === 800):
                    return "☀️";  // Clear sky
                case(weatherId >= 801 && weatherId < 810):
                    return "🌤️";  // Few clouds
                default:
                    return "❓";  // Unknown
            }
        }
        function displayError(message){
            const errorDisplay = document.createElement(`p`);
            errorDisplay.textContent = message;
            errorDisplay.classList.add(`errorDisplay`);

            card.textContent = ``;
            card.style.display = `flex`;
            card.appendChild(errorDisplay); 
        }