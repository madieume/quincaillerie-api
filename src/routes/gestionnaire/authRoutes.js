const express = require('express');
const router = express.Router();

const { login, register } = require('../../controllers/gestionnaire/userController');

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion des utilisateurs (login, register)
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: utilisateur@example.com
 *               password:
 *                 type: string
 *                 example: monmotdepasse
 *     responses:
 *       200:
 *         description: Connexion réussie avec token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Création d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - password
 *               - role
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Amadou Diallo
 *               email:
 *                 type: string
 *                 example: amadou@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *               role:
 *                 type: string
 *                 enum: [ADMIN, UTILISATEUR]
 *                 example: UTILISATEUR
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans les données fournies
 */
router.post('/register', register);

module.exports = router;
