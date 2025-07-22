const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const {
  create,
  findAll,
  archive
} = require('../../controllers/gestionnaire/categorieController');
const { login } = require('../../controllers/gestionnaire/userController'); 
const { register } = require('../../controllers/gestionnaire/authController');//  ajout contrôleur login

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




//  Appliquer le middleware d'authentification à toutes les routes suivantes
router.use(authMiddleware);



/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par son ID
 *     tags:
 *       - Catégories 
 *     parameters:
 *       - $ref: '#/components/parameters/categorieIdParam'
 *     responses:
 *       200:
 *         description: Une catégorie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorie'
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur serveur
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Catégories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorieInput'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', create);

/**
 * @swagger
 * /api/categories/{id}/archive:
 *   put:
 *     summary: Archiver une catégorie (soft delete)
 *     description: Met à jour le champ `deletedAt` d'une catégorie pour l'archiver sans la supprimer physiquement.
 *     tags:
 *       - Catégories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie à archiver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie archivée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catégorie archivée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 */

router.put('/:id/archive', archive);

module.exports = router;
