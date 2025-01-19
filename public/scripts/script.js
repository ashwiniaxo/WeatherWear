document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/weather/forecast?location=${location}&date=${date}`);
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
            <p>Weather for ${location} on ${date}:</p>
            <p>Temperature: ${forecast.avgtemp_c}°C</p>
            <p>Condition: ${forecast.condition.text}</p>
            <p>${clothingRecommendation}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not retrieve weather data.';
    }


});

const cursor = document.querySelector('.custom-cursor');
const body = document.body;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Create a trail dot
    const trailDot = document.createElement('div');
    trailDot.classList.add('cursor-trail');
    trailDot.style.left = `${e.clientX}px`;
    trailDot.style.top = `${e.clientY}px`;

    
    body.appendChild(trailDot);

    
    setTimeout(() => {
        trailDot.remove();
    }, 1000); 
});

// Mouvement pour le curseur
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/images/custom-cursor-hover.png')";
        cursor.style.width = '50px';
        cursor.style.height = '50px';
    });
    button.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/images/custom-cursor.png')";
        cursor.style.width = '50px';
        cursor.style.height = '50px';
    });
});
