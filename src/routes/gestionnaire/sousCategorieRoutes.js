const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const {
  create,
  findAll,
  archive
} = require('../../controllers/gestionnaire/sousCategorieController');

// Middleware auth
router.use(authMiddleware);

/**
 * @swagger
 * /api/sous-categories:
 *   get:
 *     summary: Liste des sous-catégories
 *     tags: [SousCatégories]
 *     responses:
 *       200:
 *         description: Liste des sous-catégories
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/sous-categories:
 *   post:
 *     summary: Créer une nouvelle sous-catégorie
 *     tags: [SousCatégories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - categorieId
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               categorieId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', create);

/**
 * @swagger
 * /api/sous-categories/{id}/archive:
 *   put:
 *     summary: Archiver une sous-catégorie
 *     tags: [SousCatégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sous-catégorie à archiver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivée avec succès
 *       404:
 *         description: Non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/archive', archive);

module.exports = router;
