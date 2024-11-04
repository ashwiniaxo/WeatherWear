const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // dossier pour vos fichiers statiques (HTML, CSS, JS)

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
