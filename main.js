const apiKey = "78699429263e421494b171523242012"
const apiUrl = "https://api.weatherapi.com/v1/forecast.json"

const forecastContainer = document.querySelector('.forecast-container');
const searchInput = document.querySelector('.hero-section input');
const searchButton = document.querySelector('.hero-section button');

async function fetchWeather(city) {
    try {
        const url = `${apiUrl}?key=${apiKey}&q=${city}&days=3`;
        
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.log("Error fetching weather data:");
        forecastContainer.innerHTML = `<p class="text-danger">Error loading weather data. Please try again later.</p>`;
    }
}

function displayWeather(data) {

    const columns = document.querySelectorAll('.forecast-container .row .col');

    const { forecast, location } = data;

    forecast.forecastday.forEach((day, index) => {
        if (columns[index]) {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            const condition = day.day.condition.text;
            const icon = `https:${day.day.condition.icon}`;
            const maxTemp = day.day.maxtemp_c;
            const minTemp = day.day.mintemp_c;


            columns[index].innerHTML = `
                <header class="text-center pt-4 pb-5">
                    <h6>${dayName}</h6>
                </header>
                <div>
                    <h2 class="pb-3">${location.name}</h2>
                    <img src="${icon}" alt="${condition}" class="mb-2 pb-3" />
                    <h4 class="pb-3">${maxTemp}°C</h4>
                    <h6 class="pb-3">${minTemp}°C</h6>
                    <h6 class="pb-3">${condition}</h6>
                </div>
            `;
        }
    });
}



document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const cityInput = e.target.querySelector("input").value.trim();
    if (cityInput) {
        fetchWeather(cityInput);
    }
});

fetchWeather("Alexandria");