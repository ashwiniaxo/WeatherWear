import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;
const apiKey = '2d42d8c4639f45578e315016240411'; // Remplacez par votre clé API WeatherAPI

app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.get('/weather/forecast', async (req, res) => {
    const { location, date } = req.query;
    const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&dt=${date}`;

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
