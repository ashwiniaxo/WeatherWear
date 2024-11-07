import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


// Charger .env uniquement en local
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
//dotenv.config();
console.log(process.env.MY_KEY); // This should print your API key in the terminal


const app = express();
const PORT = 3000;
const apiKey = process.env.MY_KEY;

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
    console.log(`Server running at http://localhost:${PORT}`);
});
