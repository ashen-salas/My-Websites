const apiKey = "a90314b0f15723be5fe59f22ef9a0565"; // <-- Reemplaza con tu API Key de OpenWeatherMap

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");

    if (!city) {
        resultDiv.innerHTML = '<div class="weather-error">Por favor escribe una ciudad.</div>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ciudad no encontrada");
        const data = await response.json();

        // Icono de la API
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const html = `
            <div class="weather-main">
                <img class="weather-icon" src="${iconUrl}" alt="icono clima" />
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                <div class="weather-city">${data.name}, ${data.sys.country}</div>
                <div class="weather-desc">${data.weather[0].description}</div>
            </div>
            <div class="weather-details">
                <span>Humedad<br><strong>${data.main.humidity}%</strong></span>
                <span>Viento<br><strong>${data.wind.speed} m/s</strong></span>
                <span>Presión<br><strong>${data.main.pressure} hPa</strong></span>
            </div>
        `;
        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = '<div class="weather-error">No se encontró la ciudad.</div>';
    }
}
