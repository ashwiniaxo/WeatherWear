document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        // Envoyer une requête au serveur avec les valeurs de l'utilisateur
        const response = await fetch(`/weather/forecast?location=${location}&date=${date}`);
        if (!response.ok) throw new Error('Could not retrieve weather data.');

        const data = await response.json();
        // TEST -- console.log(data);
        const forecast = data.forecast.forecastday[0].day;

        const avgTemp = forecast.avgtemp_c; // Température moyenne en Celsius
        const willItRain = forecast.daily_will_it_rain; // 1 si la pluie est attendue, 0 sinon
        const willItSnow = forecast.daily_will_it_snow; // 1 si la neige est attendue, 0 sinon

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
        
        console.log(`Recommandation : ${clothingRecommendation}`);

        // Affichage du résultat dans la page
        resultDiv.innerHTML = `
            <p>Weather for ${location} on ${date}:</p>
            <p>Temperature: ${forecast.avgtemp_c}°C</p>
            <p>Condition: ${forecast.condition.text}</p>
            <p>${clothingRecommendation}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not retrieve weather data.';
    }
});
