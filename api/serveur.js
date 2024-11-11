import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path'; // Import the 'path' module to handle paths
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000 
const apiKey = process.env.MY_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
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
