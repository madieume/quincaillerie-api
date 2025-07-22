const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const {
  create,
  findAll,
  archive
} = require('../../controllers/gestionnaire/fournisseurController');

router.use(authMiddleware);

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Liste des fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Créer un nouveau fournisseur
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - nom
 *               - adresse
 *             properties:
 *               numero:
 *                 type: string
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', create);

/**
 * @swagger
 * /api/fournisseurs/{id}/archive:
 *   put:
 *     summary: Archiver un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du fournisseur à archiver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivé avec succès
 *       404:
 *         description: Non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/archive', archive);

module.exports = router;
