const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// --- Swagger Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes Authentification ---
const authRoutes = require('./routes/gestionnaire/authRoutes');
app.use('/api', authRoutes); // /api/login et /api/register

// --- Toutes les autres routes (gestionnaire + responsable achat) ---
const allRoutes = require('./routes'); // fichier index.js
app.use('/api', allRoutes);

module.exports = app;
