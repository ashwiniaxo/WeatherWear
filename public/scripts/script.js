const today = document.getElementById('date-today');
const date = document.getElementById('date');

document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/weather/forecast?location=${location}&date=${date.value}`);
        if (!response.ok) throw new Error('Could not retrieve weather data.');

        const data = await response.json();
        const forecast = data.forecast.forecastday[0].day;

        const avgTemp = forecast.avgtemp_c;
        const willItRain = forecast.daily_will_it_rain;
        const willItSnow = forecast.daily_will_it_snow;

        let clothingRecommendation;
        if (avgTemp > 25) {
            clothingRecommendation = "It's hot! Wear light clothes like a T-shirt and shorts.";
        } else if (avgTemp > 15) {
            clothingRecommendation = "Moderate temperature. A light jacket and jeans would be ideal.";
        } else {
            clothingRecommendation = "It's cold! Dress warmly with a coat, scarf, and gloves.";
        }

        if (willItRain) {
            clothingRecommendation += " Don't forget an umbrella, it might rain!";
        }
        if (willItSnow) {
            clothingRecommendation += " Prepare for snow, consider wearing boots and a warm coat!";
        }

        resultDiv.innerHTML = `
            <p>Weather for ${location} on ${date.value}:</p>
            <p>Temperature: ${forecast.avgtemp_c}°C</p>
            <p>Condition: ${forecast.condition.text}</p>
            <p>${clothingRecommendation}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not retrieve weather data.';
    }
});

today.addEventListener('click', () => {
    date.value = new Date().toISOString().split('T')[0];
});