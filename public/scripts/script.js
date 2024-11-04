document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    // Fetch weather data
    const apiKey = 'Y2d42d8c4639f45578e315016240411';
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&dt=${date}`;

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather data not available');
        
        const data = await response.json();
        const forecast = data.forecast.forecastday[0].day;
        
        // Simple logic to suggest clothing based on temperature
        let clothingRecommendation;
        if (forecast.avgtemp_c > 25) {
            clothingRecommendation = 'It’s hot! Wear light clothes like a T-shirt and shorts.';
        } else if (forecast.avgtemp_c > 15) {
            clothingRecommendation = 'Moderate temperature. A light jacket and jeans would be ideal.';
        } else {
            clothingRecommendation = 'It’s cold! Dress warmly with a coat, scarf, and gloves.';
        }

        resultDiv.innerHTML = `
            <p>Weather for ${location} on ${date}:</p>
            <p>Temperature: ${forecast.avgtemp_c}°C</p>
            <p>${clothingRecommendation}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not retrieve weather data.';
    }
});
